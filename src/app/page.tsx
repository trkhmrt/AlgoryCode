import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeroTagline from "@/components/HeroTagline";
import Services from "@/components/Services";
import HomeProducts from "@/components/HomeProducts";
import HomeBenefitsStatsCta from "@/components/HomeBenefitsStatsCta";
import Marquee from "@/components/Marquee";
import HomeContactCta from "@/components/HomeContactCta";
import SikcaSorulanSorular from "@/components/SikcaSorulanSorular";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />
      <main className="page-content home-page flex-1 flex flex-col w-full">
        <Hero />
        <HeroTagline />
        {/* Services: Hizmetlerimiz; #services, zemin = hero İletişim hover (#05ffde) */}
        <Services />
        <HomeProducts />
        <HomeBenefitsStatsCta />
        <Marquee />
        <SikcaSorulanSorular />
        <HomeContactCta />
      </main>
      <Footer />
    </div>
  );
}
