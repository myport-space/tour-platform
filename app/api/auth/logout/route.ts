import { NextResponse } from "next/server"
import { clearTokenCookie } from "@/lib/auth"

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Logged out successfully" })
    clearTokenCookie(response)
    return response
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
