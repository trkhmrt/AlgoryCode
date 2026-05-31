# Page Patterns

Reusable compositions from existing pages.

## Marketing Content Page

Used by: `/education`, `/products/[slug]`

```tsx
<>
  <Navbar />
  <main>
    <section className="section border-b border-[#1a1a1a]">
      <div className="container-x">{/* hero intro */}</div>
    </section>
    <section className="section pt-0">
      <div className="container-x">{/* main content */}</div>
    </section>
  </main>
  <Footer />
</>
```

Hero intro pattern:
```tsx
<p className="text-[13px] uppercase tracking-[0.2em] text-[#888]">AlgoryCode Education</p>
<h1 className="heading mt-4 text-4xl font-semibold md:text-5xl">Eğitimler</h1>
<p className="mt-4 text-base leading-relaxed text-[#888]">...</p>
```

## Empty State

```tsx
<Card className="p-10 text-center">
  <Icon className="mx-auto text-[#444]" size={32} />
  <p className="mt-4 text-lg font-medium">Henüz içerik yok</p>
  <p className="mt-2 text-sm text-[#888]">Açıklama metni.</p>
  <Button href="..." variant="secondary" className="mt-4">Aksiyon</Button>
</Card>
```

## Detail Page with Sidebar

```tsx
<div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
  <div>{/* main column */}</div>
  <Card className="h-fit p-6">{/* sticky summary sidebar */}</Card>
</div>
```

Back link:
```tsx
<Link href="/education" className="text-sm text-[#888] hover:text-[#ededed] transition-colors">
  ← Tüm Eğitimler
</Link>
```

## List Item Meta Row

Icon + text rows (16px lucide, `#888` icons):
```tsx
<p className="inline-flex items-center gap-2 text-sm text-[#888]">
  <Calendar size={15} />
  {formattedDate}
</p>
```

## Admin Dashboard

Source: `src/app/admin/(protected)/page.tsx`

- Page header: title + subtitle + primary action link/button
- Stat grid: 4× `<Card className="p-5">`
- Recent list: nested `bg-[#080808]` rows inside Card

## Admin CRUD List

Source: `src/app/admin/(protected)/educations/page.tsx`

- Header with `<Button href=".../new">Yeni Eğitim</Button>`
- `<Card className="overflow-hidden">` wrapping table
- Table: header `bg-[#080808] text-[#888]`, rows `border-b border-[#1a1a1a]`
- Row actions: text links (Düzenle, Görüntüle, Sil)

## Admin Sidebar Nav

Source: `src/app/admin/(protected)/AdminSidebar.tsx`

Active item:
```
bg-[#0a0a0a] text-[#ededed] border border-[#333]
```

Inactive:
```
text-[#888] hover:bg-[#0a0a0a] hover:text-[#ededed] border border-transparent
```

## Admin Form Page

- Multiple `<Card className="space-y-6 p-6">` sections
- Submit button at bottom outside last card: `<div className="flex flex-wrap gap-3">`

## Auth Page

Source: `src/app/admin/login/page.tsx`

- Full viewport centered
- Optional top alert (warning/error) above form card
- No Navbar/Footer

## Home / Synapse Hero (special case)

`src/components/sections/Hero.tsx` uses a **different** nav variant:
- Fixed header with `bg-black/40 backdrop-blur-xl border-white/10`
- White-on-black copy, gradient pill for active nav item
- Full-screen video background

Do not mix Synapse Hero nav styles into standard Stack pages (Navbar component).

## Dynamic Data Pages

Server pages fetching DB content should use:
```tsx
export const dynamic = "force-dynamic";
```

So lists reflect admin changes without rebuild.

## File Placement

| Type | Location |
|------|----------|
| Shared UI primitives | `src/components/ui/` |
| Marketing sections | `src/components/sections/` |
| Product sections | `src/components/product/` |
| Page routes | `src/app/` |
| Admin routes | `src/app/admin/(protected)/` |
