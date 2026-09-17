import Link from "next/link";
import { Instagram, MessageCircle, Sparkles } from "lucide-react";
import { ContactForm } from "@/components/home/ContactForm";
import { JournalGrid } from "@/components/home/JournalGrid";
import { Reveal } from "@/components/ui/Reveal";
import { BRAND } from "@/lib/brand";

export function CategoryChips() {
  const { categories } = BRAND;

  return (
    <section id="categorias" className="w-full bg-white px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-wine">{categories.kicker}</p>
          <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="font-serif text-4xl font-semibold text-ink sm:text-5xl">{categories.title}</h2>
            <p className="max-w-md text-sm leading-6 text-[#57574e]">{categories.text}</p>
          </div>
        </Reveal>
        <div className="mt-10 flex flex-wrap gap-3">
          {categories.chips.map((chip, index) => (
            <Reveal key={chip.label} delay={index * 0.05} className="inline-block origin-center">
              <Link
                href={chip.href}
                className="inline-block origin-center border border-gold bg-ivory px-5 py-4 text-sm font-bold text-forest transition duration-300 ease-out hover:z-10 hover:scale-110 hover:border-burgundy hover:bg-cream hover:text-burgundy hover:shadow-[0_14px_30px_rgba(64,8,2,0.12)]"
              >
                {chip.label}
              </Link>
            </Reveal>
          ))}
          <Reveal delay={categories.chips.length * 0.05} className="inline-block origin-center">
            <span className="inline-block border border-dashed border-forest/40 px-5 py-4 text-sm italic text-[#57574e] transition duration-300 hover:scale-105">
              {categories.soon}
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function EditorialLook() {
  const { editorial } = BRAND;

  return (
    <section className="w-full bg-burgundy px-6 py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{editorial.kicker}</p>
          <h2 className="mt-5 font-serif text-5xl font-semibold leading-tight text-white sm:text-6xl">
            {editorial.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="border-l border-gold pl-7">
            <p className="text-xl leading-8 text-ivory">{editorial.text}</p>
            <span className="mt-8 inline-block text-gold">
              <Sparkles className="h-6 w-6" />
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function JournalTeaser() {
  const { journal } = BRAND;

  return (
    <section id="diario" className="w-full bg-white px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-wine">{journal.kicker}</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-gold sm:text-5xl">{journal.title}</h2>
        </Reveal>
        <JournalGrid />
      </div>
    </section>
  );
}

export function ContactBand() {
  const { contact } = BRAND;
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/";
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://wa.me/";

  return (
    <section id="contato" className="w-full bg-burgundy px-6 py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{contact.kicker}</p>
          <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight text-white">{contact.title}</h2>
          <p className="mt-6 max-w-md leading-7 text-ivory/80">{contact.text}</p>
          <div className="mt-10 space-y-3">
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm font-semibold text-gold hover:text-white"
            >
              <Instagram className="h-[19px] w-[19px]" />
              {BRAND.instagramLabel}
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm font-semibold text-gold hover:text-white"
            >
              <MessageCircle className="h-[19px] w-[19px]" />
              {BRAND.whatsappLabel}
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
