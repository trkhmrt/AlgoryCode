import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

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
      { href: "/", label: "Blog" },
      { href: "/", label: "Kariyer" },
      { href: "/", label: "İletişim" },
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
    <footer className="border-t border-[#1a1a1a] mt-0">
      <div className="container-x py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="inline-block w-5 h-5 bg-white" aria-hidden />
              <span className="text-[15px] font-semibold tracking-tight">
                Stack
              </span>
            </Link>
            <p className="mt-4 text-[13px] text-[#444] max-w-[240px] leading-relaxed">
              E-ticaretten yapay zekaya, beş uzmanlıkta dijital ürünler
              tasarlıyor ve geliştiriyoruz.
            </p>
          </div>
          {COLUMNS.map((c) => (
            <div key={c.title}>
              <p className="text-[12px] uppercase tracking-[0.18em] text-[#888] mb-4">
                {c.title}
              </p>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[13px] text-[#444] hover:text-[#888] transition-colors"
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

      <div className="border-t border-[#1a1a1a]">
        <div className="container-x h-16 flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
          <p className="text-[12px] text-[#444]">
            © 2025 Stack. Tüm hakları saklıdır.
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
                  className="h-9 w-9 inline-flex items-center justify-center text-[#444] hover:text-[#888] transition-colors"
                >
                  <Icon size={15} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
