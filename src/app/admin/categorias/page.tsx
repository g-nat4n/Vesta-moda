import { AdminShell } from "@/components/admin/AdminShell";
import { listCategories } from "@/services/category.service";
import { saveCategoryAction, toggleCategoryAction, deleteCategoryAction } from "@/app/admin/actions";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default async function AdminCategoriesPage() {
  const categories = await listCategories();

  return (
    <AdminShell>
      <p className="eyebrow">Taxonomia</p>
      <h1 className="display mt-2 text-4xl">Categorias</h1>
      <form action={saveCategoryAction} className="mt-8 grid max-w-xl gap-3">
        <Input label="Nome" name="name" required />
        <Textarea label="Descrição" name="description" />
        <Input label="Imagem URL" name="imageUrl" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="active" defaultChecked />
          Ativa
        </label>
        <Button type="submit">Criar categoria</Button>
      </form>
      <ul className="mt-10 max-w-xl divide-y divide-line">
        {categories.map((category) => (
          <li key={category.id} className="flex items-center justify-between py-4 text-sm">
            <div>
              <p>{category.name}</p>
              <p className="text-xs text-taupe">
                {category.active ? "Ativa" : "Inativa"} · {category._count.products} peças
              </p>
            </div>
            <div className="flex gap-3 text-[10px] uppercase tracking-[0.14em]">
              <form action={toggleCategoryAction}>
                <input type="hidden" name="id" value={category.id} />
                <input type="hidden" name="active" value={category.active ? "false" : "true"} />
                <button type="submit">{category.active ? "Desativar" : "Ativar"}</button>
              </form>
              <form action={deleteCategoryAction}>
                <input type="hidden" name="id" value={category.id} />
                <button type="submit" className="text-wine">
                  Excluir
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </AdminShell>
  );
}
