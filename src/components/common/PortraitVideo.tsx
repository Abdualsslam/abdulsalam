import { useEffect, useRef, useState } from "react";

const ROOT = `${import.meta.env.BASE_URL}portrait-video/loops/`;
type Clip = "idle" | "glance";

/** Each original performance loops independently. Change performances only out of view. */
export default function PortraitVideo({ enabled }: { enabled: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const wasAway = useRef(false);
  const [clip, setClip] = useState<Clip>("idle");
  const [intersecting, setIntersecting] = useState(true);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const [ready, setReady] = useState(false);
  const [blocked, setBlocked] = useState(false);
  // An open sheet blurs the cover but can still leave the portrait in view.
  const absent = !intersecting || !pageVisible;
  const shouldPlay = enabled && !absent;

  useEffect(() => {
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), { threshold: .1 });
    if (container.current) observer.observe(container.current);
    return () => {
      document.removeEventListener("visibilitychange", visibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!absent) { wasAway.current = false; return; }
    if (wasAway.current) return;
    wasAway.current = true;
    setReady(false);
    setBlocked(false);
    setClip(current => current === "idle" ? "glance" : "idle");
  }, [absent]);

  useEffect(() => {
    const current = video.current;
    if (!current) return;
    setReady(false);
    current.load();
  }, [clip]);

  useEffect(() => {
    const current = video.current;
    if (!current) return;
    let live = true;
    if (!shouldPlay) current.pause();
    else void current.play().then(() => {
      if (live) setBlocked(false);
    }).catch(() => { if (live) setBlocked(true); });
    return () => {
      live = false;
      current.pause();
    };
  }, [shouldPlay, clip]);

  const retry = () => {
    if (!shouldPlay) return;
    void video.current?.play().then(() => setBlocked(false)).catch(() => setBlocked(true));
  };

  return (
    <div ref={container} className={`portrait-media portrait-photograph ${ready ? "is-playing" : ""}`}>
      <img className="portrait-video-poster" src={`${ROOT}${clip}.webp`} width={720} height={1280} alt="" fetchPriority="high" />
      <video ref={video} className={`portrait-video ${ready ? "is-active" : ""}`}
        src={`${ROOT}${clip}.mp4`} data-clip={clip} loop muted playsInline disablePictureInPicture
        preload="auto" width={720} height={1280} aria-hidden="true" tabIndex={-1}
        onLoadedData={() => setReady(true)} onError={() => setReady(false)} />
      {blocked && shouldPlay && (
        <button className="portrait-play" type="button" aria-label="تشغيل حركة الصورة" onClick={retry}>تشغيل الحركة</button>
      )}
    </div>
  );
}
