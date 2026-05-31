# Layout & Spacing

Source: `src/app/globals.css`

## Container

```css
.container-x {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
}
```

Always wrap page content in `.container-x`. Do not create alternate max-widths unless a hero explicitly uses `max-w-[1280px]` (Synapse Hero variant).

## Section Spacing

```css
.section {
  padding-top: 120px;
  padding-bottom: 120px;
}
@media (max-width: 768px) {
  .section { padding-top: 80px; padding-bottom: 80px; }
}
```

Patterns:
- Hero/header section: `section border-b border-[#1a1a1a]`
- Following content: `section pt-0` (avoids double top padding)
- Admin main: `py-8 lg:py-10` inside sidebar layout

## Vertical Rhythm

| Gap | Class | Use |
|-----|-------|-----|
| Page sections | `space-y-8` | Admin pages, form stacks |
| Card internal | `space-y-5` or `space-y-6` | Card content |
| Field groups | `space-y-2` | Label + input |
| Grid gap | `gap-4`, `gap-5`, `gap-6` | Stats, cards, forms |
| Inline actions | `gap-2`, `gap-3`, `gap-4` | Button rows, header actions |

## Admin Layout

```tsx
<div className="container-x flex flex-col lg:flex-row">
  <AdminSidebar />  {/* lg:w-56, border-r */}
  <main className="min-w-0 flex-1 py-8 lg:py-10 lg:pl-10">{children}</main>
</div>
```

Admin header height: `h-16` (matches navbar)

## Responsive Grids

| Pattern | Classes |
|---------|---------|
| Stats (4 col) | `grid gap-4 sm:grid-cols-2 xl:grid-cols-4` |
| Content cards | `grid gap-6 lg:grid-cols-2` |
| Detail + sidebar | `grid gap-8 lg:grid-cols-[1.4fr_0.8fr]` |
| Form fields | `grid gap-5 md:grid-cols-2` |

## Sticky Header

Navbar and admin header: `sticky top-0 z-50` (navbar) or static top bar (admin).

## Background Layers

| Layer | Color |
|-------|-------|
| Page | `bg-black` |
| Card | `bg-[#0a0a0a]` |
| Nested | `bg-[#080808]` |
| Dropdown | `bg-[#0a0a0a]` |

## Border Dividers

Horizontal rules: `border-b border-[#1a1a1a]` or `border-t border-[#1a1a1a]`

## Max Width for Prose

Intro text blocks: `max-w-2xl` or `max-w-3xl` with `leading-relaxed text-[#888]`
