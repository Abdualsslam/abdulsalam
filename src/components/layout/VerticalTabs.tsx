import {
  useEffect,
  useRef,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import {
  FolderClosed,
} from "lucide-react";
import DockSheet from "./DockSheet";
import { tabsConfig, type TabId } from "../../hooks/useNavigation";

interface Props {
  effectsEnabled?: boolean;
  navigationEnabled?: boolean;
  activeTab: TabId | null;
  onTabChange: (id: TabId) => void;
  tabContents: Record<TabId, ReactNode>;
}
const papers = tabsConfig.filter((tab) => tab.id !== "home");

export default function VerticalTabs({
  activeTab,
  onTabChange,
  tabContents,
  effectsEnabled = true,
  navigationEnabled = true,
}: Props) {
  const previous = useRef<TabId | null>(null);
  useEffect(() => {
    if (!navigationEnabled) return;
    const close = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape" && activeTab) onTabChange("home");
    };
    window.addEventListener("keydown", close);
    if (!activeTab && previous.current)
      document
        .getElementById(`tab-${previous.current}`)
        ?.focus({ preventScroll: true });
    previous.current = activeTab;
    return () => window.removeEventListener("keydown", close);
  }, [activeTab, navigationEnabled, onTabChange]);
  const navigateKeys = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next = index;
    if (event.key === "ArrowLeft") next = (index + 1) % papers.length;
    else if (event.key === "ArrowRight")
      next = (index - 1 + papers.length) % papers.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = papers.length - 1;
    else return;
    event.preventDefault();
    document.getElementById(`tab-${papers[next].id}`)?.focus();
  };
  return (
    <div className={`folder-system ${activeTab ? "has-open-paper" : ""}`}>
      <div className="paper-stack" aria-hidden="true">
        <div />
        <div />
        <div />
      </div>
      {activeTab && <div className="folder-scrim" />}
      <div className="folder-dock" role="group" aria-label="أقسام الملف الشخصي">
        <div className="folder-tabs">
          {papers.map((tab, index) => (
            <DockSheet
              key={tab.id} id={tab.id} label={tab.label} index={index}
              active={activeTab === tab.id} enabled={effectsEnabled}
              content={tabContents[tab.id]}
              onClose={() => onTabChange("home")}
              onKeyDown={event => navigateKeys(event, index)}
              onSelect={() => onTabChange(activeTab === tab.id ? "home" : tab.id)}
            />
          ))}
        </div>
        <div className="folder-spine">
          <span dir="ltr">ABDULSALAM / SELECTED WORK & EXPERIENCE</span>
          <button
            onClick={() => onTabChange("home")}
            aria-label="العودة إلى غلاف الملف"
          >
            <FolderClosed size={13} /> الغلاف
          </button>
        </div>
      </div>
    </div>
  );
}
