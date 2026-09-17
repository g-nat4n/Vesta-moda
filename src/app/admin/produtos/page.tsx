import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { listAdminProducts } from "@/services/product.service";
import { PRODUCT_STATUS_LABELS } from "@/lib/constants";
import { formatBRL } from "@/lib/format";
import { archiveProductAction, markSoldAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Produtos", path: "/admin/produtos", noIndex: true });

export default async function AdminProductsPage() {
  const products = await listAdminProducts();

  return (
    <AdminShell>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Acervo</p>
          <h1 className="display mt-2 text-4xl">Produtos</h1>
        </div>
        <Button href="/admin/produtos/novo">Nova peça</Button>
      </div>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-[11px] uppercase tracking-[0.16em] text-taupe">
            <tr>
              <th className="py-3">Peça</th>
              <th>Marca</th>
              <th>Tam.</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-line">
                <td className="py-3">
                  <Link href={`/admin/produtos/${product.id}`} className="text-burgundy">
                    {product.name}
                  </Link>
                </td>
                <td>{product.brand}</td>
                <td>{product.size}</td>
                <td>{formatBRL(product.priceCents)}</td>
                <td>{product.stock}</td>
                <td>{PRODUCT_STATUS_LABELS[product.status]}</td>
                <td className="space-x-3 text-[10px] uppercase tracking-[0.14em]">
                  <form action={markSoldAction} className="inline">
                    <input type="hidden" name="id" value={product.id} />
                    <button type="submit">Vendida</button>
                  </form>
                  <form action={archiveProductAction} className="inline">
                    <input type="hidden" name="id" value={product.id} />
                    <button type="submit">Arquivar</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
