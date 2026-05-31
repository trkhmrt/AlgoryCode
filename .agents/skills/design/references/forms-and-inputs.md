# Forms & Inputs

Admin and auth forms follow a consistent dark input pattern. Reuse these classes — do not create new input styles.

## Standard Input (admin)

From `EducationForm.tsx` / `LoginForm.tsx`:

```tsx
const inputClassName =
  "h-11 w-full rounded-md border border-[#1a1a1a] bg-black px-3 text-sm text-[#ededed] outline-none transition-colors placeholder:text-[#444] focus:border-[#333]";

const textareaClassName =
  "min-h-[120px] w-full rounded-md border border-[#1a1a1a] bg-black px-3 py-3 text-sm text-[#ededed] outline-none transition-colors placeholder:text-[#444] focus:border-[#333]";
```

Select elements use the same `inputClassName`.

## Field Wrapper

```tsx
<div className="space-y-2">
  <label htmlFor="email" className="block text-[13px] font-medium text-[#ededed]">
    E-posta
  </label>
  <input id="email" name="email" className={inputClassName} />
  {error ? <p className="text-xs text-red-300">{error}</p> : null}
</div>
```

## Form Grid

Two-column fields on desktop:
```tsx
<div className="grid gap-5 md:grid-cols-2">...</div>
```

Form sections stacked:
```tsx
<form className="space-y-8">...</form>
```

## Checkbox

```tsx
<label className="inline-flex items-center gap-2 text-sm text-[#ededed]">
  <input
    type="checkbox"
    className="h-4 w-4 rounded border-[#333] bg-black"
  />
  Ücretsiz eğitim
</label>
```

## Marketing Input (`.input-dark`)

Alternative style in `globals.css` for lighter glass contexts:

```css
.input-dark {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: #fff;
  border-radius: 6px;
  padding: 12px 14px;
  font-size: 14px;
}
.input-dark:focus {
  border-color: #5ed29c;
  box-shadow: 0 0 0 1px rgba(94, 210, 156, 0.25);
}
```

Use `.input-dark` on Hero/marketing sections; use admin input classes on admin/auth pages.

## Alert Messages

```tsx
// Error
<p className="rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300">
  {message}
</p>

// Warning
<p className="rounded-md border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
  {message}
</p>

// Success
<p className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
  {message}
</p>
```

## Login Card Pattern

Centered auth form:
```tsx
<main className="flex min-h-screen items-center justify-center px-6 py-12">
  <Card className="w-full max-w-md p-8">...</Card>
</main>
```

## Submit Loading State

```tsx
<Button type="submit" disabled={pending} aria-busy={pending}>
  {pending ? "Giriş yapılıyor..." : "Giriş Yap"}
</Button>
```
