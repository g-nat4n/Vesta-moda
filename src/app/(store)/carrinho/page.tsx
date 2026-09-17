import { StoreShell } from "@/components/layout/StoreShell";
import { CartView } from "@/components/cart/CartView";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Sacola",
  path: "/carrinho",
  noIndex: true,
});

export default function CartPage() {
  return (
    <StoreShell>
      <CartView />
    </StoreShell>
  );
}
