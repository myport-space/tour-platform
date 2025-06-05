import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/lib/database"
import { signToken, setTokenCookie } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      email,
      password,
      name,
      phone,
      role = "OPERATOR",
      companyName,
      companyDescription,
      companyAddress,
      companyCity,
      companyCountry,
      companyWebsite,
      businessLicense,
      experience,
      specializations = [],
      languages = [],
    } = body

    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password, and name are required" }, { status: 400 })
    }

    if (role === "OPERATOR" && (!companyName || !companyDescription || !companyAddress)) {
      return NextResponse.json(
        {
          error: "Company name, description, and address are required for operators",
        },
        { status: 400 },
      )
    }

    // Check if user already exists
    const existingUser = await db.findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user and operator in transaction
    const result = await db.transaction(async (tx: any) => {
      // Create user
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          phone,
          role,
          status: "ACTIVE", // Auto-activate for demo
        },
      })

      // Create operator profile if role is OPERATOR
      let operator = null
      if (role === "OPERATOR") {
        operator = await tx.tourOperator.create({
          data: {
            userId: user.id,
            companyName,
            companyDescription,
            companyAddress,
            companyCity: companyCity || "",
            companyCountry: companyCountry || "",
            companyWebsite: companyWebsite || "",
            businessLicense: businessLicense || "",
            experience: experience || "",
            specializations: Array.isArray(specializations) ? specializations : [],
            languages: Array.isArray(languages) ? languages : [],
            isVerified: true, // Auto-verify for demo
          },
        })
      }

      return { user, operator }
    })

    // Generate JWT token
    const token = await signToken({
      id: result.user.id,
      email: result.user.email,
      role: result.user.role,
    })

    // Create response with user data (excluding password)
    const { password: _, ...userWithoutPassword } = result.user

    const response = NextResponse.json({
      message: "Registration successful",
      user: {
        ...userWithoutPassword,
        operator: result.operator,
      },
    })

    // Set token cookie
    setTokenCookie(response, token, false)

    return response
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
