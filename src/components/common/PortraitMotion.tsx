import { ArrowUpLeft, Workflow } from "lucide-react";
import PortraitVideo from "./PortraitVideo";
import flutterLogo from "../../assets/flutter-logo.webp";

/** The two approved portrait videos, presented without synthetic face motion. */
export default function PortraitMotion({ enabled, concealed }: { enabled: boolean; concealed: boolean }) {
  return (
    <div className="portrait-artwork">
      <div className="portrait-backdrop" aria-hidden="true" />
      <div className="portrait-edition" aria-hidden="true">
        <span>THE PERSON BEHIND THE CODE</span>
        <span>01 / AM</span>
      </div>
      <PortraitVideo enabled={enabled} concealed={concealed} />
      <a className="portrait-specialty specialty-flutter" href="#projects"
        aria-label="استكشف أعمالي في تطوير تطبيقات Flutter">
        <img src={flutterLogo} width={27} height={27} alt="" />
        <span><b>Flutter</b><small>تطبيقات بتفاصيل تصنع الفرق</small></span>
        <ArrowUpLeft size={14} />
      </a>
      <a className="portrait-specialty specialty-automation" href="#skills"
        aria-label="استكشف مهاراتي في الأتمتة وتحليل النظم">
        <Workflow className="specialty-icon" size={25} />
        <span><b>Automation</b><small>حلول تختصر الطريق</small></span>
        <ArrowUpLeft size={14} />
      </a>
      <div className="portrait-nameplate">
        <div><span className="portrait-nameplate-line" /> <span>فكرة واضحة. تنفيذ متقن.</span></div>
        <span dir="ltr">DEVELOPER & SYSTEMS THINKER</span>
      </div>
    </div>
  );
}
