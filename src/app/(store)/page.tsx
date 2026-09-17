import { StoreShell } from "@/components/layout/StoreShell";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { CategoryChips, ContactBand, EditorialLook, JournalTeaser } from "@/components/home/Sections";
import { FeaturedCuradoria } from "@/components/home/FeaturedCuradoria";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { getProductsBySlugs } from "@/services/product.service";
import { FEATURED_PIECES } from "@/lib/brand";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Vesta Moda Pre-Owned",
  description:
    "Curadoria de peças especiais para todos os estilos, histórias e formas de se expressar.",
  path: "/",
});

export default async function HomePage() {
  const products = await getProductsBySlugs(FEATURED_PIECES.map((piece) => piece.slug));
  const cards = FEATURED_PIECES.map((piece) => {
    const product = products.find((item) => item.slug === piece.slug);
    return {
      meta: piece.meta,
      category: piece.category,
      style: piece.style,
      sold: product ? product.status !== "AVAILABLE" || product.stock <= 0 : false,
      alt: piece.alt,
      item: {
        productId: product?.id ?? piece.slug,
        slug: piece.slug,
        name: piece.name,
        brand: piece.brand,
        size: piece.size,
        priceCents: piece.priceCents,
        imageUrl: piece.image,
        uniquePiece: true,
        stock: product?.stock ?? 1,
        quantity: 1,
      },
    };
  });

  return (
    <StoreShell>
      <Hero />
      <Manifesto />
      <FeaturedCuradoria products={cards} />
      <CategoryChips />
      <EditorialLook />
      <TestimonialsCarousel />
      <JournalTeaser />
      <ContactBand />
    </StoreShell>
  );
}
