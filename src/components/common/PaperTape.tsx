import "./PaperTape.css";

export default function PaperTape({ className = "" }: { className?: string }) {
  return <span className={`paper-tape ${className}`} aria-hidden="true" />;
}
