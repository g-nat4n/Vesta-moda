"use client";

import { useEffect, useRef, useState } from "react";
import { ProductCard, type ProductCardProduct } from "@/components/product/ProductCard";
import { BrandLoader } from "@/components/ui/BrandLoader";

const ROWS = 5;

function pageSizeForWidth(width: number) {
  if (width >= 1024) return 4 * ROWS;
  if (width >= 768) return 3 * ROWS;
  return 2 * ROWS;
}

export function CatalogGrid({ products }: { products: ProductCardProduct[] }) {
  const [pageSize, setPageSize] = useState(20);
  const [visible, setVisible] = useState(20);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const signature = products.map((product) => product.id).join(",");

  useEffect(() => {
    function update() {
      setPageSize(pageSizeForWidth(window.innerWidth));
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    setVisible(pageSize);
    setLoading(false);
  }, [signature, pageSize]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || loading || visible >= products.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setLoading(true);
      },
      { rootMargin: "280px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [loading, products.length, visible]);

  useEffect(() => {
    if (!loading) return;
    const timer = window.setTimeout(() => {
      setVisible((current) => Math.min(current + pageSize, products.length));
      setLoading(false);
    }, 520);
    return () => window.clearTimeout(timer);
  }, [loading, pageSize, products.length]);

  const shown = products.slice(0, visible);

  return (
    <div className="mt-10">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-7">
        {shown.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {visible < products.length ? (
        <div ref={sentinelRef}>{loading ? <BrandLoader /> : <div className="h-16" aria-hidden />}</div>
      ) : null}
    </div>
  );
}
