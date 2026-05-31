# Cards

Source: `src/components/ui/Card.tsx`

## Base Component

```tsx
import { Card } from "@/components/ui/Card";

<Card className="p-6">...</Card>
<Card as="article" className="overflow-hidden">...</Card>
```

## Default Styles

```
relative
bg-[#0a0a0a]
border border-[#1a1a1a]
rounded-[8px]
transition-colors duration-300
hover:border-[#333]
```

## Padding Conventions

| Context | Padding |
|---------|---------|
| Standard content | `p-6` or `p-8` |
| Compact stat | `p-5` |
| Empty state | `p-10 text-center` |
| Table wrapper | `overflow-hidden` (no extra padding on Card; padding on cells) |

## Card Sections (admin forms)

Group related fields inside separate Cards with a header block:

```tsx
<Card className="space-y-6 p-6">
  <div>
    <h2 className="text-lg font-semibold">Genel Bilgiler</h2>
    <p className="mt-1 text-sm text-[#888]">Alt açıklama metni.</p>
  </div>
  {/* fields */}
</Card>
```

## List / Grid Cards (education, marketing)

```tsx
<div className="grid gap-6 lg:grid-cols-2">
  <Card className="overflow-hidden">
    {/* optional cover image with border-b */}
    <div className="space-y-5 p-6">...</div>
  </Card>
</div>
```

Cover image pattern:
```tsx
<div className="aspect-[16/9] overflow-hidden border-b border-[#1a1a1a]">
  <img className="h-full w-full object-cover" ... />
</div>
```

## Nested Surface (inside cards)

Use slightly darker nested blocks for list items:
```
rounded-md border border-[#1a1a1a] bg-[#080808] p-4
```

## Dashboard Stat Card

```tsx
<Card className="p-5">
  <p className="text-[13px] uppercase tracking-[0.12em] text-[#888]">Label</p>
  <p className="mt-3 text-3xl font-semibold tabular">{value}</p>
</Card>
```

## Do Not

- Use heavy shadows — elevation is communicated via borders only
- Use `rounded-xl` or larger on standard content cards (reserve for bento grids in `globals.css`)
