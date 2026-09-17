import { AdminShell } from "@/components/admin/AdminShell";
import { ProductForm } from "@/components/admin/ProductForm";
import { listCategories } from "@/services/category.service";
import { prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Nova peça", noIndex: true });

export default async function NewProductPage() {
  const [categories, looks] = await Promise.all([
    listCategories(),
    prisma.look.findMany(),
  ]);

  return (
    <AdminShell>
      <p className="eyebrow">Acervo</p>
      <h1 className="display mt-2 text-4xl">Nova peça</h1>
      <ProductForm categories={categories} looks={looks} />
    </AdminShell>
  );
}
