import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Marquee from "@/components/Marquee";
import ServicesList from "@/components/ServicesList";
import Scrollable from "@/components/Scrollable";
import NedenBiz from "@/components/NedenBiz";
import SikcaSorulanSorular from "@/components/SikcaSorulanSorular";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />
      <Hero />
      <Services />
      <ServicesList />
      <Scrollable />
      <NedenBiz />
      <Marquee />
      <SikcaSorulanSorular />
      <Footer />
    </div>
  );
}
