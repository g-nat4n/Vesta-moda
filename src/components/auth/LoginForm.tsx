"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const ERRORS: Record<string, string> = {
  locked: "Muitas tentativas. Aguarde 1 minuto e tente de novo.",
  email: "Este e-mail não possui cadastro.",
  password: "Senha incorreta.",
  CredentialsSignin: "Não foi possível entrar. Confira o e-mail e a senha.",
};

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [notice] = useState(params.get("reset") === "ok" ? "Senha atualizada. Entre com a nova senha." : null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);
    const form = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: String(form.get("email") ?? "").trim(),
      password: String(form.get("password") ?? ""),
      redirect: false,
    });
    setPending(false);
    if (result?.error) {
      const code = "code" in result && typeof result.code === "string" ? result.code : result.error;
      setError(ERRORS[code] ?? ERRORS.CredentialsSignin);
      return;
    }
    router.push(params.get("callbackUrl") || "/minha-conta");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md space-y-4 py-20" autoComplete="on">
      <p className="eyebrow">Acesso</p>
      <h1 className="display text-4xl">Entrar</h1>
      <Input label="E-mail" name="email" type="email" autoComplete="email" required />
      <Input label="Senha" name="password" type="password" autoComplete="current-password" required />
      {notice ? <p className="text-sm text-forest">{notice}</p> : null}
      {error ? <p className="text-sm text-wine">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Entrando..." : "Entrar"}
      </Button>
      <p className="text-sm text-taupe">
        <Link href="/recuperar-senha" className="text-burgundy">
          Esqueci a senha
        </Link>
      </p>
      <p className="text-sm text-taupe">
        Ainda não tem conta?{" "}
        <Link href="/cadastro" className="text-burgundy">
          Criar cadastro
        </Link>
      </p>
    </form>
  );
}
