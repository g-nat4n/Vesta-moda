"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { Reveal } from "@/components/ui/Reveal";

export function TestimonialsCarousel() {
  const { testimonials } = BRAND;
  const [index, setIndex] = useState(0);
  const total = testimonials.items.length;

  const go = (next: number) => setIndex((next + total) % total);

  return (
    <section className="w-full bg-sand px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-wine">{testimonials.kicker}</p>
              <h2 className="mt-3 font-serif text-4xl text-ink">{testimonials.title}</h2>
            </div>
            <div className="hidden gap-2 sm:flex">
              <button
                type="button"
                aria-label="Depoimento anterior"
                className="border border-forest p-3 text-forest"
                onClick={() => go(index - 1)}
              >
                <ArrowLeft className="h-[18px] w-[18px]" />
              </button>
              <button
                type="button"
                aria-label="Próximo depoimento"
                className="bg-forest p-3 text-white"
                onClick={() => go(index + 1)}
              >
                <ArrowRight className="h-[18px] w-[18px]" />
              </button>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-10 overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {testimonials.items.map((item) => (
                <article key={item.author} className="w-full shrink-0 bg-white p-8 md:p-12">
                  <span className="font-serif text-6xl text-gold">“</span>
                  <p className="mt-2 max-w-4xl font-serif text-2xl leading-relaxed text-ink">{item.quote}</p>
                  <p className="mt-7 text-xs font-bold uppercase tracking-[0.15em] text-burgundy">
                    {item.author}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
        <div className="mt-5 flex gap-2">
          {testimonials.items.map((item, slide) => (
            <button
              key={item.author}
              type="button"
              aria-label={`Ver depoimento ${slide + 1}`}
              className={`h-2 w-8 ${slide === index ? "bg-wine" : "bg-gold"}`}
              onClick={() => setIndex(slide)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
