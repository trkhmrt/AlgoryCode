import { notFound } from "next/navigation";
import { SiteHeader, SITE_HEADER_OFFSET_CLASS } from "@/components/sections/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { ProductHero } from "@/components/product/ProductHero";
import { PurposeSection } from "@/components/product/PurposeSection";
import { AdvantagesBento } from "@/components/product/AdvantagesBento";
import { DualStickyScroll } from "@/components/product/DualStickyScroll";
import { SocialProof } from "@/components/product/SocialProof";
import { CtaDemo } from "@/components/product/CtaDemo";
import {
  PRODUCTS,
  getAllProductSlugs,
  getProductBySlug,
} from "@/data/products";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Ürün bulunamadı" };
  return {
    title: `${product.name} — Stack`,
    description: product.purpose,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  void PRODUCTS;

  return (
    <>
      <SiteHeader />
      <main className={SITE_HEADER_OFFSET_CLASS}>
        <ProductHero product={product} />
        <PurposeSection product={product} />
        <AdvantagesBento product={product} />
        <DualStickyScroll product={product} />
        <SocialProof product={product} />
        <CtaDemo />
      </main>
      <Footer />
    </>
  );
}
