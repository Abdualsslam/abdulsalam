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
  const [pageVisible, setPageVisible] = useState(true);
  const [ready, setReady] = useState(false);
  // An open sheet blurs the cover but can still leave the portrait in view.
  const absent = !intersecting || !pageVisible;
  const shouldPlay = enabled && !absent;

  useEffect(() => {
    const visibility = () => setPageVisible(!document.hidden);
    visibility();
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
    if (!shouldPlay) current.pause();
    else void current.play().catch(() => {
      // Keep the poster visible when autoplay is unavailable.
    });
    return () => {
      current.pause();
    };
  }, [shouldPlay, clip]);

  return (
    <div ref={container} className={`portrait-media portrait-photograph ${ready ? "is-playing" : ""}`}>
      <img className="portrait-video-poster" src={`${ROOT}${clip}.webp`} width={720} height={1280} alt="عبدالسلام معاد، مطور Flutter وخبير أتمتة" fetchPriority="high" />
      <video ref={video} className={`portrait-video ${ready ? "is-active" : ""}`}
        src={`${ROOT}${clip}.mp4`} data-clip={clip} loop muted playsInline disablePictureInPicture
        preload="none" width={720} height={1280} aria-hidden="true" tabIndex={-1}
        onPlaying={() => setReady(true)} onError={() => setReady(false)} />
    </div>
  );
}
