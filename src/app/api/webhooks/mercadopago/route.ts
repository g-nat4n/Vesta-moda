import { NextResponse } from "next/server";
import { handleMercadoPagoNotification } from "@/services/payment.service";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    type?: string;
    action?: string;
    data?: { id?: string };
  };

  const paymentId = body.data?.id;
  const isPayment = body.type === "payment" || body.action?.includes("payment");

  if (paymentId && isPayment) {
    await handleMercadoPagoNotification(String(paymentId));
  }

  return NextResponse.json({ received: true });
}
