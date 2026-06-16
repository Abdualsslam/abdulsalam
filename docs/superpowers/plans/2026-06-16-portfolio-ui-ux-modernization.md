# Portfolio UI/UX Modernization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the portfolio feel modern and interactive — frosted-glass sliding page panels, a mouse-reactive hero, and hover-interactive folder tabs — without changing content or architecture.

**Architecture:** Enhance-in-place. Add a shared glass design system in `index.css`, two small Framer Motion hooks/components for pointer interactivity, then apply them in `Hero.tsx` and `VerticalTabs.tsx`/`VerticalTabs.css`. The existing section components inherit the glass look through the upgraded `.card` class.

**Tech Stack:** React 19, TypeScript (strict), Tailwind 3, Framer Motion 12 (all already installed). No new dependencies.

**Verification note:** This repo has no test runner and the work is visual/interaction. The verification gate for every task is: (a) `npm run build` completes clean (it runs `tsc` then `vite build`), and (b) the dev server preview shows the change with no console errors. Start the dev server once (`npm run dev`, default `http://localhost:5173`) and use the preview tools (`preview_start`, `preview_screenshot`, `preview_snapshot`, `preview_console_logs`, `preview_resize`) to verify. HMR is active, so edits hot-reload.

---

### Task 1: Shared glass design system + animation foundation

**Files:**
- Modify: `src/index.css` (`@layer components` block, lines 58-99; add reduced-motion guard in `@layer base`)

- [ ] **Step 1: Add glass + animated-gradient + reduced-motion CSS**

In `src/index.css`, inside `@layer base` (after the `::selection` rule, before the closing `}` of the base layer), add a reduced-motion guard:

```css
    @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
        }
    }
```

Then in `@layer components`, **replace** the existing `.card` and `.card:hover` rules (lines 79-85) with glass versions, and **append** the new shared classes:

```css
    .card {
        @apply rounded-2xl p-7 transition-all duration-300;
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(12px) saturate(130%);
        -webkit-backdrop-filter: blur(12px) saturate(130%);
        border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .card:hover {
        @apply -translate-y-1.5;
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(126, 102, 172, 0.45);
        box-shadow: 0 12px 40px rgba(126, 102, 172, 0.25);
    }

    .glass-panel {
        background: rgba(24, 22, 40, 0.55);
        backdrop-filter: blur(22px) saturate(140%);
        -webkit-backdrop-filter: blur(22px) saturate(140%);
        border: 1px solid rgba(255, 255, 255, 0.12);
    }

    .gradient-text-animated {
        background: linear-gradient(90deg, #7E66AC, #8F00FF, #00D9FF, #8F00FF, #7E66AC);
        background-size: 300% 100%;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: gradient-shift 6s ease infinite;
    }

    @keyframes gradient-shift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
    }

    @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
        .card { background: rgba(26, 26, 37, 0.92); }
        .glass-panel { background: rgba(20, 18, 32, 0.94); }
    }
```

- [ ] **Step 2: Verify build is clean**

Run: `npm run build`
Expected: PASS — `tsc` emits nothing, `vite build` writes `dist/` with no errors.

- [ ] **Step 3: Verify in preview**

Start the dev server (`npm run dev`) and open a tab (open `skills` or `about`). Take a `preview_screenshot`.
Expected: section cards now look translucent/glassy; no console errors via `preview_console_logs`.

- [ ] **Step 4: Commit**

```bash
git add src/index.css
git commit -m "feat: add shared glass design system + reduced-motion guard"
```

---

### Task 2: Pointer-parallax hook

**Files:**
- Create: `src/hooks/usePointerParallax.ts`

- [ ] **Step 1: Create the hook**

```ts
import { useEffect, type RefObject } from 'react'
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Tracks the pointer inside `ref`, returning spring-smoothed motion values
 * normalized to roughly -0.5..0.5 (center = 0). Returns zeros and `reduce=true`
 * when the user prefers reduced motion, so callers can skip parallax.
 */
export function usePointerParallax(ref: RefObject<HTMLElement | null>) {
    const reduce = useReducedMotion()
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const springConfig = { stiffness: 120, damping: 20, mass: 0.4 }
    const sx = useSpring(x, springConfig)
    const sy = useSpring(y, springConfig)

    useEffect(() => {
        if (reduce) return
        const el = ref.current
        if (!el) return

        const onMove = (e: PointerEvent) => {
            const r = el.getBoundingClientRect()
            x.set((e.clientX - r.left) / r.width - 0.5)
            y.set((e.clientY - r.top) / r.height - 0.5)
        }
        const onLeave = () => {
            x.set(0)
            y.set(0)
        }

        el.addEventListener('pointermove', onMove)
        el.addEventListener('pointerleave', onLeave)
        return () => {
            el.removeEventListener('pointermove', onMove)
            el.removeEventListener('pointerleave', onLeave)
        }
    }, [ref, reduce, x, y])

    return { x: sx, y: sy, reduce }
}
```

- [ ] **Step 2: Verify build is clean**

Run: `npm run build`
Expected: PASS. (Unused-symbol errors here would mean a typo — the hook is consumed in Task 4.)

> Note: `noUnusedLocals` is on, but an exported function in its own module is fine uncommitted. If `tsc` complains, it's a real error to fix, not a false positive.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/usePointerParallax.ts
git commit -m "feat: add usePointerParallax hook"
```

---

### Task 3: Magnetic button component

**Files:**
- Create: `src/components/common/MagneticButton.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface MagneticButtonProps {
    children: ReactNode
    href: string
    className?: string
    download?: boolean
    strength?: number
}

/**
 * Anchor that eases toward the cursor while hovered, snapping back on leave.
 * Falls back to a static anchor when reduced motion is requested.
 */
export default function MagneticButton({
    children,
    href,
    className,
    download = false,
    strength = 0.35,
}: MagneticButtonProps) {
    const reduce = useReducedMotion()
    const ref = useRef<HTMLAnchorElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 })
    const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 })

    const handleMove = (e: React.MouseEvent) => {
        if (reduce || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const reset = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.a
            ref={ref}
            href={href}
            download={download}
            className={className}
            style={{ x: sx, y: sy }}
            onMouseMove={handleMove}
            onMouseLeave={reset}
        >
            {children}
        </motion.a>
    )
}
```

- [ ] **Step 2: Verify build is clean**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/common/MagneticButton.tsx
git commit -m "feat: add MagneticButton component"
```

---

### Task 4: Hero interactivity (spotlight + parallax + tilt + magnetic CTAs + animated gradient)

**Files:**
- Modify: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Wire up imports, refs, and motion values**

At the top of `Hero.tsx`, replace the import block (lines 1-7) with:

```tsx
import { motion, useMotionValue, useMotionTemplate, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { Github, Linkedin, Mail, Download } from 'lucide-react'
import { useRef } from 'react'
import { usePointerParallax } from '../../hooks/usePointerParallax'
import MagneticButton from '../common/MagneticButton'
import myPhoto from '../../assets/my_photo.png'
import flutterLogo from '../../assets/flutter-logo.png'
import vscodeLogo from '../../assets/visual-studio-code.png'
import pythonLogo from '../../assets/python.png'
import n8nLogo from '../../assets/n8n.svg'
```

Immediately inside `export default function Hero() {`, before the `return`, add:

```tsx
    const reduce = useReducedMotion()
    const sectionRef = useRef<HTMLElement>(null)
    const { x: px, y: py } = usePointerParallax(sectionRef)

    // Raw pointer pixels for the cursor spotlight
    const spotX = useMotionValue(0)
    const spotY = useMotionValue(0)
    const ssx = useSpring(spotX, { stiffness: 150, damping: 25 })
    const ssy = useSpring(spotY, { stiffness: 150, damping: 25 })
    const spotlight = useMotionTemplate`radial-gradient(600px circle at ${ssx}px ${ssy}px, rgba(126,102,172,0.18), transparent 70%)`
    const handleSpotlight = (e: React.PointerEvent) => {
        if (reduce) return
        const r = e.currentTarget.getBoundingClientRect()
        spotX.set(e.clientX - r.left)
        spotY.set(e.clientY - r.top)
    }

    // Parallax translations (different factors = depth)
    const orbX = useTransform(px, (v) => v * -40)
    const orbY = useTransform(py, (v) => v * -40)
    const photoX = useTransform(px, (v) => v * 25)
    const photoY = useTransform(py, (v) => v * 25)
    // 3D tilt for the photo
    const rotateY = useTransform(px, (v) => v * 16)
    const rotateX = useTransform(py, (v) => v * -16)
```

- [ ] **Step 2: Attach ref + spotlight to the section, add the spotlight layer**

Change the opening `<section ...>` (line 11) to attach the ref and pointer handler:

```tsx
        <section
            id="home"
            ref={sectionRef}
            onPointerMove={handleSpotlight}
            className="min-h-screen flex items-center justify-center relative overflow-hidden"
        >
```

Directly after the existing background `<div className="absolute inset-0 -z-10"> ... </div>` block (closes at line 18), add the spotlight overlay:

```tsx
            {!reduce && (
                <motion.div
                    className="pointer-events-none absolute inset-0 -z-[5]"
                    style={{ background: spotlight }}
                />
            )}
```

- [ ] **Step 3: Apply parallax to the orbs**

The two radial-glow orbs live inside the `bg-gradient-to-br` div (lines 14-17). Wrap them so they translate with `orbX`/`orbY`. Replace lines 15-16 (the two inner orb divs) with:

```tsx
                    <motion.div style={{ x: orbX, y: orbY }} className="absolute inset-0">
                        <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-[radial-gradient(circle,rgba(126,102,172,0.15)_0%,transparent_60%)] animate-pulse-slow" />
                        <div className="absolute bottom-[-50%] left-[-50%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(143,0,255,0.1)_0%,transparent_60%)] animate-pulse-slow animation-delay-[-5s]" />
                    </motion.div>
```

- [ ] **Step 4: Animate the gradient role line and apply tilt + parallax to the photo**

In the `<h2>` role line (lines 47-54), change the three `gradient-text` spans to `gradient-text-animated` (keep the Arabic text). Example for the first span:

```tsx
                            مطور <span className="gradient-text-animated">Flutter</span> | محلل <span className="gradient-text-animated">نظم</span> | خبير <span className="gradient-text-animated">أتمتة</span>
```

Replace the photo's outer motion wrapper (lines 116-121, the `motion.div` with `order-2`) to add parallax translation:

```tsx
                    <motion.div
                        className="relative order-2 lg:order-2 flex justify-center items-end self-end"
                        style={{ x: photoX, y: photoY }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
```

Replace the inner "Main Photo Container" motion wrapper (lines 157-162) to use 3D tilt instead of the flat hover scale:

```tsx
                        <motion.div
                            className="relative z-10"
                            style={{ rotateX, rotateY, transformPerspective: 900 }}
                            transition={{ duration: 0.3 }}
                        >
```

- [ ] **Step 5: Convert the two CTAs to magnetic buttons**

Replace the CTA block anchors (lines 71-78) — the `<a href="#contact" ...>` and `<a href="/cv.pdf" ...>` — with `MagneticButton`:

```tsx
                            <MagneticButton href="#contact" className="btn btn-primary">
                                <Mail size={20} />
                                تواصل معي
                            </MagneticButton>
                            <MagneticButton href="/cv.pdf" download className="btn btn-secondary">
                                <Download size={20} />
                                تحميل السيرة الذاتية
                            </MagneticButton>
```

- [ ] **Step 6: Verify build is clean**

Run: `npm run build`
Expected: PASS, no `tsc` errors (watch for unused-import errors — remove any import you didn't end up using).

- [ ] **Step 7: Verify interactivity in preview**

With the dev server running, navigate to home (it's the default background). Use `preview_screenshot` for a baseline. Then use `preview_eval` to dispatch a pointermove over the hero and confirm no errors via `preview_console_logs`. Use `preview_resize` to check mobile width (375px) — parallax/tilt should not break layout. Confirm reduced-motion path by evaluating `window.matchMedia('(prefers-reduced-motion: reduce)')` is respected (spotlight layer absent).
Expected: hero photo tilts/shifts with pointer; CTAs drift toward cursor; gradient text animates; no console errors; mobile layout intact.

- [ ] **Step 8: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: add mouse-driven interactivity to hero (spotlight, parallax, tilt, magnetic CTAs)"
```

---

### Task 5: Frosted-glass sliding page panels + interactive folder tabs

**Files:**
- Modify: `src/components/layout/VerticalTabs.tsx` (line 189 inline background)
- Modify: `src/components/layout/VerticalTabs.css` (`.tab-page-content` and `.attached-tab` rules)

- [ ] **Step 1: Make the page body frosted glass**

In `VerticalTabs.tsx`, the `tab-page-content` div (lines 185-192) currently sets `backgroundColor: '#1a1a2e'`. Remove that inline background so the CSS glass takes over. Replace the div's `style` object (lines 187-191) with:

```tsx
                style={{
                    borderTopColor: tab.color,
                    pointerEvents: isActive ? 'auto' : 'none',
                }}
```

- [ ] **Step 2: Restyle `.tab-page-content` as glass in CSS**

In `VerticalTabs.css`, replace the `.tab-page-content` rule (lines 183-193) with:

```css
.tab-page-content {
    flex: 1;
    border-top: 4px solid var(--tab-color, #454545);
    border-radius: 24px 24px 0 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: rgba(24, 22, 40, 0.55);
    backdrop-filter: blur(22px) saturate(140%);
    -webkit-backdrop-filter: blur(22px) saturate(140%);
    border-left: 1px solid rgba(255, 255, 255, 0.08);
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 -12px 60px color-mix(in srgb, var(--tab-color, #7E66AC) 30%, transparent),
                0 -4px 20px rgba(0, 0, 0, 0.45);
    margin-inline: 32px;
    min-height: 0;
}

@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    .tab-page-content { background: rgba(20, 18, 32, 0.94); }
}
```

- [ ] **Step 3: Add hover lift + glow to inactive tab handles**

In `VerticalTabs.css`, replace the `.attached-tab:hover` rule (lines 169-171) with a richer interaction, and add a `will-change` to `.attached-tab` for smoothness. First, append `will-change: transform, filter;` to the `.attached-tab` base rule (inside the block at lines 91-108). Then replace the hover rule:

```css
.attached-tab:hover {
    filter: brightness(1.15);
    transform: translateY(-8px) scale(1.04);
    box-shadow: 0 -6px 24px color-mix(in srgb, var(--tab-color, #7E66AC) 65%, transparent);
}
```

> Note: the handle already has an inline `transform: translateX(...)` in `VerticalTabs.tsx` (line 175) for the fan-out offset. CSS `transform` on `:hover` overrides it during hover, which momentarily drops the horizontal offset. To preserve the offset, in `VerticalTabs.tsx` move the horizontal offset off `transform` — set the handle's inline style `marginInlineStart`/position via `transform` is not needed if we instead pass the offset through the existing `--tab-offset` CSS var. Concretely: in the `.attached-tab` inline style (lines 173-179) replace `transform: \`translateX(${horizontalOffset}px)\`` with `translate: \`${horizontalOffset}px 0\``, and in the CSS `:hover` use `translate: 0 -8px;` + `scale: 1.04;` instead of `transform`. Using the separate `translate`/`scale` CSS properties avoids the conflict cleanly.

Final hover rule (using independent transform properties):

```css
.attached-tab {
    will-change: transform, filter, translate, scale;
}

.attached-tab:hover {
    filter: brightness(1.15);
    translate: 0 -8px;
    scale: 1.04;
    box-shadow: 0 -6px 24px color-mix(in srgb, var(--tab-color, #7E66AC) 65%, transparent);
}
```

And in `VerticalTabs.tsx` line 175, change:

```tsx
                    transform: `translateX(${horizontalOffset}px)`,
```
to:
```tsx
                    translate: `${horizontalOffset}px 0`,
```

- [ ] **Step 4: Verify build is clean**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Verify in preview**

With the dev server running: take `preview_screenshot` of the closed state (tabs at bottom), then `preview_click` a tab to open it and screenshot the frosted panel — the hero glow should be visible through it. Hover a tab via `preview_eval` (dispatch mouseover) and screenshot the lift/glow. Confirm drag-to-open still works by checking the tab still opens on click. Check `preview_console_logs` for errors.
Expected: open panels are translucent frosted glass with colored glow; inactive tabs lift + glow on hover; horizontal fan-out offset preserved during hover; open/close still works.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/VerticalTabs.tsx src/components/layout/VerticalTabs.css
git commit -m "feat: frosted-glass page panels + hover-interactive folder tabs"
```

---

### Task 6: Cross-section consistency check + final verification

**Files:**
- Read/verify: `src/components/sections/Projects.tsx`, `Experience.tsx`, `Contact.tsx`
- Modify only if a section uses a hardcoded solid surface instead of `.card` (apply `.card` or `glass-panel`/inline glass to match)

- [ ] **Step 1: Audit remaining sections**

Open `Projects.tsx`, `Experience.tsx`, and `Contact.tsx`. Confirm their card-like surfaces use the `.card` class (which is now glass). For any surface using a hardcoded `bg-dark-card` / solid background instead of `.card`, change it to `.card` or add the same glass treatment (`bg-white/5 backdrop-blur-md border border-white/10`) so the look is consistent. Do not change any text/content.

- [ ] **Step 2: Verify full build + lint**

Run: `npm run build`
Expected: PASS.

Run: `npm run lint`
Expected: PASS (no new errors). Fix any unused imports/vars introduced.

- [ ] **Step 3: Full visual verification**

With the dev server running, walk every tab via `preview_click` (`about`, `skills`, `projects`, `experience`, `contact`) and `preview_screenshot` each. Run `preview_resize` to 375px (mobile) and re-screenshot home + one open panel. Check `preview_console_logs` is clean throughout.
Expected: consistent glass aesthetic across all sections; RTL layout intact; no console errors at desktop or mobile widths.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "polish: ensure consistent glass treatment across all sections"
```

---

## Self-Review

**Spec coverage:**
- Spec §1 Hero interactivity → Task 4 (spotlight, parallax, tilt, magnetic CTAs, animated gradient, icon hover via existing float) + Tasks 2-3 (hook/component). ✓
- Spec §2 Interactive folder tabs → Task 5 Steps 3-4. ✓
- Spec §3 Frosted-glass page body → Task 5 Steps 1-2. ✓
- Spec §4 Global polish (shared classes, reduced-motion, performance, section consistency) → Task 1 + Task 6. ✓
- Spec opaque fallback (`@supports`) → Task 1 Step 1 + Task 5 Step 2. ✓
- Spec RTL preserved → no logical-property regressions introduced; verified in Task 6 Step 3. ✓

**Placeholder scan:** No TBD/TODO; every code step shows complete code. ✓

**Type consistency:** `usePointerParallax(ref)` returns `{ x, y, reduce }`; consumed in Task 4 as `{ x: px, y: py }`. `MagneticButton` props (`href`, `className`, `download`, `strength`, `children`) match usage in Task 4 Step 5. Independent CSS `translate`/`scale` properties used consistently in Task 5 Steps 3 (handle inline + hover). ✓

**Note on icon hover (spec §1):** the tech icons already float idly; adding hover scale/glow is optional polish — if pursued, add `whileHover={{ scale: 1.15 }}` to each icon's `motion.div` in `Hero.tsx` during Task 4. Not a separate task.
