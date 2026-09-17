import type { Prisma } from "@prisma/client";

export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    images: true;
    category: true;
    look: { include: { products: { include: { images: true } } } };
  };
}>;

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  brand: string;
  size: string;
  priceCents: number;
  imageUrl: string | null;
  uniquePiece: boolean;
  stock: number;
  quantity: number;
};

export type ShippingQuote = {
  id: string;
  carrier: string;
  service: string;
  label: string;
  priceCents: number;
  days: number;
  source: "pickup" | "correios";
};
