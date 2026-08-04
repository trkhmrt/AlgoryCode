import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { Separator } from "@/components/ui/Separator";

const COLUMNS: Array<{
  title: string;
  links: Array<{ href: string; label: string }>;
}> = [
  {
    title: "Çözümler",
    links: [
      { href: "/#features", label: "E-Ticaret" },
      { href: "/#features", label: "Mobil App" },
      { href: "/#features", label: "AI Destekli" },
      { href: "/#features", label: "Web App" },
      { href: "/#features", label: "Eğitim" },
    ],
  },
  {
    title: "Ürünler",
    links: [
      { href: "/products/deploy-engine", label: "Deploy Engine" },
      { href: "/products/edge-network", label: "Edge Network" },
      { href: "/products/observe-stack", label: "Observe Stack" },
    ],
  },
  {
    title: "Şirket",
    links: [
      { href: "/", label: "Hakkımızda" },
      { href: "/education", label: "Eğitimler" },
      { href: "/", label: "Kariyer" },
      { href: "/contact", label: "İletişim" },
    ],
  },
  {
    title: "Yasal",
    links: [
      { href: "/", label: "Gizlilik Politikası" },
      { href: "/", label: "KVKK" },
      { href: "/", label: "Çerez Politikası" },
      { href: "/", label: "Kullanım Koşulları" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-0 border-t border-border bg-[#f3efe9]">
      <div className="container-x py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8 xl:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="brand-logo-pixel inline-block text-[18px] text-[#121212] [text-shadow:none] sm:text-[20px]"
            >
              ALGORYCODE
            </Link>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-muted-foreground lg:max-w-[220px]">
              E-ticaretten yapay zekaya, beş uzmanlıkta dijital ürünler
              tasarlıyor ve geliştiriyoruz.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.instagram.com/algorycode/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white text-[#121212] shadow-sm transition-colors hover:bg-[#121212] hover:text-white"
              >
                <Instagram size={22} strokeWidth={1.75} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61590947153152"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white text-[#121212] shadow-sm transition-colors hover:bg-[#121212] hover:text-white"
              >
                <Facebook size={22} strokeWidth={1.75} />
              </a>
            </div>
          </div>

          {COLUMNS.map((c) => (
            <div key={c.title} className="min-w-0">
              <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-muted-foreground sm:mb-4 sm:text-[12px] sm:tracking-[0.18em]">
                {c.title}
              </p>
              <ul className="space-y-2.5 sm:space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[13px] leading-snug text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-border" />

      <div className="container-x flex items-center justify-center py-5 sm:justify-start sm:py-4">
        <p className="text-center text-[12px] text-muted-foreground sm:text-left">
          © 2025 AlgoryCode. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
