import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Footer({ className }: { className?: string }) {
  const { footer } = BRAND;

  return (
    <footer className={cn("mt-auto w-full bg-ink px-6 py-14 text-ivory lg:px-8", className)}>
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl tracking-[0.15em] text-gold">{BRAND.footerBrand}</p>
          <p className="mt-4 font-serif text-xl italic">{BRAND.phrase}</p>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-gold">{footer.navTitle}</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {NAV_LINKS.filter((link) => link.label !== "Início").map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-gold">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-gold">{footer.serviceTitle}</h2>
          <p className="mt-4 text-sm leading-6 text-ivory/70">{footer.serviceText}</p>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col justify-between gap-3 border-t border-white/15 pt-6 text-xs text-white/55 sm:flex-row">
        <p>{footer.copy}</p>
        <a href="#topo" className="font-bold text-gold">
          {BRAND.backTop}
        </a>
      </div>
    </footer>
  );
}
