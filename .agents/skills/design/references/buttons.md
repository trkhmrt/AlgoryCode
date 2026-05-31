# Buttons

Source: `src/components/ui/Button.tsx`

Always use `<Button>` instead of raw `<button>` or styled links for actions.

## API

```tsx
import { Button } from "@/components/ui/Button";

// As link
<Button href="/path" variant="primary" size="md">Label</Button>

// As button
<Button type="submit" variant="secondary" disabled={pending}>Kaydet</Button>
```

## Variants

| Variant | Appearance | When to use |
|---------|------------|-------------|
| `primary` (default) | White bg, black text, white border | Main CTA — "Demo Talep Et", "Kayıt Ol", form submit |
| `secondary` | Transparent, `#ededed` text, `#1a1a1a` border | Secondary actions — "Giriş Yap", cancel-adjacent |
| `ghost` | Transparent, no visible border | Tertiary/inline actions |

### Variant Classes (reference)

```
primary:   bg-white text-black border-white hover:bg-[#ededed]
secondary: bg-transparent text-[#ededed] border-[#1a1a1a] hover:border-[#333] hover:bg-[#0a0a0a]
ghost:     bg-transparent text-[#ededed] border-transparent hover:bg-[#0a0a0a]
```

## Sizes

| Size | Height | Padding | Font |
|------|--------|---------|------|
| `sm` | `h-8` | `px-3` | `text-[13px]` |
| `md` (default) | `h-10` | `px-4` | `text-[14px]` |
| `lg` | `h-12` | `px-6` | `text-[15px]` |

## Base Styles (all variants)

```
inline-flex items-center justify-center gap-2
rounded-md font-medium
transition-colors duration-200
focus:outline-none
disabled:opacity-50 disabled:pointer-events-none
whitespace-nowrap
focus-visible:outline-2 focus-visible:outline-offset-2
```

## Focus Outlines

- Primary: `focus-visible:outline-white`
- Secondary/Ghost: `focus-visible:outline-[#333]`

## Common Patterns

Navbar CTAs:
```tsx
<Button href="/" variant="secondary" size="sm">Giriş Yap</Button>
<Button href="/#cta" variant="primary" size="sm">Demo Talep Et →</Button>
```

Full-width form submit:
```tsx
<Button type="submit" className="w-full" disabled={pending}>
  {pending ? "Kaydediliyor..." : "Kaydet"}
</Button>
```

Text-only logout (admin header — exception, not Button component):
```tsx
<button className="text-sm text-[#888] hover:text-[#ededed] transition-colors">
  Çıkış Yap
</button>
```

## Arrow Suffix

Primary marketing CTAs often end with `→` in label text: `Demo Talep Et →`
