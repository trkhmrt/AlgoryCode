import Link from "next/link";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Reveal } from "@/components/site/Reveal";

export function Hero() {
  return (
    <>
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-5 pt-10 pb-6 sm:pt-16">
        <Reveal className="flex flex-col items-center justify-center py-6 text-center lg:py-16">
          <h1 className="text-6xl leading-[0.92] font-extrabold sm:text-7xl">
            Yazılım
            <br />
            geliştirme
          </h1>
          <p className="mx-auto mt-8 max-w-md text-lg text-muted-foreground">
            Web ve mobil uygulama fikirlerinizi hayata geçirelim.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Projenizi konuşalım
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
