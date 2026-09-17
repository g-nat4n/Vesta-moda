import { StoreShell } from "@/components/layout/StoreShell";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { createMetadata } from "@/lib/seo";
import { auth } from "@/auth";

export const metadata = createMetadata({
  title: "Checkout",
  path: "/checkout",
  noIndex: true,
});

export default async function CheckoutPage() {
  const session = await auth();

  return (
    <StoreShell>
      <section className="container-main py-16">
        <p className="eyebrow">Finalização</p>
        <h1 className="display mt-2 text-4xl">Checkout</h1>
        <CheckoutForm
          defaultEmail={session?.user.email ?? ""}
          defaultName={session?.user.name ?? ""}
        />
      </section>
    </StoreShell>
  );
}
