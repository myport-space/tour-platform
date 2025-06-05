import { SignJWT, jwtVerify } from "jose"
import type { NextResponse } from "next/server"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-fallback-secret-key")

export interface TokenPayload {
  id: string
  email: string
  role: string
}

export async function signToken(payload: TokenPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as TokenPayload
  } catch (error) {
    console.error("Token verification failed:", error)
    return null
  }
}

export function setTokenCookie(response: NextResponse, token: string, rememberMe = false) {
  const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60 // 30 days or 7 days

  // Set the cookie with proper configuration
  response.cookies.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge,
    path: "/",
  })

  console.log("Cookie set:", {
    token: token.substring(0, 20) + "...",
    maxAge,
    secure: process.env.NODE_ENV === "production",
  })
}

export function clearTokenCookie(response: NextResponse) {
  response.cookies.set("auth-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  })
}
