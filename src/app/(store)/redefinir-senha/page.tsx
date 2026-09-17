import { Suspense } from "react";
import { StoreShell } from "@/components/layout/StoreShell";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Nova senha",
  path: "/redefinir-senha",
  noIndex: true,
});

export default function ResetPasswordPage() {
  return (
    <StoreShell>
      <section className="container-main">
        <Suspense>
          <ResetPasswordForm />
        </Suspense>
      </section>
    </StoreShell>
  );
}
