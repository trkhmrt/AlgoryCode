# Footer

Source: `src/components/sections/Footer.tsx`

## Structure

```tsx
<footer className="border-t border-[#1a1a1a] mt-0">
  <div className="container-x py-20">
    {/* 5-column grid: brand + 4 link columns */}
  </div>
  <div className="border-t border-[#1a1a1a]">
    <div className="container-x h-16 flex ...">
      {/* copyright + social icons */}
    </div>
  </div>
</footer>
```

## Grid

```
grid grid-cols-2 md:grid-cols-5 gap-10
```

Brand column spans 2 on mobile, 1 on desktop: `col-span-2 md:col-span-1`

## Brand Block

Same logo mark as navbar + tagline:
```tsx
<p className="mt-4 text-[13px] text-[#444] max-w-[240px] leading-relaxed">
  ...
</p>
```

## Column Headers

```
text-[12px] uppercase tracking-[0.18em] text-[#888] mb-4
```

## Footer Links

```
text-[13px] text-[#444] hover:text-[#888] transition-colors
```

Links are dimmer than nav links — footer is tertiary navigation.

## Bottom Bar

Copyright:
```
text-[12px] text-[#444]
```

Social icons:
```
h-9 w-9 inline-flex items-center justify-center
text-[#444] hover:text-[#888] transition-colors
```
Icon size: 15px (lucide-react)

## Page Composition

Marketing/content pages wrap with:
```tsx
<>
  <Navbar />
  <main>...</main>
  <Footer />
</>
```

Home page (`page.tsx`) puts Footer outside `<main>`.
