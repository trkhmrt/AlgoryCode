# Typography

## Font Stack

| Role | Font | CSS Variable | Loaded In |
|------|------|--------------|-----------|
| Body / UI | Geist Sans (variable) | `--font-geist-sans` | `src/app/layout.tsx` via `next/font/local` |
| Mono / terminal | Geist Mono (variable) | `--font-geist-mono` | `src/app/layout.tsx` |
| Sans fallback | system stack | `--font-sans` | `globals.css` @theme |
| Mono fallback | system mono | `--font-mono` | `globals.css` @theme |

Additional web fonts imported in `globals.css` (used in specific sections, not default body):
- Switzer, General Sans (Fontshare)
- Instrument Serif, Barlow, Inter, Plus Jakarta Sans (Google Fonts)

**Default for new pages:** rely on Geist via `font-sans` on `<body>`.

## Body Defaults

```tsx
// layout.tsx
<body className="... antialiased bg-black text-[#ededed] font-sans">
```

```css
html, body {
  background: #000;
  color: #ededed;
  font-feature-settings: "ss01", "cv11";
}
```

## Heading Classes

| Class | Letter-spacing | Line-height | Use |
|-------|----------------|-------------|-----|
| `.heading` | `-0.04em` | `1.05` | Page titles, hero headings |
| `.heading-tight` | `-0.03em` | `1.1` | Slightly tighter headings |

Example:
```tsx
<h1 className="heading text-4xl font-semibold md:text-5xl">Başlık</h1>
```

## Text Scale (common)

| Element | Classes |
|---------|---------|
| Page title | `heading text-3xl font-semibold` → `text-5xl` on marketing |
| Section title | `text-lg font-semibold` or `text-xl font-semibold` |
| Body | `text-sm` or `text-base leading-relaxed text-[#888]` |
| Nav link | `text-[14px] text-[#888] hover:text-[#ededed]` |
| Micro label | `text-[13px] uppercase tracking-[0.2em] text-[#888]` |
| Footer column title | `text-[12px] uppercase tracking-[0.18em] text-[#888]` |
| Badge | `text-[12px] tracking-tight` |
| Table header | `text-[13px] uppercase tracking-[0.12em] text-[#888]` |

## Mono / Terminal

```css
.terminal-line {
  font-family: var(--font-mono);
  color: #00ff88;
  font-size: 13px;
  line-height: 1.7;
}
```

## Tabular Numbers

Use `.tabular` or `font-variant-numeric: tabular-nums` for stats/dashboard counts.

## Logo / Brand Text

```tsx
<span className="text-[15px] font-semibold tracking-tight">Stack</span>
```

Logo mark: white square `w-5 h-5 bg-white` beside brand name.
