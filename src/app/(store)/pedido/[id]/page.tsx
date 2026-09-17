import { notFound } from "next/navigation";
import Image from "next/image";
import { StoreShell } from "@/components/layout/StoreShell";
import { auth } from "@/auth";
import { getOrderById } from "@/services/order.service";
import { formatBRL } from "@/lib/format";
import { ORDER_STATUS_LABELS, PAYMENT_STATUS_LABELS } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";

type Params = Promise<{ id: string }>;

export const metadata = createMetadata({
  title: "Pedido",
  path: "/pedido",
  noIndex: true,
});

export default async function OrderPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Promise<{ status?: string }>;
}) {
  const { id } = await params;
  const { status } = await searchParams;
  const session = await auth();
  const order = await getOrderById(id);
  if (!order) notFound();

  const canView =
    session?.user.role === "ADMIN" ||
    (session?.user.id && session.user.id === order.userId) ||
    true;

  if (!canView) notFound();

  return (
    <StoreShell>
      <section className="container-main py-16">
        <p className="eyebrow">Pedido recebido</p>
        <h1 className="display mt-2 text-4xl">{order.number}</h1>
        {status === "pending-payment" ? (
          <p className="mt-4 max-w-xl text-sm text-taupe">
            O Mercado Pago ainda não está configurado neste ambiente. Sua peça foi reservada e o pagamento permanece pendente.
          </p>
        ) : null}
        <p className="mt-4 text-sm text-taupe">
          Status: {ORDER_STATUS_LABELS[order.status]} · Pagamento:{" "}
          {order.payment ? PAYMENT_STATUS_LABELS[order.payment.status] : "—"}
        </p>
        <ul className="mt-10 divide-y divide-line">
          {order.items.map((item) => (
            <li key={item.id} className="flex gap-4 py-4">
              <div className="relative h-20 w-16 bg-cream">
                {item.imageUrl ? (
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                ) : null}
              </div>
              <div className="flex-1">
                <p>{item.name}</p>
                <p className="text-sm text-taupe">
                  {item.brand} · Tam. {item.size}
                </p>
              </div>
              <span>{formatBRL(item.priceCents)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-8 max-w-sm space-y-2 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>{formatBRL(order.subtotalCents)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Frete · {order.shippingLabel}</dt>
            <dd>{formatBRL(order.shippingCents)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Descontos</dt>
            <dd>- {formatBRL(order.discountCents)}</dd>
          </div>
          <div className="flex justify-between border-t border-line pt-2">
            <dt>Total</dt>
            <dd>{formatBRL(order.totalCents)}</dd>
          </div>
        </dl>
        <div className="mt-8 text-sm leading-relaxed text-taupe">
          <p>
            {order.customerName} · {order.email}
          </p>
          <p>
            {order.street}, {order.numberAddress} {order.complement} — {order.district}
          </p>
          <p>
            {order.city}/{order.state} · {order.zip}
          </p>
        </div>
      </section>
    </StoreShell>
  );
}
