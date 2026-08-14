import Link from "next/link";
import { ArrowUpRight, Cpu, GraduationCap, Layers, Monitor, ShoppingCart, Smartphone } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";

const SERVICES = [
  {
    icon: ShoppingCart,
    title: "E-Ticaret",
    text: "Ödeme, stok ve sipariş yönetimi entegre. Mağazanızı hızla satışa hazır hale getiriyoruz.",
  },
  {
    icon: Smartphone,
    title: "Mobil Uygulama",
    text: "iOS ve Android için tek kod tabanı. Native performans, modern kullanıcı deneyimi.",
  },
  {
    icon: Cpu,
    title: "Yapay Zekâ",
    text: "LLM destekli chatbot, öneri motoru ve otomasyon sistemlerini ürününüze ekleyin.",
  },
  {
    icon: Monitor,
    title: "Kurumsal Web",
    text: "Markanıza özel siteler, yönetim panelleri ve müşteri portalları — ölçeklenebilir, güvenli, SEO uyumlu.",
  },
  {
    icon: GraduationCap,
    title: "Eğitim",
    text: "Gerçek projeler üzerinde ilerleyen, kuruma özel canlı programlar. Bilgi ekibinizde kalır.",
  },
  {
    icon: Layers,
    title: "Bireysel Web",
    text: "Kişisel portfolyo, blog ve tanıtım siteleri — modern tasarım, mobil uyum, hızlı yayın.",
  },
];

export function Features() {
  return (
    <Section title="Ne yapıyoruz" description="Keşiften bakıma kadar tek ekip.">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <Reveal key={s.title} as="article">
            <Link
              href="/contact"
              className="surface-card group flex h-full items-start justify-between gap-6 p-7 block"
            >
              <div>
                <s.icon className="size-6" />
                <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.text}</p>
              </div>
              <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
