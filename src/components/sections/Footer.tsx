import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
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
      <div className="container-x py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <span
                className="inline-block h-5 w-5 rounded-sm bg-foreground"
                aria-hidden
              />
              <span className="text-[15px] font-semibold tracking-tight text-foreground">
                AlgoryCode
              </span>
            </Link>
            <p className="mt-4 max-w-[240px] text-[13px] leading-relaxed text-muted-foreground">
              E-ticaretten yapay zekaya, beş uzmanlıkta dijital ürünler
              tasarlıyor ve geliştiriyoruz.
            </p>
          </div>
          {COLUMNS.map((c) => (
            <div key={c.title}>
              <p className="mb-4 text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
                {c.title}
              </p>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
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

      <div className="container-x flex h-16 flex-col items-center justify-between gap-4 py-4 sm:flex-row">
        <p className="text-[12px] text-muted-foreground">
          © 2025 AlgoryCode. Tüm hakları saklıdır.
        </p>
        <ul className="flex items-center gap-1">
          {[
            { icon: Github, label: "GitHub" },
            { icon: Twitter, label: "Twitter" },
            { icon: Linkedin, label: "LinkedIn" },
          ].map(({ icon: Icon, label }) => (
            <li key={label}>
              <Link
                href="/"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Icon size={15} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
