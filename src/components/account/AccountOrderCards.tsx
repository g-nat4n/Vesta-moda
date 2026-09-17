import Image from "next/image";
import Link from "next/link";
import { InsightAction, InsightCard, InsightRow } from "@/components/account/InsightCard";
import { formatBRL } from "@/lib/format";
import { ORDER_STATUS_LABELS } from "@/lib/constants";

type OrderItem = {
  id: string;
  name: string;
  brand: string;
  size: string;
  priceCents: number;
  quantity: number;
  imageUrl: string | null;
  slug: string;
};

type Order = {
  id: string;
  number: string;
  status: keyof typeof ORDER_STATUS_LABELS;
  createdAt: Date;
  totalCents: number;
  items: OrderItem[];
};

function formatOrderDate(value: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(value);
}

export function AccountOrderCards({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return <p className="mt-4 text-sm text-taupe">Você ainda não fez um pedido.</p>;
  }

  return (
    <InsightRow>
      {orders.flatMap((order) =>
        order.items.map((item) => (
          <InsightCard key={item.id} title="Comprado">
            <Link href={`/pedido/${order.id}`} className="mt-3 block">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-cream">
                {item.imageUrl ? (
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="180px" />
                ) : null}
              </div>
              <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-snug">{item.name}</p>
              <p className="mt-1 text-xs text-taupe">
                {item.brand} · Tam. {item.size}
              </p>
              <p className="mt-2 text-lg font-semibold text-ink">
                {formatBRL(item.priceCents * item.quantity)}
              </p>
              <p className="mt-1 text-xs text-taupe">
                {ORDER_STATUS_LABELS[order.status]} · {formatOrderDate(order.createdAt)}
              </p>
            </Link>
            <div className="mt-auto pt-4">
              <InsightAction href={`/pedido/${order.id}`}>Ver pedido</InsightAction>
            </div>
          </InsightCard>
        )),
      )}
    </InsightRow>
  );
}
