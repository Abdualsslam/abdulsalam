"""Build independent, frame-continuous portrait loops from approved originals.

The original black backdrop, hair, face, clothing and mark stay in the frame.
No matting, cross-clip dissolve, optical flow, face warp, or camera transform.
Each loop retraces its own real source frames at low-velocity endpoints.

    python scripts/build_portrait_loops.py --idle C:/Users/Abdua/Desktop/11video.mp4 --glance C:/Users/Abdua/Desktop/vide99o.mp4
"""
from __future__ import annotations

import argparse
import hashlib
import json
import subprocess
from pathlib import Path

import cv2
import imageio_ffmpeg
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]


def build(name: str, source: Path, start: int, turn: int, hold: int,
          output: Path, ffmpeg: str) -> dict:
    cap = cv2.VideoCapture(str(source))
    if not cap.isOpened():
        raise RuntimeError(f"Cannot open {source}")
    width, height = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)), int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = float(cap.get(cv2.CAP_PROP_FPS))
    if (width, height) != (720, 1280) or abs(fps - 24) > .01:
        raise ValueError(f"Unexpected approved source: {width}x{height}, {fps}fps")
    frames = {}
    for index in range(turn + 1):
        ok, frame = cap.read()
        if not ok:
            raise RuntimeError(f"Source ended at frame {index}: {source}")
        if index >= start:
            frames[index] = frame
    cap.release()
    # Each turning endpoint occurs once. The final frame is start+1, so the
    # next native-loop frame (start) follows the real source trajectory.
    order = list(range(start, turn + 1)) + list(range(turn - 1, start, -1))
    if hold:
        order += [start] * hold
    destination = output / f"{name}.mp4"
    pending = output / f".{name}.encoding.mp4"
    encoder = subprocess.Popen([
        ffmpeg, "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "bgr24",
        "-s", f"{width}x{height}", "-r", str(fps), "-i", "-", "-an",
        "-c:v", "libx264", "-crf", "18", "-preset", "medium", "-pix_fmt", "yuv420p",
        "-g", "24", "-movflags", "+faststart", str(pending),
    ], stdin=subprocess.PIPE, stderr=subprocess.PIPE)
    try:
        for index in order:
            encoder.stdin.write(frames[index].tobytes())
        encoder.stdin.close()
        error = encoder.stderr.read().decode("utf-8", "replace")
        if encoder.wait() != 0:
            raise RuntimeError(error)
    except Exception:
        encoder.kill()
        raise
    pending.replace(destination)
    poster = f"{name}.webp"
    Image.fromarray(cv2.cvtColor(frames[start], cv2.COLOR_BGR2RGB)).save(
        output / poster, lossless=True, method=6)
    encoded = cv2.VideoCapture(str(destination))
    count = int(encoded.get(cv2.CAP_PROP_FRAME_COUNT))
    ok, first = encoded.read()
    encoded.set(cv2.CAP_PROP_POS_FRAMES, count - 1)
    ok, last = encoded.read()
    encoded.release()
    if not ok or count != len(order):
        raise RuntimeError(f"Encoded frame-count check failed: {destination}")
    record = {
        "file": destination.name, "poster": poster, "source": source.name,
        "sourceSha256": hashlib.sha256(source.read_bytes()).hexdigest(),
        "width": width, "height": height, "fps": fps, "frames": count,
        "duration": count / fps, "bytes": destination.stat().st_size,
        "sourceStartFrame": start, "sourceTurnFrame": turn, "neutralHoldFrames": hold,
        "sourceFrameOrder": order,
        "decodedSeamMeanAbsoluteDifference": float(np.mean(np.abs(first.astype(float) - last.astype(float)))),
        "matting": False, "geometricTransforms": False,
    }
    print(f"{name}: {count} frames / {record['duration']:.3f}s / {record['bytes']} bytes", flush=True)
    return record


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--idle", type=Path, required=True)
    parser.add_argument("--glance", type=Path, required=True)
    parser.add_argument("--output", type=Path, default=ROOT / ".codex-preview/portrait-loops-v3")
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    clips = {
        "idle": build("idle", args.idle.resolve(), 90, 206, 0, args.output, ffmpeg),
        "glance": build("glance", args.glance.resolve(), 18, 206, 0, args.output, ffmpeg),
    }
    manifest = {
        "version": 3, "clips": clips,
        "notes": ["Native source resolution, real source pixels; original files unchanged.",
                  "No alpha matte, image registration, optical flow or cross-video blending.",
                  "The main loops contain each turning endpoint once and follow the reverse source trajectory at the wrap.",
                  "Switch between the two performances only while the portrait is fully obscured."],
    }
    (args.output / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
