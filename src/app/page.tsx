import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Marquee from "@/components/Marquee";
import WorkStyle from "@/components/WorkStyle";
import NedenBiz from "@/components/NedenBiz";
import SikcaSorulanSorular from "@/components/SikcaSorulanSorular";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />
      <main className="page-content flex-1 flex flex-col w-full">
        <Hero />
        <div className="content-divider" aria-hidden />
        <Services />
        <div className="content-divider" aria-hidden />
        <WorkStyle />
        <div className="content-divider" aria-hidden />
        <NedenBiz />
        <div className="content-divider" aria-hidden />
        <Marquee />
        <div className="content-divider" aria-hidden />
        <SikcaSorulanSorular />
      </main>
      <Footer />
    </div>
  );
}
