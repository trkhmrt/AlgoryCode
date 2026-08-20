import Link from "next/link";
import { PaymentMethodLogos } from "@/components/legal/PaymentMethodLogos";

const NAV_LINKS = [
  { href: "/contact", label: "Hizmetler" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "İletişim" },
] as const;

const LEGAL_LINKS = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iptal-ve-iade-sartlari", label: "Teslimat ve İade Şartları" },
  { href: "/gizlilik-politikasi", label: "Gizlilik Sözleşmesi" },
  { href: "/mesafeli-satis-sozlesmesi", label: "Mesafeli Satış Sözleşmesi" },
  { href: "/kvkk", label: "KVKK" },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <span className="text-sm font-semibold tracking-tight">AlgoryCode</span>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Yazılım geliştirme ve dijital çözümler.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <a
                href="mailto:info@algorycode.com"
                className="hover:text-foreground"
              >
                info@algorycode.com
              </a>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              İstanbul, Küçükçekmece, Sefaköy, Gültepe
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Site
            </p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              {NAV_LINKS.map((link) => (
                <Link key={link.label} href={link.href} className="hover:text-foreground">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Yasal
            </p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              {LEGAL_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-foreground">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-border/70 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <PaymentMethodLogos className="items-start sm:items-center" />
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AlgoryCode. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
