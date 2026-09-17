import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { getOrderById } from "@/services/order.service";
import { updateOrderStatusAction } from "@/app/admin/actions";
import { ORDER_STATUS_LABELS, PAYMENT_STATUS_LABELS } from "@/lib/constants";
import { formatBRL } from "@/lib/format";
import { OrderStatus } from "@prisma/client";

type Params = Promise<{ id: string }>;

export default async function AdminOrderDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) notFound();

  return (
    <AdminShell>
      <p className="eyebrow">Pedido</p>
      <h1 className="display mt-2 text-4xl">{order.number}</h1>
      <p className="mt-3 text-sm text-taupe">
        {ORDER_STATUS_LABELS[order.status]} · Pagamento{" "}
        {order.payment ? PAYMENT_STATUS_LABELS[order.payment.status] : "—"}
      </p>
      <form action={updateOrderStatusAction} className="mt-6 flex gap-3">
        <input type="hidden" name="id" value={order.id} />
        <select name="status" defaultValue={order.status} className="h-12 border border-line px-3">
          {Object.values(OrderStatus).map((status) => (
            <option key={status} value={status}>
              {ORDER_STATUS_LABELS[status]}
            </option>
          ))}
        </select>
        <button type="submit" className="text-[11px] uppercase tracking-[0.16em] text-burgundy">
          Atualizar
        </button>
      </form>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="display text-2xl">Cliente</h2>
          <p className="mt-3 text-sm leading-relaxed">
            {order.customerName}
            <br />
            {order.email}
            <br />
            {order.phone}
            <br />
            CPF {order.cpf}
          </p>
        </div>
        <div>
          <h2 className="display text-2xl">Endereço</h2>
          <p className="mt-3 text-sm leading-relaxed">
            {order.street}, {order.numberAddress} {order.complement}
            <br />
            {order.district} · {order.city}/{order.state}
            <br />
            {order.zip}
            <br />
            {order.shippingLabel}
          </p>
        </div>
      </div>
      <ul className="mt-8 divide-y divide-line text-sm">
        {order.items.map((item) => (
          <li key={item.id} className="flex justify-between py-3">
            <span>
              {item.name} · {item.size}
            </span>
            <span>{formatBRL(item.priceCents)}</span>
          </li>
        ))}
      </ul>
    </AdminShell>
  );
}
