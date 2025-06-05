import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import type { NextRequest, NextResponse } from "next/server"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret_for_development_only")

export async function signToken(payload: any, expiresIn = "7d") {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(JWT_SECRET)

  return token
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch (error) {
    return null
  }
}

export function setTokenCookie(response: NextResponse, token: string, rememberMe = false) {
  // Set cookie expiry based on "remember me" option
  const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60 // 30 days or 1 day in seconds

  cookies().set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge,
    sameSite: "lax",
  })
}

export function getTokenFromRequest(request: NextRequest) {
  // Try to get token from cookies first
  const token = request.cookies.get("token")?.value

  // If no token in cookies, check Authorization header
  if (!token) {
    const authHeader = request.headers.get("authorization")
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.substring(7)
    }
  }

  return token
}

export function removeTokenCookie() {
  cookies().delete("token")
}
