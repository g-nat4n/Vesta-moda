import { StoreShell } from "@/components/layout/StoreShell";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Recuperar senha",
  path: "/recuperar-senha",
  noIndex: true,
});

export default function ForgotPasswordPage() {
  return (
    <StoreShell>
      <section className="container-main">
        <ForgotPasswordForm />
      </section>
    </StoreShell>
  );
}
