"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const form = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
      redirect: false,
    });
    setPending(false);
    if (result?.error) {
      setError("E-mail ou senha inválidos.");
      return;
    }
    router.push(params.get("callbackUrl") || "/minha-conta");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md space-y-4 py-20">
      <p className="eyebrow">Acesso</p>
      <h1 className="display text-4xl">Entrar</h1>
      <Input label="E-mail" name="email" type="email" required />
      <Input label="Senha" name="password" type="password" required />
      {error ? <p className="text-sm text-wine">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Entrando..." : "Entrar"}
      </Button>
      <p className="text-sm text-taupe">
        Ainda não tem conta?{" "}
        <Link href="/cadastro" className="text-burgundy">
          Criar cadastro
        </Link>
      </p>
    </form>
  );
}
