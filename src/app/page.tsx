import Navbar from "@/components/Navbar";
import StartupShowcase from "@/components/StartupShowcase";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="page-content home-page flex-1 flex flex-col w-full">
        <StartupShowcase />
      </main>
      <Footer />
    </div>
  );
}
