import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, rememberMe = false } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find customer by email
    const customer = await prisma.customerUser.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (!customer) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, customer.password)
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Update last login
    await prisma.customerUser.update({
      where: { id: customer.id },
      data: { lastLogin: new Date() },
    })

    // Generate JWT token
    const tokenExpiry = rememberMe ? "30d" : "7d"
    const token = jwt.sign(
      {
        customerId: customer.id,
        email: customer.email,
        name: customer.name,
        role: "customer",
      },
      JWT_SECRET,
      { expiresIn: tokenExpiry },
    )

    // Prepare customer data (exclude password)
    const customerData = {
      id: customer.id,
      email: customer.email,
      name: customer.name,
      phone: customer.phone,
      avatar: customer.avatar,
      lastLogin: new Date(),
      createdAt: customer.createdAt,
    }

    // Create response
    const response = NextResponse.json({
      message: "Login successful",
      customer: customerData,
      token,
    })

    // Set HTTP-only cookie
    const cookieMaxAge = rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60 // 30 days or 7 days
    response.cookies.set("cus_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: cookieMaxAge,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Customer login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
