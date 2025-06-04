import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock database - same as other auth routes
const users: any[] = []

// Add default admin user if not exists
if (users.length === 0) {
  users.push({
    id: "admin_1",
    name: "Admin User",
    email: "admin@example.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm",
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

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    // Find user
    const user = users.find((u) => u.id === decoded.id)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Token verification error:", error)
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}
