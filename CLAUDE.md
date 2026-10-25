# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio site for **عبدالسلام معاد** (a Flutter & automation developer). Single-page React app, Arabic-first and RTL (`<html lang="ar" dir="rtl">`), deployed as a static site. UI copy is in Arabic.

## Stack

React 19 · Vite 6 · TypeScript (strict) · Tailwind CSS 3 · Framer Motion 12 · lucide-react. No router, no test runner, no server — purely static client-side.

## Commands

```bash
npm run dev        # Vite dev server (default http://localhost:5173)
npm run build      # tsc type-check, then vite build → dist/
npm run preview    # Serve the production build locally
npm run lint       # ESLint over ts/tsx
```

There are no automated tests. `npm run build` runs `tsc` first, so a type error fails the build — treat a clean build as the verification gate. Note `.vscode/launch.json` points Chrome at port 8080, which is stale; the dev server actually runs on Vite's default 5173.

## Git and deployment

The user wants pushes to **main**. It is the default branch and the source for `.github/workflows/deploy.yml`, which builds and publishes GitHub Pages on each push. The production URL is `https://abdualsslam.github.io/abdulsalam/`; the workflow builds with `--base=/abdulsalam/`. Resolve public media through `import.meta.env.BASE_URL` (or `src/lib/publicAsset.ts`) so assets work under both the local root and the published subpath. `master` is a legacy branch, synchronized once during the switch to main; future work belongs on main.

## Path alias

`@/*` → `src/*` (configured in both `tsconfig.json` and `vite.config.ts`). Keep them in sync if changed.

## Architecture

The whole app is the navigation shell — there are no routes or pages in the usual sense.

- **`App.tsx`** renders a fixed full-screen `Hero` as the background layer (`z-0`), then mounts `VerticalTabs` on top. Section components (`About`, `Skills`, `Projects`, `Experience`, `Contact`) are passed in as `tabContents`, keyed by `TabId`.
- **`hooks/useNavigation.ts`** is the single source of truth for navigation: `TabId` union, the `tabsConfig` array (id + Arabic label + accent color), and `activeTab` state. `activeTab === null` means "home" (no panel open). **Add or reorder a section by editing `tabsConfig` and the `tabContents` map in `App.tsx` together** — both are keyed by `TabId`.
- **`components/layout/VerticalTabs.tsx`** is the signature UI: bottom tabs stacked like physical folder tabs (horizontal fan-out via `horizontalOffset`, staircase via `heightIncrement`), each draggable. Opening a tab springs its page up; dragging it down past a threshold (or flicking) calls `onTabChange('home')` to close. Page height is measured dynamically from content (`scrollHeight`) via `useLayoutEffect`/resize listeners. The drag physics, z-index ordering, and `pointerEvents` gating are intentional and tightly coupled — change them carefully. Its CSS lives in the colocated `VerticalTabs.css` (the only non-Tailwind stylesheet).

**Dead code to ignore:** `components/layout/PaperPage.tsx` and `TabBar.tsx` are defined but never imported — earlier navigation experiments superseded by `VerticalTabs`.

## Styling

The identity is warm ivory paper, printed black ink and restrained coral drafting marks. `src/paper-theme.css` owns the shared color tokens; `tailwind.config.js` exposes `paper` (`surface`, `muted`, `raised`, `rule`), `ink` (`muted`), and `primary` (`dark`, `light`). Use these tokens rather than raw hex. `primary` is the darker coral for readable small text; `--paper-headline` is the coral for large headings, and `--paper-coral` is decorative. Legacy `dark` aliases resolve to paper surfaces. Keep original portrait media and sheet gesture physics intact when adjusting the surrounding presentation. Fonts are Arabic-first (`font-cairo`, `font-tajawal`, `font-sf`); Cairo is loaded from Google Fonts in `index.html`. Because the app is RTL, prefer logical layout (avoid hardcoded left/right that breaks RTL).

> `ARCHITECTURE.md` (Arabic) is an aspirational design doc and is **out of date** vs. the code: it describes CSS Modules and scroll-based sections, but the app actually uses Tailwind and the tab-panel navigation above. Trust the code over that document.
