"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CONDITION_LABELS } from "@/lib/constants";
import { BrandSelect } from "@/components/ui/BrandSelect";

type Facets = {
  brands: string[];
  sizes: string[];
  categories: { name: string; slug: string }[];
};

export function CatalogToolbar({
  facets,
  current,
}: {
  facets: Facets;
  current: Record<string, string | number | undefined>;
}) {
  const router = useRouter();
  const params = useSearchParams();

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (!value) next.delete(key);
    else next.set(key, value);
    router.push(`/produtos?${next.toString()}`);
  }

  return (
    <form
      className="mt-10 grid gap-3 border-y border-gold/50 py-6 md:grid-cols-4 lg:grid-cols-7"
      onSubmit={(event) => event.preventDefault()}
    >
      <label className="text-xs text-taupe">
        Busca
        <input
          defaultValue={typeof current.q === "string" ? current.q : ""}
          name="q"
          className="mt-2 h-11 w-full border border-forest/25 bg-ivory px-3 text-sm text-ink outline-none transition placeholder:text-[#777] hover:border-gold hover:bg-sand focus:border-gold"
          onBlur={(event) => update("q", event.target.value)}
        />
      </label>
      <Field label="Categoria">
        <BrandSelect
          label="Categoria"
          value={String(current.category ?? "")}
          onChange={(value) => update("category", value)}
          triggerClassName="mt-2 h-11 py-0"
          options={[
            { value: "", label: "Todas" },
            ...facets.categories.map((category) => ({ value: category.slug, label: category.name })),
          ]}
        />
      </Field>
      <Field label="Tamanho">
        <BrandSelect
          label="Tamanho"
          value={String(current.size ?? "")}
          onChange={(value) => update("size", value)}
          triggerClassName="mt-2 h-11 py-0"
          options={[
            { value: "", label: "Todos" },
            ...facets.sizes.map((size) => ({ value: size, label: size })),
          ]}
        />
      </Field>
      <Field label="Marca">
        <BrandSelect
          label="Marca"
          value={String(current.brand ?? "")}
          onChange={(value) => update("brand", value)}
          triggerClassName="mt-2 h-11 py-0"
          options={[
            { value: "", label: "Todas" },
            ...facets.brands.map((brand) => ({ value: brand, label: brand })),
          ]}
        />
      </Field>
      <Field label="Condição">
        <BrandSelect
          label="Condição"
          value={String(current.condition ?? "")}
          onChange={(value) => update("condition", value)}
          triggerClassName="mt-2 h-11 py-0"
          options={[
            { value: "", label: "Todas" },
            ...Object.entries(CONDITION_LABELS).map(([value, label]) => ({ value, label })),
          ]}
        />
      </Field>
      <Field label="Disponibilidade">
        <BrandSelect
          label="Disponibilidade"
          value={String(current.availability ?? "available")}
          onChange={(value) => update("availability", value)}
          triggerClassName="mt-2 h-11 py-0"
          options={[
            { value: "available", label: "Disponíveis" },
            { value: "sold", label: "Vendidas" },
            { value: "all", label: "Todas" },
          ]}
        />
      </Field>
      <Field label="Ordenar">
        <BrandSelect
          label="Ordenar"
          value={String(current.sort ?? "recent")}
          onChange={(value) => update("sort", value)}
          triggerClassName="mt-2 h-11 py-0"
          options={[
            { value: "recent", label: "Mais recentes" },
            { value: "price-asc", label: "Menor preço" },
            { value: "price-desc", label: "Maior preço" },
            { value: "name", label: "Nome" },
          ]}
        />
      </Field>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="text-xs text-taupe">
      {label}
      {children}
    </div>
  );
}
