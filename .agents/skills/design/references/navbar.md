# Navbar

Source: `src/components/sections/Navbar.tsx`

Client component (`"use client"`) with framer-motion dropdowns and mobile drawer.

## Structure

```tsx
<header className="sticky top-0 z-50 w-full border-b border-[#1a1a1a] nav-blur">
  <nav className="container-x h-16 flex items-center justify-between">
    {/* logo | desktop nav | desktop CTAs | mobile toggle */}
  </nav>
  {/* mobile menu (AnimatePresence) */}
</header>
```

## Nav Blur

```css
.nav-blur {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: saturate(180%) blur(12px);
}
```

## Logo

```tsx
<Link href="/" className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
  <span className="inline-block w-5 h-5 bg-white" aria-hidden />
  <span>Stack</span>
</Link>
```

## Desktop Nav Links

Default state muted, hover bright:
```
px-3 py-2 text-[14px] text-[#888]
hover:text-[#ededed] focus:text-[#ededed]
transition-colors rounded-md
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#333]
```

## Dropdown Triggers (Ürünler, Çözümler)

- Hover/focus opens menu (`onMouseEnter`, `onMouseLeave` on `<ul>`)
- Chevron rotates 180° when open
- Panel: `bg-[#0a0a0a] border border-[#1a1a1a] rounded-[8px] p-2`
- Item hover: `hover:bg-[#0d0d0d]`
- Item layout: optional 36px icon box + label + 12px description

Dropdown motion:
```tsx
initial={{ opacity: 0, y: -6 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -6 }}
transition={{ duration: 0.16, ease: "easeOut" }}
```

Icon box in dropdown:
```
h-9 w-9 border border-[#1a1a1a] rounded-md text-[#ededed]
```

## Plain Nav Items

Current items: Eğitim (`/education`), Fiyatlandırma (`/#pricing`), Blog (`/`)

## Desktop CTAs (right)

```tsx
<Button href="/" variant="secondary" size="sm">Giriş Yap</Button>
<Button href="/#cta" variant="primary" size="sm">Demo Talep Et →</Button>
```

## Mobile Menu

- Toggle: `h-9 w-9 rounded-md border border-[#1a1a1a]`
- Panel: `border-t border-[#1a1a1a] bg-black`
- Group label: `text-[11px] uppercase tracking-[0.18em] text-[#666]`
- Link: `px-3 py-3 text-[15px] hover:bg-[#0a0a0a] rounded-md`
- Bottom: two full-width buttons in `flex gap-2`

## Breakpoints

- Desktop nav + CTAs: `hidden md:flex`
- Mobile toggle: `md:hidden`
- Mobile menu panel: `md:hidden`

## Adding a New Nav Item

1. Add `<li><Link href="..." ...>Label</Link></li>` in desktop `<ul>`
2. Mirror in mobile `<ul>` with `onClick={() => setMobileOpen(false)}`
3. Use same link classes as existing plain items
4. Call `onMouseEnter={() => setOpenMenu(null)}` to close dropdowns
