import { StoreShell } from "@/components/layout/StoreShell";
import { ContactBand } from "@/components/home/Sections";
import { createMetadata } from "@/lib/seo";
import { BRAND } from "@/lib/brand";

export const metadata = createMetadata({
  title: "Contato",
  description: BRAND.contact.text,
  path: "/contato",
});

export default function ContactPage() {
  return (
    <StoreShell>
      <ContactBand />
    </StoreShell>
  );
}
