import { NextResponse } from "next/server";

/**
 * Bridge HTTPS para o Checkout Pro.
 * O Mercado Pago não aceita localhost em back_urls; em desenvolvimento
 * apontamos o retorno para cá e redirecionamos para a loja local.
 */
function safeLocalHome(home: string | null) {
  if (!home) return "http://localhost:3000";
  try {
    const parsed = new URL(home);
    if (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") {
      return parsed.origin;
    }
  } catch {
    // ignore
  }
  return null;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const orderId = url.searchParams.get("external_reference");
  const result = url.searchParams.get("result") || "pending";
  const localHome = safeLocalHome(url.searchParams.get("home"));

  if (!orderId) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const destination = localHome
    ? new URL(`/pedido/${orderId}`, localHome)
    : new URL(`/pedido/${orderId}`, request.url);

  destination.searchParams.set("result", result);

  for (const key of [
    "payment_id",
    "collection_id",
    "collection_status",
    "status",
    "preference_id",
    "payment_type",
    "merchant_order_id",
  ]) {
    const value = url.searchParams.get(key);
    if (value) destination.searchParams.set(key, value);
  }

  return NextResponse.redirect(destination);
}
