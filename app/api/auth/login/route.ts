import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { signToken, setTokenCookie } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, rememberMe = false } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user by email with operator data
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        operator: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Check if user is active
    if (user.status !== "ACTIVE") {
      return NextResponse.json({ error: "Account is not active" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Update last login time
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    })

    // Generate JWT token
    const token = await signToken({
      id: user.id,
      email: user.email,
      role: user.role,
    })

    // Create response with user data (excluding password)
    const { password: _, ...userWithoutPassword } = user

    const response = NextResponse.json({
      message: "Login successful",
      user: userWithoutPassword,
    })

    // Set token cookie
    setTokenCookie(response, token, rememberMe)

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
