"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password"),
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
      email: String(form.get("email")),
      password: String(form.get("password")),
      callbackUrl: "/minha-conta",
    });
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md space-y-4 py-20">
      <p className="eyebrow">Cadastro</p>
      <h1 className="display text-4xl">Criar conta</h1>
      <Input label="Nome" name="name" required />
      <Input label="E-mail" name="email" type="email" required />
      <Input label="Telefone" name="phone" />
      <Input label="Senha" name="password" type="password" minLength={8} required />
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
