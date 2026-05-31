# Colors & Design Tokens

Source: `src/app/globals.css` (`@theme` block)

## Base Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#000000` | Page background, input backgrounds |
| `--color-surface` | `#0a0a0a` | Cards, dropdown panels, hover surfaces |
| `--color-surface-2` | `#080808` | Table headers, nested panels |
| `--color-surface-3` | `#0d0d0d` | Dropdown item hover |
| `--color-border` | `#1a1a1a` | Default borders, dividers |
| `--color-border-bright` | `#2e2e2e` | Bento hover, corner accents |
| `--color-text` | `#ededed` | Primary text, headings |
| `--color-muted` | `#888888` | Secondary text, nav links default |
| `--color-dim` | `#444444` | Tertiary text, placeholders, footer links |
| `--color-faint` | `#333333` | Focus outlines, hover borders |

## Accent Colors (semantic)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-accent-speed` | `#00ff88` | Speed/terminal/success accent |
| `--color-accent-security` | `#3b82f6` | Security badge, blue accent |
| `--color-accent-scale` | `#a855f7` | Scale/purple accent |
| `--color-accent-warn` | `#f59e0b` | Warning states |

## Tailwind Usage

Prefer explicit hex classes matching tokens (project convention):

```
bg-black          → page
bg-[#0a0a0a]      → card surface
border-[#1a1a1a]  → default border
hover:border-[#333] → interactive hover
text-[#ededed]    → primary text
text-[#888]       → muted text
text-[#444]       → dim text
```

## Selection

```css
::selection {
  background: #ededed;
  color: #000;
}
```

## Status / Alert Colors

| State | Border | Background | Text |
|-------|--------|------------|------|
| Error | `border-red-500/20` | `bg-red-500/10` | `text-red-300` |
| Warning | `border-amber-500/20` | `bg-amber-500/10` | `text-amber-200` |
| Success | `border-emerald-500/20` | `bg-emerald-500/10` | `text-emerald-200` |

## Primary CTA Contrast

Primary buttons use inverted contrast: **white background, black text** (`bg-white text-black`). This is intentional — the main action pops against the dark UI.

## Global Border Default

```css
* { border-color: #1a1a1a; }
```

All elements inherit `#1a1a1a` as default border color unless overridden.
