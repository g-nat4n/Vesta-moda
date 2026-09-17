"use client";

import { useState } from "react";
import { formatBRL, formatCep } from "@/lib/format";
import type { ShippingQuote } from "@/types";

export function ShippingEstimator() {
  const [cep, setCep] = useState("");
  const [quotes, setQuotes] = useState<ShippingQuote[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function calculate(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const response = await fetch("/api/shipping/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ zip: cep }),
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      setQuotes([]);
      setError(data.message ?? "Não foi possível calcular o envio.");
      return;
    }
    setQuotes(data.quotes ?? []);
  }

  return (
    <form onSubmit={calculate} className="border-t border-line pt-6">
      <p className="text-[11px] uppercase tracking-[0.2em] text-taupe">Frete</p>
      <div className="mt-3 flex gap-2">
        <input
          value={cep}
          onChange={(event) => setCep(formatCep(event.target.value))}
          placeholder="00000-000"
          aria-label="CEP"
          className="h-12 flex-1 border border-line bg-white px-3"
        />
        <button type="submit" className="h-12 px-4 text-[11px] uppercase tracking-[0.16em] text-burgundy">
          {loading ? "..." : "Calcular"}
        </button>
      </div>
      {error ? <p className="mt-3 text-xs text-wine">{error}</p> : null}
      <ul className="mt-4 space-y-2 text-sm">
        {quotes.map((quote) => (
          <li key={quote.id} className="flex justify-between gap-4 text-taupe">
            <span>{quote.label}</span>
            <span>{formatBRL(quote.priceCents)}</span>
          </li>
        ))}
      </ul>
    </form>
  );
}
