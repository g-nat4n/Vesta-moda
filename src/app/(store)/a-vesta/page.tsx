import { StoreShell } from "@/components/layout/StoreShell";
import { Manifesto } from "@/components/home/Manifesto";
import { EditorialLook } from "@/components/home/Sections";
import { Button } from "@/components/ui/Button";
import { createMetadata } from "@/lib/seo";
import { BRAND } from "@/lib/brand";

export const metadata = createMetadata({
  title: "A Vesta",
  description: BRAND.manifesto.description,
  path: "/a-vesta",
});

export default function AboutPage() {
  return (
    <StoreShell>
      <Manifesto />
      <EditorialLook />
      <section className="bg-ivory px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Button href="/produtos">{BRAND.hero.primaryCta}</Button>
        </div>
      </section>
    </StoreShell>
  );
}
