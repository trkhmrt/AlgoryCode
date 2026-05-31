# Toast Notifications

Source: `src/components/ui/ToastProvider.tsx`  
Global wrapper: `src/components/AppProviders.tsx` (root layout)

## Usage

Only works in **client components** (`"use client"`).

```tsx
import { useToast } from "@/components/ui/ToastProvider";

const { success, error, showToast } = useToast();

success("Kayıt başarılı.");
error("İşlem başarısız.");
showToast("Mesaj", "success"); // or "error"
```

## Variants

| Variant | Border | Icon color | Use |
|---------|--------|------------|-----|
| `success` | `border-emerald-500/25` | emerald | Save OK, payment success |
| `error` | `border-red-500/25` | red | Validation, API errors |

## Visual spec

- Position: fixed bottom-right (`bottom-6 right-6`)
- Surface: `bg-[#0a0a0a]/95` + `nav-blur` + shadow
- Radius: `rounded-[8px]`
- Auto-dismiss: 4.5s
- Manual dismiss: X button
- Animation: framer-motion fade/slide (200ms)

## Accessibility

- Container: `aria-live="polite"`
- Each toast: `role="status"`
- Dismiss button: `aria-label="Bildirimi kapat"`

## Do not

- Nest a second `ToastProvider` — one global instance in root layout is enough
- Use toast for long-form content — keep messages to one short sentence
