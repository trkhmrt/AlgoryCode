import Link from "next/link";

const LINKS = [
  { href: "/contact", label: "Hizmetler" },
  { href: "/education", label: "Eğitimler" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "İletişim" },
  { href: "/gizlilik-politikasi", label: "Gizlilik" },
  { href: "/kvkk", label: "KVKK" },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="brand-logo-pixel text-[14px] [text-shadow:none]">
            algorycode
          </span>
          <p className="mt-1 text-sm text-muted-foreground">
            Yazılım geliştirme, eğitim ve dijital çözümler.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {LINKS.map((l) => (
            <Link key={l.label} href={l.href} className="hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-border/70 px-5 py-4">
        <p className="mx-auto max-w-6xl text-xs text-muted-foreground">
          © {new Date().getFullYear()} AlgoryCode. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
