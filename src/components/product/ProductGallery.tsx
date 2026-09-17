"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ImageItem = { url: string; alt: string };

export function ProductGallery({
  images,
  name,
  sold,
}: {
  images: ImageItem[];
  name: string;
  sold?: boolean;
}) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  if (!current) {
    return <div className="aspect-[3/4] bg-cream" />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-[80px_1fr]">
      <div className="order-2 flex gap-2 overflow-x-auto md:order-1 md:flex-col">
        {images.map((image, index) => (
          <button
            key={image.url + index}
            type="button"
            onClick={() => setActive(index)}
            className={cn(
              "relative h-20 w-16 shrink-0 overflow-hidden border",
              index === active ? "border-burgundy" : "border-transparent",
            )}
            aria-label={`Ver imagem ${index + 1} de ${name}`}
          >
            <Image src={image.url} alt={image.alt} fill className="object-cover" />
          </button>
        ))}
      </div>
      <div className="relative order-1 aspect-[3/4] overflow-hidden bg-cream md:order-2">
        <Image
          src={current.url}
          alt={current.alt || name}
          fill
          priority
          className={cn("object-cover", sold && "grayscale")}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {sold ? (
          <span className="absolute left-4 top-4 bg-ink px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
            Vendida
          </span>
        ) : null}
      </div>
    </div>
  );
}
