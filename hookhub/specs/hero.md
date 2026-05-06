# Hero Component Spec

A spec for the HookHub landing page hero. Use this as the contract when building variations (e.g. `HeroMinimal`, `HeroVideo`, `HeroSplit`). Variations may diverge visually, but should preserve the **purpose**, **content contract**, and **constraints** below.

## Purpose

The hero is the first thing a visitor sees on the HookHub landing page. It must, in order of priority:

1. Communicate what HookHub is — a community marketplace for Claude Code hooks.
2. Convey energy/momentum — the project is active, community-driven, and modern.
3. Drive the primary action: **Browse Hooks**.
4. Offer the secondary action: **Submit a Hook**.
5. Provide social proof via headline stats.

A visitor scanning for ~3 seconds should be able to answer: *"What is this, and what can I do here?"*

## Content Contract

Every variation MUST include these content slots. Wording can be tuned, but the slot must exist:

| Slot | Current value | Notes |
|---|---|---|
| Eyebrow / badge | "Community-Powered Automation" | Short tagline framing the category |
| Headline | "Supercharge Claude Code with **powerful hooks**" | Last 2 words are the visual focal point |
| Description | 1–2 sentence value prop mentioning workflow + examples | Keep under ~30 words |
| Primary CTA | "Browse Hooks" → hooks list | Must be visually dominant |
| Secondary CTA | "Submit a Hook" → submission flow | Visually subordinate to primary |
| Stats row | 3 metrics (hooks, downloads, contributors) | Numbers are placeholders; structure is fixed |

Optional decorative slot:

- **Hero visual** — currently the orbiting-rings illustration on the right. Variations may swap, remove on small screens, or replace entirely (video, code preview, animated diagram, etc.).

## Visual Guidelines

### Brand colors (do not introduce new ones without reason)

- `#d97757` — Anthropic orange. Primary brand accent. Used for primary CTA, focal text, badge.
- `#6a9bcc` — Blue accent. Secondary highlights.
- `#788c5d` — Green accent. Tertiary highlights.
- Theme tokens: `var(--background)`, `var(--foreground)`, `var(--slate-light)`, `var(--border)`. Use these for anything that must respond to light/dark mode — never hardcode neutral grays.

### Layout

- Full-width section, content constrained by the parent `max-w-6xl` container.
- Vertical rhythm: generous top/bottom padding (`py-24 md:py-32`). The hero should feel like its own room, not a strip.
- Two-column on `lg+`, single column below. The right column is decorative and may be hidden on smaller breakpoints (`hidden lg:flex`).
- Content order on small screens: badge → headline → description → CTAs → stats.

### Typography

- Headline: `text-4xl md:text-5xl lg:text-6xl`, bold, tight tracking, line-height ~1.05.
- Description: `text-lg md:text-xl`, muted color (`--slate-light`), relaxed line-height.
- Stats numbers: `text-3xl font-bold`, labels small and muted.

### Motion

Motion is core to the hero's identity, but must stay tasteful:

- Background elements (orbs, grid, nodes, connection lines) are **decorative only** — no information lives there.
- Content elements (badge, headline, description, CTAs, stats) animate in on load with staggered delays (`animate-fade-in`, `animate-slide-up` + `animation-delay-200/400/600`).
- Decorative loops (`animate-pulse-slow`, `animate-float`, `animate-spin-slow`, etc.) should be slow enough to feel ambient, not distracting.
- Respect users with `prefers-reduced-motion` — variations should still be readable and functional with motion disabled.

## Structural Guidelines

- **No data fetching in this component.** It is a presentational block. Stats and copy are passed as content or hardcoded for now; if they become dynamic, accept them via props rather than reaching into a store.
- **No router / navigation logic.** CTA buttons currently have no `onClick`/`href`. When wired up, accept handlers or hrefs as props so variations stay swappable.
- **Self-contained.** The component renders its own background layer; the parent should not need to coordinate stacking contexts. Keep `relative` + `z-10` on content and `absolute inset-0` on decoration.
- **No external assets required** beyond what's already in `globals.css`. Custom animation keyframes (`animate-pulse-slow`, `animate-float`, `animate-dash`, `animate-spin-slow`, `animate-reverse-spin`, `animate-gradient`, `animate-draw`, `animation-delay-*`) are defined globally — variations can reuse them.

## What Variations May Change

- Layout (split, centered, stacked, asymmetric, full-bleed video bg).
- The decorative visual on the right (or remove it entirely).
- Headline phrasing and emphasis target.
- Density of motion (one variation could be near-static).
- Inclusion / placement of the stats row (may move below CTAs, become a strip, or be removed for a minimal variant).

## What Variations Must NOT Change

- The five required content slots from the **Content Contract**.
- The brand color palette (no new accents without a design reason).
- Use of theme CSS variables for neutrals — variations must work in both light and dark mode.
- Primary CTA being visually dominant over secondary.
- Mobile-first responsiveness (must be usable down to ~375px wide).
- Accessibility basics: real `<button>`/`<a>` elements for actions, sufficient contrast, motion that respects `prefers-reduced-motion`.

## Naming Convention

Place each variation alongside the original:

```
src/components/Hero/
  Hero.tsx           ← current default
  HeroMinimal.tsx    ← example variation
  HeroSplit.tsx      ← example variation
  SPEC.md            ← this file
```

Export each as a default export with the component's name. The page picks one to render — variations are not composed together.
