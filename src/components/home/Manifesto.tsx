import { BRAND } from "@/lib/brand";
import { Reveal } from "@/components/ui/Reveal";

export function Manifesto() {
  const { manifesto } = BRAND;

  return (
    <section id="vesta" className="w-full bg-ivory px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{manifesto.kicker}</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-burgundy sm:text-5xl">
              {manifesto.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-2xl text-lg leading-8 text-gold">{manifesto.description}</p>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-px border border-gold bg-gold md:grid-cols-3">
          {manifesto.pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.1}>
              <article
                className={pillar.tone === "burgundy" ? "h-full bg-burgundy p-8" : "h-full bg-ivory p-8"}
              >
                <span className="font-serif text-4xl text-gold">{pillar.n}</span>
                <h3
                  className={`mt-8 font-serif text-2xl ${
                    pillar.tone === "burgundy" ? "text-white" : "text-gold"
                  }`}
                >
                  {pillar.title}
                </h3>
                <p
                  className={`mt-3 leading-7 ${
                    pillar.tone === "burgundy" ? "text-ivory" : "text-gold"
                  }`}
                >
                  {pillar.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
