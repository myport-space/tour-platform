import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Mock database - in production, use your actual database
const users: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      password,
      phone,
      companyName,
      description,
      website,
      address,
      city,
      country,
      specializations,
      languages,
    } = body

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email)
    if (existingUser) {
      return NextResponse.json({ error: "User already exists with this email" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = {
      id: `user_${Date.now()}`,
      name,
      email,
      password: hashedPassword,
      phone,
      role: "OPERATOR",
      status: "ACTIVE",
      createdAt: new Date(),
      operator: {
        companyName,
        description,
        website,
        address,
        city,
        country,
        specializations: specializations || [],
        languages: languages || [],
      },
    }

    // Store user (in production, save to database)
    users.push(user)

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    )

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: "User created successfully",
      token,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
