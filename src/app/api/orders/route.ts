import { NextResponse } from "next/server";
import { PaymentStatus } from "@prisma/client";
import { auth } from "@/auth";
import { checkoutSchema } from "@/lib/validations";
import { createOrder, restoreOrderStock } from "@/services/order.service";
import { createPaymentPreference, mercadoPagoErrorMessage } from "@/services/payment.service";

export async function POST(request: Request) {
  try {
    const session = await auth();
    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0]?.message ?? "Dados inválidos" },
        { status: 400 },
      );
    }

    const cart = Array.isArray(body.cart) ? body.cart : [];
    const order = await createOrder(parsed.data, cart, session?.user.id);

    try {
      const payment = await createPaymentPreference(order.id);
      return NextResponse.json({
        orderId: order.id,
        number: order.number,
        checkoutUrl: payment.checkoutUrl,
      });
    } catch (error) {
      await restoreOrderStock(order.id, PaymentStatus.REJECTED);
      return NextResponse.json({ message: mercadoPagoErrorMessage(error) }, { status: 400 });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao criar pedido";
    return NextResponse.json({ message }, { status: 400 });
  }
}
