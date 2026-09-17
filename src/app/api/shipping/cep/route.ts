import { NextResponse } from "next/server";
import { lookupCep } from "@/services/shipping.service";

export async function POST(request: Request) {
  try {
    const { zip } = (await request.json()) as { zip?: string };
    const address = await lookupCep(zip ?? "");
    return NextResponse.json(address);
  } catch (error) {
    const message = error instanceof Error ? error.message : "CEP inválido";
    return NextResponse.json({ message }, { status: 400 });
  }
}
