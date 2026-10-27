import PortraitVideo from "./PortraitVideo";

/** The two approved portrait videos, presented without synthetic face motion. */
export default function PortraitMotion({ enabled }: { enabled: boolean }) {
  return (
    <div className="portrait-artwork">
      <div className="portrait-drafting" aria-hidden="true">
        <span /><span /><span /><span />
      </div>
      <div className="portrait-backdrop" aria-hidden="true" />
      <div className="portrait-edition" aria-hidden="true">
        <span>THE PERSON BEHIND THE CODE</span>
        <span>01 / AM</span>
      </div>
      <PortraitVideo enabled={enabled} />
    </div>
  );
}
