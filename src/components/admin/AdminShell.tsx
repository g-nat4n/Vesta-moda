import Link from "next/link";
import { signOut } from "@/auth";

const links = [
  { href: "/admin", label: "Visão geral" },
  { href: "/admin/produtos", label: "Produtos" },
  { href: "/admin/pedidos", label: "Pedidos" },
  { href: "/admin/categorias", label: "Categorias" },
  { href: "/admin/clientes", label: "Clientes" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ivory">
      <aside className="fixed inset-y-0 left-0 hidden w-60 border-r border-line bg-burgundy p-6 text-ivory md:block">
        <Link href="/" className="display text-2xl tracking-[0.16em]">
          VESTA
        </Link>
        <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-gold">Atelier</p>
        <nav className="mt-10 flex flex-col gap-4">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-[12px] uppercase tracking-[0.18em] text-ivory/80 hover:text-ivory">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-6 left-6 right-6 space-y-3">
          <Link
            href="/"
            className="block text-[11px] uppercase tracking-[0.16em] text-gold hover:text-ivory"
          >
            Voltar para a loja
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button type="submit" className="text-[11px] uppercase tracking-[0.16em] text-gold/80 hover:text-gold">
              Sair
            </button>
          </form>
        </div>
      </aside>
      <div className="md:pl-60">
        <header className="flex items-center justify-between gap-3 border-b border-line px-6 py-4 md:hidden">
          <span className="display text-xl">VESTA</span>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.14em]">
            <Link href="/" className="text-burgundy">
              Loja
            </Link>
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </header>
        <div className="p-6 md:p-10">{children}</div>
      </div>
    </div>
  );
}
