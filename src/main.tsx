import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./paper-theme.css";
import "./index.css";
import "./components/layout/VerticalTabs.css";
import "./motion.css";
import "./portrait.css";
import "./file-materials.css";
import "./components/sections/Hero.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
