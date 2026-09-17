import Link from "next/link";
import { cn } from "@/lib/utils";

export function InsightRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-5 flex gap-4 overflow-x-auto pb-4 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {children}
    </div>
  );
}

export function InsightCard({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex w-[220px] shrink-0 flex-col rounded-2xl bg-white p-4 shadow-[0_10px_28px_rgba(23,22,17,0.08)]",
        className,
      )}
    >
      {title ? <h3 className="text-[15px] font-semibold leading-snug text-ink">{title}</h3> : null}
      {children}
    </article>
  );
}

export function InsightAction({
  href,
  children,
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const className =
    "inline-flex min-h-10 w-full items-center justify-center rounded-full border border-wine/25 px-3 text-[12px] font-medium text-wine transition hover:border-wine hover:bg-wine hover:text-white";

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}
