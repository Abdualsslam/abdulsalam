# Portfolio UI/UX Modernization — Design

**Date:** 2026-06-16
**Project:** `abdulsalam` personal portfolio (React 19 + Vite + Tailwind 3 + Framer Motion)
**Owner:** عبدالسلام معاد

## Goal

Make the existing portfolio feel modern, premium, and interactive — without changing content or the underlying architecture. Three focus areas plus global polish:

1. Home (Hero) → live mouse-driven interactivity.
2. Bottom folder-style archive tabs → interactive hover feedback.
3. Sliding page bodies → frosted-glass (glassmorphism) instead of the current solid `#1a1a2e`.

## Approach

**Enhance in place.** Keep the signature bottom folder-tab architecture (`VerticalTabs` + `useNavigation`) and the section components. Layer glass surfaces and interaction on top. No routing, content, or structural changes. No new heavy dependencies — use Framer Motion (already present) and Tailwind utilities/CSS.

## Constraints & Principles

- **RTL-first.** All layout stays logical/RTL-safe (the site runs `dir="rtl"`).
- **Accessibility.** Respect `prefers-reduced-motion`: disable parallax, magnetic, tilt, and infinite loops; keep content fully usable. Keep focus states and `aria-label`s.
- **Performance.** Mouse-driven motion uses Framer Motion `useMotionValue` + springs (no React re-render per mouse event). Use GPU-friendly `transform`/`opacity`, `will-change` only where it pays off, and throttle via rAF where needed. Target 60fps on a mid laptop.
- **No content/data changes.** Pure visual/interaction work.
- **Preserve the drag/close physics** in `VerticalTabs` — additive changes only.

## Design Tokens (reuse existing palette)

- Primary `#7E66AC` / light `#9b85c4` / dark `#502e91`; secondary `#8F00FF`; accent `#00D9FF`.
- Tab accent colors stay as defined in `tabsConfig`.
- New shared glass recipe (added as a Tailwind component class, e.g. `.glass` / `.glass-panel`):
  - panel: `background: rgba(24,22,40,0.55)`; `backdrop-filter: blur(22px) saturate(140%)` (+ `-webkit-` prefix); `border: 1px solid rgba(255,255,255,0.12)`; colored top edge per tab; soft colored shadow.
  - card: `background: rgba(255,255,255,0.06)`; `border: 1px solid rgba(255,255,255,0.10)`; lighter blur.
- Provide an opaque fallback for browsers without `backdrop-filter` support via `@supports`.

## 1. Hero — live interactivity

Component: `src/components/sections/Hero.tsx` (+ a small reusable hook).

- **Cursor spotlight:** a radial highlight layer that follows the pointer over the dark background (subtle, low-opacity primary tint).
- **Layered parallax:** background orbs, floating particles, and the photo translate by different small factors relative to pointer position (depth). Implemented with `useMotionValue` + `useSpring`; listen on the section's `pointermove`.
- **3D tilt** on the photo container (`rotateX`/`rotateY` from pointer, with `perspective`), spring-damped, resets on leave.
- **Magnetic buttons:** the two CTA buttons (`تواصل معي`, `تحميل السيرة الذاتية`) ease toward the cursor within a small radius and snap back on leave.
- **Animated gradient text** on the role line / name accent (slow background-position shift).
- **Tech icons** (Flutter/Python/n8n/VS Code): scale + glow on hover; keep existing idle float.
- All of the above gated behind `prefers-reduced-motion` and pointer-capable devices (skip on touch where it doesn't make sense).

## 2. Bottom folder tabs — hover interactivity

Files: `src/components/layout/VerticalTabs.tsx`, `src/components/layout/VerticalTabs.css`.

- On hover of an inactive tab handle: lift (`translateY(-8px..-10px)`), slight scale, brightness, and a colored glow (`box-shadow` in the tab's color) with a smooth spring/transition.
- Smoother open spring (tune `damping`/`stiffness`) and a clearer grab affordance (drag-handle hint / cursor).
- Refine the folder-tab edge: subtle top sheen/border for a glassier look; ensure label contrast on every tab color (some colors need darker text).
- Keep all existing drag-to-open / drag-to-close thresholds and z-index ordering intact.

## 3. Sliding page body — frosted glass

Files: `VerticalTabs.tsx` (`tab-page-content` inline `backgroundColor`), `VerticalTabs.css`.

- Replace solid `#1a1a2e` with the `.glass-panel` recipe so the Hero glow shows through.
- Gradient/colored top edge per tab color; soft colored drop shadow; refined drag-handle pill.
- Keep dynamic height measurement and scroll behavior unchanged; restyle the scrollbar to match.
- `@supports not (backdrop-filter: blur())` → fall back to near-opaque dark surface.

## 4. Global polish

- Add shared `.glass` / `.glass-panel` / `.glass-card` component classes in `src/index.css` (`@layer components`) and a `.gradient-text-animated` utility; reuse across sections.
- Apply glass card treatment consistently in `About`, `Skills`, `Projects`, `Experience`, `Contact` (restyle existing `.card` usages / section wrappers — no content change).
- Add a single shared reduced-motion guard (hook or CSS) and consistent enter/hover motion variants.
- Verify build (`npm run build` = `tsc` + vite) stays clean and `npm run lint` passes.

## Out of Scope

- New sections, copy changes, data/content edits, routing, i18n/English version, backend, tests infrastructure.
- Replacing the folder-tab navigation concept.
- The unused `PaperPage.tsx` / `TabBar.tsx` (leave as-is unless trivially in the way).

## Success Criteria

- Hero reacts to the mouse (spotlight + parallax + tilt + magnetic buttons) at ~60fps; degrades gracefully with reduced-motion / touch.
- Tabs visibly respond to hover (lift + glow) and keep working drag open/close.
- Open page panels read as frosted glass with the Hero glowing through; opaque fallback works.
- Consistent glass aesthetic across all sections; RTL intact; `npm run build` and `npm run lint` pass.
