import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import type { categoryFormSchema } from "@/lib/validations";
import type { z } from "zod";

export async function listCategories(activeOnly = false) {
  return prisma.category.findMany({
    where: activeOnly ? { active: true } : undefined,
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({ where: { slug } });
}

export async function upsertCategory(
  input: z.infer<typeof categoryFormSchema>,
  id?: string,
) {
  const slug = slugify(input.name);
  const data = {
    name: input.name,
    slug,
    description: input.description,
    imageUrl: input.imageUrl || null,
    active: input.active ?? true,
  };

  if (id) {
    return prisma.category.update({ where: { id }, data });
  }
  return prisma.category.create({ data });
}

export async function toggleCategory(id: string, active: boolean) {
  return prisma.category.update({ where: { id }, data: { active } });
}

export async function deleteCategory(id: string) {
  const count = await prisma.product.count({ where: { categoryId: id } });
  if (count > 0) {
    throw new Error("Há peças nesta categoria. Mova ou arquive as peças antes de excluir.");
  }
  return prisma.category.delete({ where: { id } });
}
