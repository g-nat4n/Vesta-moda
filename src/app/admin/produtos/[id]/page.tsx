import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProductForm } from "@/components/admin/ProductForm";
import { getProductById } from "@/services/product.service";
import { listCategories } from "@/services/category.service";
import { prisma } from "@/lib/prisma";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { addImageByUrlAction, deleteProductImageAction } from "@/app/admin/actions";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

type Params = Promise<{ id: string }>;

export default async function EditProductPage({ params }: { params: Params }) {
  const { id } = await params;
  const [product, categories, looks] = await Promise.all([
    getProductById(id),
    listCategories(),
    prisma.look.findMany(),
  ]);
  if (!product) notFound();

  return (
    <AdminShell>
      <p className="eyebrow">Acervo</p>
      <h1 className="display mt-2 text-4xl">Editar peça</h1>
      <ProductForm product={product} categories={categories} looks={looks} />
      <section className="mt-12 max-w-3xl">
        <h2 className="display text-2xl">Imagens</h2>
        <p className="mt-2 text-sm text-taupe">A primeira foto é a principal na loja. Pode adicionar quantas quiser.</p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {product.images.map((image, index) => (
            <div key={image.id} className="relative aspect-[3/4] bg-cream">
              <Image src={image.url} alt={image.alt} fill className="object-cover" />
              <span className="absolute left-2 top-2 bg-ivory/90 px-2 py-1 text-[10px] uppercase tracking-[0.12em]">
                {index === 0 ? "Principal" : `${index + 1}`}
              </span>
              <form action={deleteProductImageAction} className="absolute bottom-2 right-2">
                <input type="hidden" name="imageId" value={image.id} />
                <input type="hidden" name="productId" value={product.id} />
                <button type="submit" className="bg-wine px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-white">
                  Remover
                </button>
              </form>
            </div>
          ))}
        </div>
        <ImageUpload productId={product.id} />
        <form action={addImageByUrlAction} className="mt-6 space-y-3">
          <input type="hidden" name="productId" value={product.id} />
          <Input label="Ou cole uma URL de imagem" name="url" />
          <Button type="submit" variant="ghost">
            Adicionar URL
          </Button>
        </form>
      </section>
    </AdminShell>
  );
}
