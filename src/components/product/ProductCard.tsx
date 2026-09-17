import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatBRL } from "@/lib/format";
import type { Prisma } from "@prisma/client";

export type ProductCardProduct = Prisma.ProductGetPayload<{
  include: { images: true; category: true };
}>;

export function ProductCard({ product }: { product: ProductCardProduct }) {
  const image = product.images[0];
  const sold = product.status !== "AVAILABLE" || product.stock <= 0;

  return (
    <article className="group h-full overflow-hidden border border-line bg-white p-3 shadow-[0_10px_28px_rgba(23,22,17,0.06)] transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_16px_36px_rgba(64,8,2,0.1)]">
      <Link href={`/produto/${product.slug}`} className="block h-full">
        <div className="relative aspect-[3/4] overflow-hidden bg-cream">
          {image ? (
            <Image
              src={image.url}
              alt={image.alt || product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />
          ) : null}
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {product.uniquePiece ? <Badge>Peça única</Badge> : null}
            {product.stock === 1 && !sold ? <Badge tone="wine">Última peça</Badge> : null}
            {sold ? <Badge tone="ink">Vendida</Badge> : null}
          </div>
        </div>
        <div className="px-1 pt-4 pb-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-wine">
            {product.brand} · Tam. {product.size}
          </p>
          <h3 className="mt-1 font-serif text-xl text-ink">{product.name}</h3>
          <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
            <span className="font-bold text-gold">{formatBRL(product.priceCents)}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
