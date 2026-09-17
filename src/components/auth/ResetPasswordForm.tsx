"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PasswordHints } from "@/components/auth/PasswordHints";
import { passwordSchema } from "@/lib/validations/auth";

export function ResetPasswordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(token ? null : "Link inválido.");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = passwordSchema.safeParse(password);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Revise a senha.");
      return;
    }
    setPending(true);
    const response = await fetch("/api/auth/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await response.json();
    setPending(false);
    if (!response.ok) {
      setError(data.message ?? "Não foi possível atualizar a senha.");
      return;
    }
    router.push("/login?reset=ok");
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md space-y-4 py-20">
      <p className="eyebrow">Recuperar senha</p>
      <h1 className="display text-4xl">Nova senha</h1>
      <div>
        <Input
          label="Nova senha"
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
      <Button type="submit" className="w-full" disabled={pending || !token}>
        {pending ? "Salvando..." : "Salvar senha"}
      </Button>
      <Link href="/login" className="inline-block text-sm text-burgundy">
        Voltar ao login
      </Link>
    </form>
  );
}
