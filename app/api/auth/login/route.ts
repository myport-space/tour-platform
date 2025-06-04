import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Mock database - in production, use your actual database
// This should be the same array as in register route
const users: any[] = []

// Add a default admin user for testing
if (users.length === 0) {
  users.push({
    id: "admin_1",
    name: "Admin User",
    email: "admin@example.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm", // 'password' hashed
    phone: "+1234567890",
    role: "OPERATOR",
    status: "ACTIVE",
    createdAt: new Date(),
    operator: {
      companyName: "Demo Tours",
      description: "Demo tour company",
      website: "https://demo.com",
      address: "123 Demo St",
      city: "Demo City",
      country: "US",
      specializations: ["Adventure Tours"],
      languages: ["English"],
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, rememberMe } = body

    // Find user by email
    const user = users.find((u) => u.email === email)
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Generate JWT token
    const tokenExpiry = rememberMe ? "30d" : "1d"
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: tokenExpiry },
    )

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
