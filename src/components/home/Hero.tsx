import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { BRAND } from "@/lib/brand";

export function Hero() {
  const { hero } = BRAND;

  return (
    <section id="inicio" className="w-full overflow-hidden">
      <div className="grid lg:min-h-[650px] lg:grid-cols-[1.02fr_0.98fr]">
        <div className="flex items-center bg-burgundy px-5 py-12 sm:px-10 sm:py-16 lg:px-[max(4rem,calc((100vw-1280px)/2))]">
          <Reveal>
            <div className="max-w-xl">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-gold">{hero.kicker}</p>
              <h1 className="max-w-lg font-serif text-[2.6rem] font-semibold leading-[0.98] text-white sm:text-6xl lg:text-7xl">
                {hero.title}
              </h1>
              <p className="mt-7 max-w-md text-base leading-7 text-ivory/85">{hero.description}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/#curadoria" className="normal-case tracking-normal px-5 py-3 text-sm min-h-0 hover:bg-white">
                  {hero.primaryCta}
                  <ArrowDownRight className="h-4 w-4" />
                </Button>
                <Button href="/a-vesta" variant="outline" className="normal-case tracking-normal px-5 py-3 text-sm min-h-0 text-white hover:text-forest">
                  {hero.secondaryCta}
                </Button>
              </div>
              <div className="mt-14 flex items-center gap-4">
                <span className="gold-line" />
                <p className="font-serif text-lg italic text-gold">{hero.signature}</p>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.12} className="relative h-full min-h-[380px] overflow-hidden bg-wine sm:min-h-[500px]">
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            fill
            priority
            className="object-cover opacity-90 saturate-[.78] contrast-[1.06] transition duration-1000 hover:scale-[1.045]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-6 max-w-[235px] border border-gold bg-ivory p-5 shadow-xl sm:left-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-burgundy">{hero.cardLabel}</p>
            <p className="mt-2 font-serif text-xl leading-snug text-forest">{hero.cardText}</p>
          </div>
          <div className="absolute right-7 top-8 border border-gold px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
            {hero.badge}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
