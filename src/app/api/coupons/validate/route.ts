import { NextResponse } from "next/server";
import { previewCoupon } from "@/services/coupon.service";

export async function POST(request: Request) {
  try {
    const { code, subtotalCents } = (await request.json()) as {
      code?: string;
      subtotalCents?: number;
    };
    const result = await previewCoupon(code ?? "", Number(subtotalCents ?? 0));
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Cupom inválido";
    return NextResponse.json({ message }, { status: 400 });
  }
}
