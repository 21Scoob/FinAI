// src/lib/cookies.js
export const sessionCookieName = process.env.COOKIE_NAME || "finai_session";

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  // setăm Max-Age din expirarea JWT; pentru simplitate 7 zile
  maxAge: 60 * 60 * 24 * 7,
};
