import { StoreShell } from "@/components/layout/StoreShell";
import { CatalogGrid } from "@/components/product/CatalogGrid";
import { CatalogToolbar } from "@/components/product/CatalogToolbar";
import { listPublicProducts, getCatalogFacets } from "@/services/product.service";
import { productFilterSchema } from "@/lib/validations";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Coleção",
  description: "Explore a curadoria Vesta: peças únicas, filtros por tamanho, marca, condição e disponibilidade.",
  path: "/produtos",
});

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const raw = await searchParams;
  const parsed = productFilterSchema.parse({
    q: typeof raw.q === "string" ? raw.q : undefined,
    category: typeof raw.category === "string" ? raw.category : undefined,
    size: typeof raw.size === "string" ? raw.size : undefined,
    brand: typeof raw.brand === "string" ? raw.brand : undefined,
    condition: typeof raw.condition === "string" ? raw.condition : undefined,
    availability: raw.availability === "sold" || raw.availability === "all" ? raw.availability : "available",
    min: raw.min,
    max: raw.max,
    sort: raw.sort,
  });

  const [products, facets] = await Promise.all([
    listPublicProducts(parsed),
    getCatalogFacets(),
  ]);

  return (
    <StoreShell>
      <section className="container-main py-16">
        <p className="eyebrow-wine">Acervo</p>
        <h1 className="display mt-2 text-5xl">A coleção</h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-taupe">
          Peças escolhidas uma a uma. A maioria existe em uma única unidade — quando sai, não volta.
        </p>
        <CatalogToolbar facets={facets} current={parsed} />
        {products.length === 0 ? (
          <p className="mt-16 text-sm text-taupe">Nenhuma peça encontrada com esses filtros.</p>
        ) : (
          <CatalogGrid products={products} />
        )}
      </section>
    </StoreShell>
  );
}
