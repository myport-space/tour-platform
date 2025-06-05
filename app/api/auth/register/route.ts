import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/lib/database"
import { signToken, setTokenCookie } from "@/lib/auth"

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
      specializations = [],
      languages = [],
      rememberMe = false,
    } = body

    // Validate required fields
    if (!name || !email || !password || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await db.findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "User already exists with this email" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Prepare user data
    const userData = {
      email,
      password: hashedPassword,
      name,
      phone,
      role: "OPERATOR" as const,
      status: "ACTIVE" as const,
    }

    // Prepare operator data if provided
    let result
    if (companyName && description) {
      const operatorData = {
        companyName,
        companyDescription: description,
        companyAddress: address || "",
        companyCity: city || "",
        companyCountry: country || "",
        companyWebsite: website || null,
        specializations,
        languages,
        isVerified: false,
        rating: 0,
        totalReviews: 0,
      }

      result = await db.createUserWithOperator(userData, operatorData)
    } else {
      result = { user: await db.createUser(userData), operator: null }
    }

    // Generate JWT token
    const token = await signToken({
      id: result.user.id,
      email: result.user.email,
      role: result.user.role,
    })

    // Create response with user data (excluding password)
    const { password: _, ...userWithoutPassword } = result.user

    const response = NextResponse.json({
      message: "User created successfully",
      user: {
        ...userWithoutPassword,
        operator: result.operator,
      },
    })

    // Set token cookie
    setTokenCookie(response, token, rememberMe)

    return response
  } catch (error) {
    console.error("Registration error:", error)

    // Handle specific errors
    if (error instanceof Error) {
      if (error.message.includes("Unique constraint") || error.message.includes("already exists")) {
        return NextResponse.json({ error: "Email already exists" }, { status: 400 })
      }
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
