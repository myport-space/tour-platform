import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, phone, avatar } = body

    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password, and name are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    // Check if customer already exists
    const existingCustomer = await prisma.customerUser.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingCustomer) {
      return NextResponse.json({ error: "Customer with this email already exists" }, { status: 409 })
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create customer
    const customer = await prisma.customerUser.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        name: name.trim(),
        phone: phone?.trim() || null,
        avatar: avatar?.trim() || null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        avatar: true,
        createdAt: true,
      },
    })

    // Generate JWT token
    const token = jwt.sign(
      {
        customerId: customer.id,
        email: customer.email,
        name: customer.name,
        role: "customer",
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    )

    // Create response
    const response = NextResponse.json(
      {
        message: "Customer registered successfully",
        customer,
        token,
      },
      { status: 201 },
    )

    // Set HTTP-only cookie
    response.cookies.set("cus_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Customer registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
