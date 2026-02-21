import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import NedenBiz from "@/components/NedenBiz";
import SikcaSorulanSorular from "@/components/SikcaSorulanSorular";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />
      <Hero />
      <Services />
      <NedenBiz />
      <SikcaSorulanSorular />
      <Footer />
    </div>
  );
}
