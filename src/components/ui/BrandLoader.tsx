import { BRAND } from "@/lib/brand";

export function BrandLoader({ label = "Carregando mais peças" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12" aria-live="polite" role="status">
      <div className="relative flex h-[5.5rem] w-[5.5rem] items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-gold/25" />
        <span className="absolute inset-1 animate-spin rounded-full border-2 border-transparent border-t-gold border-r-gold/40" />
        <span className="absolute inset-3 rounded-full border border-burgundy/20" />
        <span className="font-serif text-[11px] font-semibold tracking-[0.28em] text-burgundy">{BRAND.wordmark}</span>
      </div>
      <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-taupe">{label}</p>
    </div>
  );
}
