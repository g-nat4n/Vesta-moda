import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { prisma } from "@/lib/prisma";
import { markOrderPaid, restoreOrderStock } from "@/services/order.service";
import { PaymentStatus } from "@prisma/client";

function getClient() {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN?.trim();
  if (!token) return null;
  return new MercadoPagoConfig({ accessToken: token });
}

function isPublicHttps(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && parsed.hostname !== "localhost" && parsed.hostname !== "127.0.0.1";
  } catch {
    return false;
  }
}

export function mercadoPagoErrorMessage(error: unknown) {
  if (error && typeof error === "object") {
    const err = error as {
      message?: string;
      cause?: Array<{ description?: string; message?: string }>;
    };
    const cause = err.cause?.[0]?.description ?? err.cause?.[0]?.message;
    if (cause) return cause;
    if (err.message) return err.message;
  }
  if (error instanceof Error && error.message) return error.message;
  return "Não foi possível iniciar o pagamento no Mercado Pago.";
}

export function isMercadoPagoConfigured() {
  return Boolean(process.env.MERCADOPAGO_ACCESS_TOKEN?.trim());
}

export async function createPaymentPreference(orderId: string) {
  const client = getClient();
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true, payment: true },
  });
  if (!order) throw new Error("Pedido não encontrado.");

  if (!client) {
    return {
      checkoutUrl: `/pedido/${order.id}?status=pending-payment`,
      preferenceId: null as string | null,
    };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? process.env.AUTH_URL ?? "http://localhost:3000";
  const successUrl = `${appUrl}/pedido/${order.id}?status=success`;
  const preference = new Preference(client);
  const created = await preference.create({
    body: {
      external_reference: order.id,
      items: [
        {
          id: order.id,
          title: `Pedido ${order.number}`,
          quantity: 1,
          unit_price: Math.max(order.totalCents / 100, 1),
          currency_id: "BRL",
        },
      ],
      payer: {
        name: order.customerName,
        email: order.email,
        identification: order.cpf
          ? { type: "CPF", number: order.cpf.replace(/\D/g, "") }
          : undefined,
      },
      back_urls: {
        success: successUrl,
        failure: `${appUrl}/pedido/${order.id}?status=failure`,
        pending: `${appUrl}/pedido/${order.id}?status=pending`,
      },
      ...(isPublicHttps(appUrl)
        ? {
            notification_url: `${appUrl}/api/webhooks/mercadopago`,
            auto_return: "approved" as const,
          }
        : {}),
      statement_descriptor: "VESTAMODA",
    },
  });

  await prisma.payment.update({
    where: { orderId: order.id },
    data: { preferenceId: created.id },
  });

  return {
    checkoutUrl: created.init_point ?? created.sandbox_init_point ?? `/pedido/${order.id}`,
    preferenceId: created.id ?? null,
  };
}

export async function handleMercadoPagoNotification(paymentId: string) {
  const client = getClient();
  if (!client) return;

  const api = new Payment(client);
  const payment = await api.get({ id: paymentId });
  const orderId = payment.external_reference;
  if (!orderId) return;

  const status = payment.status;
  if (status === "approved") {
    await markOrderPaid(orderId, String(payment.id), payment);
    return;
  }
  if (status === "rejected" || status === "cancelled" || status === "refunded") {
    await restoreOrderStock(
      orderId,
      status === "refunded" ? PaymentStatus.REFUNDED : PaymentStatus.REJECTED,
    );
  }
}
