"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PasswordHints } from "@/components/auth/PasswordHints";
import { passwordSchema } from "@/lib/validations/auth";

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [password, setPassword] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = passwordSchema.safeParse(password);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Revise a senha.");
      return;
    }
    setPending(true);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: String(form.get("email") ?? "").trim(),
        password,
        phone: form.get("phone"),
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      setPending(false);
      setError(data.message ?? "Não foi possível criar a conta.");
      return;
    }
    await signIn("credentials", {
      email: String(form.get("email") ?? "").trim(),
      password,
      callbackUrl: "/minha-conta",
    });
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md space-y-4 py-20">
      <p className="eyebrow">Cadastro</p>
      <h1 className="display text-4xl">Criar conta</h1>
      <Input label="Nome" name="name" autoComplete="name" required />
      <Input label="E-mail" name="email" type="email" autoComplete="email" required />
      <Input label="Telefone" name="phone" autoComplete="tel" />
      <div>
        <Input
          label="Senha"
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <PasswordHints password={password} />
      </div>
      {error ? <p className="text-sm text-wine">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Criando..." : "Cadastrar"}
      </Button>
      <p className="text-sm text-taupe">
        Já tem conta?{" "}
        <Link href="/login" className="text-burgundy">
          Entrar
        </Link>
      </p>
    </form>
  );
}
