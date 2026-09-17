"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const fieldClass =
  "h-12 w-full border border-line bg-white/70 px-4 text-sm text-ink outline-none transition focus:border-burgundy";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label: string };

export function Input({ label, className, type, ...props }: InputProps) {
  if (type === "password") {
    return <PasswordInput label={label} className={className} {...props} />;
  }

  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
        {label}
      </span>
      <input className={cn(fieldClass, className)} type={type} {...props} />
    </label>
  );
}

function PasswordInput({ label, className, ...props }: Omit<InputProps, "type">) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
        {label}
      </span>
      <span className="relative block">
        <input
          className={cn(fieldClass, "pr-12", className)}
          type={visible ? "text" : "password"}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-burgundy transition hover:text-wine"
          aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
        >
          {visible ? <EyeOff size={20} strokeWidth={1.7} /> : <Eye size={20} strokeWidth={1.7} />}
        </button>
      </span>
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
