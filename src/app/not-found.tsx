import Link from "next/link";
import { StoreShell } from "@/components/layout/StoreShell";

export default function NotFound() {
  return (
    <StoreShell>
      <section className="container-main py-24">
        <p className="eyebrow">404</p>
        <h1 className="display mt-3 text-5xl">Essa peça não está mais aqui.</h1>
        <p className="mt-4 max-w-md text-sm text-taupe">
          O endereço pode ter mudado, ou a peça já encontrou destino. Volte à coleção.
        </p>
        <Link href="/produtos" className="mt-8 inline-block text-[11px] uppercase tracking-[0.2em] text-burgundy">
          Ver coleção
        </Link>
      </section>
    </StoreShell>
  );
}
