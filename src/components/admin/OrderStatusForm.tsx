"use client";

import { useRouter } from "next/navigation";
import { OrderStatus } from "@prisma/client";
import { BrandSelect } from "@/components/ui/BrandSelect";
import { ORDER_STATUS_LABELS } from "@/lib/constants";
import { updateOrderStatusAction } from "@/app/admin/actions";

export function OrderStatusForm({ id, status }: { id: string; status: OrderStatus }) {
  const router = useRouter();

  async function onChange(value: string) {
    const data = new FormData();
    data.set("id", id);
    data.set("status", value);
    await updateOrderStatusAction(data);
    router.refresh();
  }

  return (
    <div className="mt-6 max-w-sm">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">Situação do pedido</p>
      <BrandSelect
        label="Situação do pedido"
        value={status}
        onChange={onChange}
        options={Object.values(OrderStatus).map((item) => ({
          value: item,
          label: ORDER_STATUS_LABELS[item],
        }))}
      />
    </div>
  );
}
