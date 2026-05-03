import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const COOKIE = "adilexpress_admin";

function getSecretBytes(): Uint8Array | null {
  const s = process.env.ADMIN_SECRET;
  if (!s || s.length < 16) return null;
  return new TextEncoder().encode(s);
}

function requireSecretBytes(): Uint8Array {
  const b = getSecretBytes();
  if (!b) {
    throw new Error("ADMIN_SECRET must be set (min 16 characters)");
  }
  return b;
}

export async function createAdminSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("12h")
    .sign(requireSecretBytes());
}

export async function setAdminSessionCookie() {
  const token = await createAdminSessionToken();
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 12,
  });
}

export async function clearAdminSessionCookie() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  const secret = getSecretBytes();
  if (!secret) return false;
  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function isAdminSession(): Promise<boolean> {
  const jar = await cookies();
  const t = jar.get(COOKIE)?.value;
  if (!t) return false;
  return verifyAdminToken(t);
}
