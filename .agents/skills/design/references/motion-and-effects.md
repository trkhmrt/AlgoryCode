# Motion & Visual Effects

Source: `src/app/globals.css`

Use these classes for marketing sections. Admin UI stays mostly static (no gratuitous animation).

## Background Textures

| Class | Effect |
|-------|--------|
| `.dot-grid` | Radial dot pattern, 24px grid |
| `.grid-lines` | 80px line grid on `#111` |
| `.noise` | SVG fractal noise overlay at 3% opacity |
| `.spot-glow` | Radial white glow at 50% 30% |

## Glass / Liquid

| Class | Use |
|-------|-----|
| `.liquid-glass` | Subtle blur (4px), gradient border pseudo |
| `.liquid-glass-strong` | Strong blur (50px), inset highlight |
| `.nav-blur` | Navbar backdrop blur |
| `.gradient-border` | Animated gradient 1px border mask |

## Corner Accents

`.corner-tl`, `.corner-tr`, `.corner-bl`, `.corner-br` — 14px L-shaped borders in `#2a2a2a`

## Marquee

```css
.marquee-track  → 30s linear infinite
.marquee-fast   → 18s linear infinite
```

## Terminal / Tech Effects

| Class | Effect |
|-------|--------|
| `.scanline` | Horizontal scan animation, 8s |
| `.ping-dot` | Soft ping pulse |
| `.blink-cursor` | Terminal cursor blink |
| `.ring-rotate-slow/mid/fast` | Rotating rings |
| `.chevron-pulse` | Scroll indicator bounce |
| `.dash-ring` | Dashed ring spin |
| `.node-topology-beam` | Cyan beam flow on SVG paths |

## Bento Grids

Marketing bento layouts — do not repurpose for admin:

| Class | Layout |
|-------|--------|
| `.bento-grid` | 3×4 marketing grid, 2px gap, `#1a1a1a` background |
| `.product-bento` | Product page 3×3 variant |
| `.bento-cell` | Cell with hover scale 1.01 + border brighten |

Responsive breakpoints at 1024px and 640px — see `globals.css`.

## Framer Motion (Navbar)

Standard easing for UI reveals:
```tsx
transition={{ duration: 0.16, ease: "easeOut" }}
// or
transition={{ duration: 0.18, ease: "easeOut" }}  // mobile menu
```

Hero sections may use staggered `fadeUp` variants — see `Hero.tsx`.

## Reduced Motion

All animations respect:
```css
@media (prefers-reduced-motion: reduce) { ... }
```

When adding new animations, include them in this block or use CSS that inherits the global reset.

## Scroll Utilities

```
.scrollbar-none   → hide scrollbar
.snap-y-strict    → scroll snap container
.snap-start       → snap child
```

## Icon Animation

Prefer static icons in admin. In marketing, lucide icons at 15–16px default; icon boxes in dropdowns are static containers.
