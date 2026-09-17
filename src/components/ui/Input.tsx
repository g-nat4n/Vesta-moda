import { cn } from "@/lib/utils";

export function Input({
  label,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
        {label}
      </span>
      <input
        className={cn(
          "h-12 w-full border border-line bg-white/70 px-4 text-sm text-ink outline-none transition focus:border-burgundy",
          className,
        )}
        {...props}
      />
    </label>
  );
}

export function Select({
  label,
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
        {label}
      </span>
      <select
        className={cn(
          "h-12 w-full border border-line bg-white/70 px-4 text-sm text-ink outline-none transition focus:border-burgundy",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    </label>
  );
}

export function Textarea({
  label,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
        {label}
      </span>
      <textarea
        className={cn(
          "min-h-32 w-full border border-line bg-white/70 px-4 py-3 text-sm text-ink outline-none transition focus:border-burgundy",
          className,
        )}
        {...props}
      />
    </label>
  );
}
