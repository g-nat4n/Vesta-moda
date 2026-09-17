import { NextResponse } from "next/server";
import { lookupCep, quoteShipping } from "@/services/shipping.service";

export async function POST(request: Request) {
  try {
    const { zip } = (await request.json()) as { zip?: string };
    const quotes = await quoteShipping(zip ?? "");
    return NextResponse.json({ quotes });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao calcular frete";
    return NextResponse.json({ message }, { status: 400 });
  }
}
