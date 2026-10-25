"""Prepare approved portrait videos locally using recurrent human matting.

Example:
python scripts/prepare_portrait_video.py --idle C:/Users/Abdua/Desktop/11video.mp4 --glance C:/Users/Abdua/Desktop/vide99o.mp4 --output .codex-preview/portrait-video-v2

Requires numpy, opencv-python, Pillow, imageio-ffmpeg and onnxruntime.
The official RVM model remains an ignored local processing dependency.
"""
from __future__ import annotations
import argparse
import hashlib
import json
import subprocess
import time
from pathlib import Path
import cv2
import imageio_ffmpeg
import numpy as np
import onnxruntime as ort
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MODEL_URL = "https://github.com/PeterL1n/RobustVideoMatting/releases/download/v1.0.0/rvm_mobilenetv3_fp32.onnx"
MODEL_SHA256 = "88d4531297118f595bf2fd60f6f566aec2e559393802d1f436c380f0cbbd2828"
CHECK_FRAMES = {0, 60, 84, 120, 239}
cv2.setNumThreads(2)

def info(source: Path):
    cap = cv2.VideoCapture(str(source))
    if not cap.isOpened():
        raise RuntimeError(f"Cannot read {source}")
    value = (int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)), int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)),
             float(cap.get(cv2.CAP_PROP_FPS)), int(cap.get(cv2.CAP_PROP_FRAME_COUNT)))
    cap.release()
    return value

def watermark_alpha(rgb, person, black):
    """Keep original disconnected corner mark; never draw/reconstruct it."""
    h, w = person.shape
    x0, y0 = round(w * .77), round(h * .86)
    roi = rgb[y0:, x0:]
    brightness = roi.max(axis=2)
    candidates = (brightness > 15).astype(np.uint8)
    count, labels, stats, _ = cv2.connectedComponentsWithStats(candidates, connectivity=8)
    allowed = np.zeros_like(candidates)
    for index in range(1, count):
        x, y, cw, ch, area = stats[index]
        if area < 12 or x == 0 or y == 0 or x + cw >= roi.shape[1] or y + ch >= roi.shape[0]:
            continue
        component = labels == index
        if np.mean(person[y0:, x0:][component] > .5) > .5:
            continue
        allowed[component] = 1
    if not allowed.any():
        return np.zeros_like(person)
    allowed = cv2.dilate(allowed, np.ones((3, 3), np.uint8))
    level = max(float(np.percentile(brightness[(candidates > 0) & (allowed > 0)], 90)), 20.)
    base = float(np.max(black))
    local = ((brightness.astype(np.float32) - base) / max(level - base, 1.)).clip(0, 1)
    result = np.zeros_like(person)
    result[y0:, x0:] = local * allowed * (person[y0:, x0:] < .1)
    return result

def rgba_from_prediction(rgb, foreground, prediction, black):
    """Continuous alpha, color evidence at edges, exact opaque source RGB.

    No hulls, filling, erosion or binary silhouette approximation on portrait.
    """
    p = prediction.clip(0, 1)
    source = rgb.astype(np.float32)
    delta = foreground - black
    color_alpha = (np.sum((source - black) * delta, axis=2)
                   / np.maximum(np.sum(delta * delta, axis=2), 1.)).clip(0, 1)
    alpha = np.minimum(p, color_alpha)
    alpha = np.where(p >= .98, 1., np.where(p <= .001, 0., alpha))
    alpha = np.maximum(alpha, watermark_alpha(rgb, p, black))
    a = alpha[..., None]
    straight = ((source - black * (1. - a)) / np.maximum(a, .02)).clip(0, 255)
    straight = np.where((p >= .98)[..., None], source, straight)
    straight[alpha == 0] = 0
    rgba = np.empty((*p.shape, 4), dtype=np.uint8)
    rgba[:, :, :3] = straight.round().astype(np.uint8)
    rgba[:, :, 3] = (alpha * 255).round().astype(np.uint8)
    return rgba

def verify_alpha(ffmpeg, path, width, height):
    decoded = subprocess.run([
        ffmpeg, "-v", "error", "-c:v", "libvpx-vp9", "-i", str(path),
        "-frames:v", "1", "-vf", "alphaextract", "-f", "rawvideo", "-pix_fmt", "gray", "-",
    ], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    alpha = np.frombuffer(decoded.stdout, dtype=np.uint8).reshape(height, width)
    if alpha[0, 0] != 0 or alpha[height // 2, width // 2] < 250:
        raise RuntimeError(f"Encoded alpha verification failed: {path}")
    return {"decoder": "libvpx-vp9", "cornerAlpha": int(alpha[0, 0]),
            "bodyAlpha": int(alpha[height // 2, width // 2]),
            "transparentFraction": round(float((alpha == 0).mean()), 4),
            "fractionalAlphaPixels": int(((alpha > 0) & (alpha < 255)).sum())}

def prepare(name, source, output, validation, model, ffmpeg):
    width, height, fps, count = info(source)
    if (width, height) != (720, 1280) or count != 240 or abs(fps - 24) > .01:
        raise ValueError(f"Unexpected source specification: {source}: {width}x{height}, {fps}fps, {count}frames")
    cap = cv2.VideoCapture(str(source))
    webm, mp4 = output / f"{name}.webm", output / f"{name}.mp4"
    pending = output / f".{name}.encoding.webm"
    encoder = subprocess.Popen([
        ffmpeg, "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "rgba",
        "-s", f"{width}x{height}", "-r", str(fps), "-i", "-", "-an",
        "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p", "-b:v", "0", "-crf", "22",
        "-deadline", "good", "-cpu-used", "3", "-row-mt", "1", "-threads", "4",
        "-auto-alt-ref", "0", "-g", "240", "-metadata:s:v:0", "alpha_mode=1", str(pending),
    ], stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
    rec = [np.zeros([1, 1, 1, 1], dtype=np.float32)] * 4
    ratio = np.array([.4], dtype=np.float32)
    black = np.array([3., 3., 3.], dtype=np.float32)
    start = time.perf_counter()
    try:
        for index in range(count):
            ok, frame = cap.read()
            if not ok:
                raise RuntimeError(f"Incomplete source at frame {index}: {source}")
            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            tensor = np.ascontiguousarray(rgb.transpose(2, 0, 1)[None], dtype=np.float32) / 255.
            fgr, pha, *rec = model.run([], {"src": tensor, "r1i": rec[0], "r2i": rec[1],
                "r3i": rec[2], "r4i": rec[3], "downsample_ratio": ratio})
            foreground = fgr[0].transpose(1, 2, 0).clip(0, 1) * 255.
            rgba = rgba_from_prediction(rgb, foreground, pha[0, 0], black)
            if index in CHECK_FRAMES:
                Image.fromarray(rgba).save(validation / f"{name}-{index:03d}.png")
            if name == "idle" and index == 0:
                Image.fromarray(rgba).save(output / "poster.webp", lossless=True, method=6, exact=True)
            encoder.stdin.write(rgba.tobytes())
            if index % 24 == 0:
                print(f"{name}: {index}/{count} frames, {time.perf_counter()-start:.1f}s", flush=True)
        encoder.stdin.close()
        error = encoder.stderr.read().decode("utf-8", "replace")
        if encoder.wait() != 0:
            raise RuntimeError(error)
    except Exception:
        encoder.kill()
        raise
    finally:
        cap.release()
    pending.replace(webm)
    print(f"{name}: WEBM COMPLETE {webm.stat().st_size} bytes", flush=True)
    mp4_pending = output / f".{name}.encoding.mp4"
    subprocess.run([
        ffmpeg, "-y", "-v", "error", "-i", str(source), "-an", "-c:v", "libx264",
        "-pix_fmt", "yuv420p", "-crf", "18", "-preset", "medium", "-movflags", "+faststart", str(mp4_pending),
    ], check=True)
    mp4_pending.replace(mp4)
    verification = verify_alpha(ffmpeg, webm, width, height)
    record = {"source": source.name, "sourceSha256": hashlib.sha256(source.read_bytes()).hexdigest(),
        "width": width, "height": height, "fps": fps, "frames": count, "duration": round(count / fps, 4),
        "webm": {"file": webm.name, "bytes": webm.stat().st_size, "alpha": True, "crf": 22},
        "mp4": {"file": mp4.name, "bytes": mp4.stat().st_size, "alpha": False, "crf": 18},
        "alphaVerification": verification, "processingSeconds": round(time.perf_counter()-start, 2)}
    print(f"{name}: READY {json.dumps(record)}", flush=True)
    return record

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--idle", type=Path, required=True)
    parser.add_argument("--glance", type=Path, required=True)
    parser.add_argument("--output", type=Path, default=ROOT / ".codex-preview/portrait-video-v2")
    parser.add_argument("--validation", type=Path, default=ROOT / ".codex-preview/matte-final-validation")
    parser.add_argument("--model", type=Path, default=ROOT / ".codex-preview/models/rvm_mobilenetv3_fp32.onnx")
    args = parser.parse_args()
    if hashlib.sha256(args.model.read_bytes()).hexdigest() != MODEL_SHA256:
        raise RuntimeError("The RVM model does not match the verified official release")
    args.output.mkdir(parents=True, exist_ok=True)
    args.validation.mkdir(parents=True, exist_ok=True)
    options = ort.SessionOptions()
    options.intra_op_num_threads = 4
    options.inter_op_num_threads = 1
    model = ort.InferenceSession(str(args.model), sess_options=options, providers=["CPUExecutionProvider"])
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    clips = {name: prepare(name, path.resolve(), args.output, args.validation, model, ffmpeg)
             for name, path in (("idle", args.idle), ("glance", args.glance))}
    manifest = {"version": 2, "poster": "poster.webp", "posterLossless": True,
        "model": {"name": "Robust Video Matting / MobileNetV3 FP32", "source": MODEL_URL,
                  "sha256": MODEL_SHA256, "runtime": f"onnxruntime {ort.__version__}", "downsampleRatio": .4,
                  "nativeInput": "720x1280", "recurrentStatesRecycled": True},
        "matteAlgorithm": "continuous RVM person alpha; min with known-black source/foreground color alpha at uncertain edges; source-black unmix; exact source RGB at prediction >= .98",
        "watermark": "original disconnected bright source components retained in bottom-right ROI x>=.77W y>=.86H; no recreated mark",
        "clips": clips, "notes": ["All original frames retained at native resolution and frame rate.",
            "Original source files are never modified.", "No binary hull or geometric filling used for portrait.",
            "H.264 fallback retains the original black background; WebM contains VP9 alpha."]}
    (args.output / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"DONE {args.output}", flush=True)

if __name__ == "__main__":
    main()
