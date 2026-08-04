import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: {
    absolute: "AlgoryCode — Yazılım, Eğitim ve Dijital Çözümler",
  },
  description:
    "E-ticaretten yapay zekaya modern, ölçeklenebilir dijital çözümler. Yazılım geliştirme, eğitim programları ve ürün danışmanlığı için AlgoryCode.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Features />
        <BentoGrid />
      </main>
      <Footer />
    </>
  );
}
