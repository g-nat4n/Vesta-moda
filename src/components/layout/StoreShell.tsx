import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function StoreShell({ children }: { children: React.ReactNode }) {
  return (
    <div id="topo" className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer className="mt-auto" />
      <CartDrawer />
    </div>
  );
}
