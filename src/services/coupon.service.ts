import { prisma } from "@/lib/prisma";

export async function applyCoupon(code: string | undefined, subtotalCents: number) {
  if (!code?.trim()) {
    return { discountCents: 0, couponId: null as string | null, code: null as string | null };
  }

  const coupon = await prisma.coupon.findUnique({
    where: { code: code.trim().toUpperCase() },
  });

  if (!coupon || !coupon.active) {
    throw new Error("Cupom inválido.");
  }
  if (coupon.expiresAt && coupon.expiresAt < new Date()) {
    throw new Error("Este cupom expirou.");
  }

  const discountCents = coupon.percentOff
    ? Math.round(subtotalCents * (coupon.percentOff / 100))
    : coupon.amountCents ?? 0;

  return {
    discountCents: Math.min(discountCents, subtotalCents),
    couponId: coupon.id,
    code: coupon.code,
  };
}

export async function previewCoupon(code: string, subtotalCents: number) {
  return applyCoupon(code, subtotalCents);
}
