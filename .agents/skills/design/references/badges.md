# Badges

Source: `src/components/ui/Badge.tsx`

## Usage

```tsx
import { Badge } from "@/components/ui/Badge";

<Badge>Default</Badge>
<Badge tone="speed">Hızlı</Badge>
<Badge tone="security">Güvenli</Badge>
<Badge tone="scale">Ölçek</Badge>
<Badge tone="warn">Uyarı</Badge>
```

## Base Styles

```
inline-flex items-center gap-1.5
rounded-full border px-3 py-1
text-[12px] tracking-tight
bg-[#0a0a0a]
```

## Tones

| Tone | Border | Text | Semantic use |
|------|--------|------|--------------|
| `default` | `#1a1a1a` | `#ededed` | Level, format, generic tags |
| `speed` | `#1a3a26` | `#00ff88` | Performance/speed features |
| `security` | `#16243f` | `#3b82f6` | Security features |
| `scale` | `#311a4a` | `#a855f7` | Scale/infrastructure |
| `warn` | `#3a2a0c` | `#f59e0b` | Warnings, highlights |

## Layout Pattern

Wrap multiple badges in a flex row:
```tsx
<div className="flex flex-wrap gap-2">
  <Badge>{level}</Badge>
  <Badge>{format}</Badge>
  <Badge>{price}</Badge>
</div>
```

## Status Pill (admin tables — inline, not Badge component)

For table status without semantic tone:
```tsx
<span className="rounded-full border border-[#333] px-2.5 py-1 text-xs">
  Yayında
</span>
```
