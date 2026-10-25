import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Play, RotateCcw } from "lucide-react";
import type { ProjectExperienceClip } from "../../data/caseStudyTypes";
import "./ProjectExperience.css";

export default function ProjectExperience({ active, projectId, projectName, clips }: { active: boolean; projectId: string; projectName: string; clips: readonly ProjectExperienceClip[] }) {
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [failed, setFailed] = useState(false);
  const player = useRef<HTMLVideoElement>(null);
  const clip = clips[selected];
  const mediaPath = `/projects/${projectId}`;
  const headingId = `${projectId}-experience-title`;

  useEffect(() => {
    if (!active) player.current?.pause();
  }, [active]);

  useEffect(() => {
    const pauseWhenHidden = () => {
      if (document.hidden) player.current?.pause();
    };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => document.removeEventListener("visibilitychange", pauseWhenHidden);
  }, []);

  const selectClip = (index: number) => {
    if (index === selected) return;
    player.current?.pause();
    setPlaying(false);
    setEnded(false);
    setFailed(false);
    setSelected(index);
  };

  const play = async () => {
    if (!player.current) return;
    if (ended) player.current.currentTime = 0;
    try {
      await player.current.play();
    } catch {
      // Native video controls remain available if playback is interrupted.
      setPlaying(false);
    }
  };

  return (
    <section className="project-experience" aria-labelledby={headingId}>
      <div className="experience-heading"><span className="eyebrow">01 / جرّب المشاهدة</span><span>من التطبيق، كما يُستخدم.</span></div>
      <div className="experience-playlist" data-count={clips.length} style={{ "--experience-count": clips.length } as CSSProperties} role="group" aria-label={`اختر تجربة من ${projectName}`}>{clips.map((item, index) => (
        <button key={item.file} className={selected === index ? "is-selected" : ""} aria-pressed={selected === index} onClick={() => selectClip(index)}>
          <span className="experience-clip-number">0{index + 1}</span><span className="experience-clip-copy"><b>{item.shortTitle}</b><span>{item.summary}</span></span><span className="experience-clip-meta"><span dir="ltr">{item.duration}</span><Play size={16} aria-hidden="true" /></span>
        </button>
      ))}</div>
      <div className="experience-workbench">
        <div className="experience-stage">
          <div className="experience-stage-label"><span dir="ltr">TAKE 0{selected + 1}</span><span>تسجيل فعلي / Android</span></div>
          <div className="experience-phone">
            <video
              key={clip.file}
              ref={player}
              controls
              playsInline
              preload="metadata"
              poster={`${mediaPath}/${clip.file}-poster.webp`}
              width="720"
              height="1606"
              aria-label={`تجربة ${projectName}: ${clip.title}`}
              onPlay={() => { setPlaying(true); setEnded(false); }}
              onPause={() => setPlaying(false)}
              onEnded={() => { setEnded(true); setPlaying(false); }}
              onError={() => setFailed(true)}
            >
              <source src={`${mediaPath}/${clip.file}.mp4`} type="video/mp4" />
              متصفحك لا يدعم تشغيل الفيديو. يمكنك <a href={`${mediaPath}/${clip.file}.mp4`}>فتح التسجيل</a>.
            </video>
            {!playing && !failed && <button className="experience-play" onClick={play} aria-label={ended ? `إعادة مشاهدة ${clip.title}` : `تشغيل ${clip.title}`}>
              {ended ? <RotateCcw size={27} aria-hidden="true" /> : <Play size={29} fill="currentColor" aria-hidden="true" />}
            </button>}
          </div>
          {failed && <p className="experience-error" role="status">تعذّر تشغيل الفيديو. <a href={`${mediaPath}/${clip.file}.mp4`}>افتح التسجيل مباشرة</a>.</p>}
          <p className="experience-stage-footnote">شاهد على مهل. أوقف المقطع أو كبّره في أي وقت.</p>
        </div>
        <div className="experience-story" aria-live="polite">
          <span className="experience-kicker">تجربة <bdi dir="ltr">0{selected + 1} / {String(clips.length).padStart(2, "0")}</bdi></span>
          <h2 id={headingId}>{clip.title}</h2>
          <p className="experience-description">{clip.description}</p>
          <ol className="experience-steps">{clip.steps.map((step, index) => <li key={step}><span aria-hidden="true">0{index + 1}</span><p>{step}</p></li>)}</ol>
          <p className="experience-recording-note">مشاهد فعلية من التطبيق، بحركتها الطبيعية.</p>
        </div>
      </div>

    </section>
  );
}
