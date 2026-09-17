"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { NAV_LINKS } from "@/lib/constants";
import { BRAND } from "@/lib/brand";
import { useCart } from "@/components/cart/CartProvider";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { data } = useSession();
  const { count, openCart } = useCart();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-gold/30 bg-ivory/90 backdrop-blur-sm transition",
        scrolled && "bg-ivory/97 shadow-[0_8px_28px_rgba(23,22,17,0.09)]",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:px-5 sm:py-4 lg:px-8">
        <Link
          href="/"
          className="shrink-0 font-serif text-lg font-semibold tracking-[0.14em] text-burgundy sm:text-2xl sm:tracking-[0.18em]"
        >
          {BRAND.wordmark}
        </Link>

        <nav className="hidden min-w-0 items-center gap-5 xl:flex" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-xs font-semibold uppercase tracking-[0.12em] text-gold transition hover:text-burgundy",
                pathname === link.href && link.href !== "/#categorias" && "text-burgundy",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <button
            type="button"
            className="rounded-full p-2 text-ink hover:bg-black/10"
            aria-label="Abrir busca"
            onClick={() => setSearchOpen((value) => !value)}
          >
            <Search className="h-[19px] w-[19px]" strokeWidth={2} />
          </button>
          <Link
            href={data?.user ? "/minha-conta" : "/login"}
            className="rounded-full p-2 text-ink hover:bg-black/10"
            aria-label={data?.user ? "Minha conta" : "Entrar"}
          >
            <User className="h-[19px] w-[19px]" strokeWidth={2} />
          </Link>
          <button
            type="button"
            className="relative rounded-full p-2 text-forest hover:bg-forest/10"
            aria-label="Abrir sacola"
            onClick={openCart}
          >
            <ShoppingBag className="h-[19px] w-[19px]" strokeWidth={2} />
            {count > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-wine px-1 text-[10px] leading-4 text-white">
                {count}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            className="ml-1 rounded-full p-2 text-forest hover:bg-forest/10 xl:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X className="h-[21px] w-[21px]" /> : <Menu className="h-[21px] w-[21px]" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen ? (
          <motion.form
            action="/produtos"
            className="border-t border-gold/30 bg-ivory px-5 py-4 lg:px-8"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
          >
            <label className="mx-auto block max-w-7xl">
              <span className="sr-only">Buscar na curadoria</span>
              <input
                name="q"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar peça ou estilo"
                className="h-12 w-full border border-forest/25 bg-white px-4 text-sm outline-none"
              />
            </label>
          </motion.form>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.nav
            className="border-t border-gold/30 bg-ivory xl:hidden"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            aria-label="Navegação mobile"
          >
            <div className="flex flex-col px-6 py-4">
              {NAV_LINKS.map((link, index) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "py-3 text-sm font-semibold text-gold",
                    index < NAV_LINKS.length - 1 && "border-b border-black/10",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={data?.user ? "/minha-conta" : "/login"}
                className="mt-2 border-t border-black/10 py-3 text-sm font-semibold text-burgundy"
              >
                {data?.user ? "Minha conta" : "Entrar"}
              </Link>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
