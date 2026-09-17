import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { listOrders } from "@/services/order.service";
import { ORDER_STATUS_LABELS } from "@/lib/constants";
import { formatBRL } from "@/lib/format";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Pedidos", noIndex: true });

export default async function AdminOrdersPage() {
  const orders = await listOrders();

  return (
    <AdminShell>
      <p className="eyebrow">Vendas</p>
      <h1 className="display mt-2 text-4xl">Pedidos</h1>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-[11px] uppercase tracking-[0.16em] text-taupe">
            <tr>
              <th className="py-3">Número</th>
              <th>Cliente</th>
              <th>Status</th>
              <th>Pagamento</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-line">
                <td className="py-3">
                  <Link href={`/admin/pedidos/${order.id}`} className="text-burgundy">
                    {order.number}
                  </Link>
                </td>
                <td>{order.customerName}</td>
                <td>{ORDER_STATUS_LABELS[order.status]}</td>
                <td>{order.payment?.status}</td>
                <td>{formatBRL(order.totalCents)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
