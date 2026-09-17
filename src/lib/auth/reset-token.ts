import crypto from "node:crypto";

export function createResetToken() {
  const token = crypto.randomBytes(32).toString("hex");
  const hash = hashResetToken(token);
  return { token, hash };
}

export function hashResetToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}
