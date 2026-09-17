import { Suspense } from "react";
import { StoreShell } from "@/components/layout/StoreShell";
import { LoginForm } from "@/components/auth/LoginForm";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Entrar",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <StoreShell>
      <section className="container-main">
        <Suspense>
          <LoginForm />
        </Suspense>
      </section>
    </StoreShell>
  );
}
