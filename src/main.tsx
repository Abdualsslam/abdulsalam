import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { readRoute } from "./lib/routes";
import "./paper-theme.css";
import "./index.css";
import "./components/layout/VerticalTabs.css";
import "./motion.css";
import "./portrait.css";
import "./file-materials.css";
import "./components/sections/Hero.css";
import "./seo.css";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App initialRoute={readRoute(window.location.pathname)} />
  </StrictMode>
);
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
