import { StoreShell } from "@/components/layout/StoreShell";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Criar conta",
  path: "/cadastro",
  noIndex: true,
});

export default function RegisterPage() {
  return (
    <StoreShell>
      <section className="container-main">
        <RegisterForm />
      </section>
    </StoreShell>
  );
}
