import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { NodeTopology } from "@/components/sections/NodeTopology";
import { Stats } from "@/components/sections/Stats";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Features />
        <NodeTopology />
        <BentoGrid />
      </main>
      <Footer />
    </>
  );
}
