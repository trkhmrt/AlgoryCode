---
name: algorycode-design
description: AlgoryCode dark minimal design system for Next.js + Tailwind v4. Use when building or editing UI pages, components, admin panels, forms, navbar, footer, cards, buttons, typography, spacing, colors, or any visual/styling work in this project. Ensures new screens match existing Card, Button, Badge, Navbar, and globals.css patterns.
metadata:
  author: algorycode
  version: "1.0.0"
  project: AlgoryCode
---

# AlgoryCode Design System

Dark, minimal, developer-platform aesthetic. High contrast without noise: black surfaces, `#ededed` text, `#1a1a1a` borders, white primary CTAs.

## When to Apply

Use this skill when:
- Adding or editing pages, sections, admin screens, or forms
- Creating new UI components
- Choosing colors, fonts, spacing, or motion
- Matching existing marketing or admin UI

## Core Rules

1. **Reuse before reinventing** — import from `src/components/ui/` (`Button`, `Card`, `Badge`) and layout utilities from `globals.css`.
2. **Dark by default** — `bg-black`, `text-[#ededed]`, borders `#1a1a1a`, hover borders `#333`.
3. **Typography** — body: Geist Sans (`font-sans`). Headings: `.heading` class. Mono/code: Geist Mono (`font-mono` / `.terminal-line`).
4. **Layout** — wrap page content in `.container-x`. Sections use `.section` (120px vertical padding, 80px on mobile).
5. **Radius** — buttons/inputs: `rounded-md`. Cards/panels: `rounded-[8px]`. Badges: `rounded-full`.
6. **Focus** — always include `focus-visible:outline-2 focus-visible:outline-offset-2` with appropriate outline color.
7. **Icons** — `lucide-react`, typically 15–16px in nav/footer, 16–24px in content.
8. **Motion** — framer-motion for nav dropdowns/mobile menu only where already used; respect `prefers-reduced-motion` (defined in globals.css).
9. **Language** — UI copy in Turkish unless the page is explicitly English (e.g. Hero/Synapse landing variant).

## Component Map

| Need | Use | Source |
|------|-----|--------|
| Primary/secondary action | `<Button>` | `src/components/ui/Button.tsx` |
| Content panel | `<Card>` | `src/components/ui/Card.tsx` |
| Status/tag chip | `<Badge tone="...">` | `src/components/ui/Badge.tsx` |
| Site header | `<Navbar />` | `src/components/sections/Navbar.tsx` |
| Site footer | `<Footer />` | `src/components/sections/Footer.tsx` |
| Page shell | `.container-x` + `.section` | `src/app/globals.css` |

## Reference Files

Read the relevant file before implementing UI:

| Topic | File |
|-------|------|
| Colors, tokens, accents | [references/colors-and-tokens.md](references/colors-and-tokens.md) |
| Fonts, headings, text scale | [references/typography.md](references/typography.md) |
| Button variants & sizes | [references/buttons.md](references/buttons.md) |
| Card patterns | [references/cards.md](references/cards.md) |
| Badge tones | [references/badges.md](references/badges.md) |
| Forms, inputs, alerts | [references/forms-and-inputs.md](references/forms-and-inputs.md) |
| Navbar & dropdowns | [references/navbar.md](references/navbar.md) |
| Footer | [references/footer.md](references/footer.md) |
| Layout, spacing, grids | [references/layout-and-spacing.md](references/layout-and-spacing.md) |
| Motion, glass, bento, effects | [references/motion-and-effects.md](references/motion-and-effects.md) |
| Page & admin patterns | [references/page-patterns.md](references/page-patterns.md) |
| Toast notifications | [references/toast.md](references/toast.md) |

## Quick Page Template

```tsx
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function ExamplePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="section border-b border-[#1a1a1a]">
          <div className="container-x">
            <p className="text-[13px] uppercase tracking-[0.2em] text-[#888]">
              AlgoryCode
            </p>
            <h1 className="heading mt-4 text-4xl font-semibold md:text-5xl">
              Sayfa Başlığı
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#888]">
              Kısa açıklama metni.
            </p>
          </div>
        </section>
        <section className="section pt-0">
          <div className="container-x">
            <Card className="p-6">{/* content */}</Card>
            <Button href="/#cta" className="mt-6">Devam Et</Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

## Do Not

- Introduce light themes, colored page backgrounds, or rounded-2xl+ cards unless matching Hero/Synapse variant explicitly
- Use random hex colors outside the token palette
- Skip hover/focus states on interactive elements
- Create one-off button styles when `Button` variants cover the case
- Use `@apply` heavily — prefer existing utility classes and shared CSS classes from `globals.css`

## Toast notifications

Global toast system is available on every page via root `AppProviders`.

```tsx
"use client";

import { useToast } from "@/components/ui/ToastProvider";

export function Example() {
  const { success, error, showToast } = useToast();

  return (
    <>
      <button onClick={() => success("İşlem başarılı.")}>Başarı</button>
      <button onClick={() => error("Bir hata oluştu.")}>Hata</button>
      <button onClick={() => showToast("Bilgi mesajı", "success")}>Özel</button>
    </>
  );
}
```

See [references/toast.md](references/toast.md) for styling details.
