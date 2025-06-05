import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
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
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "User already exists with this email" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user and tour operator in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create user
      const newUser = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          phone,
          role: "OPERATOR",
          status: "ACTIVE",
        },
      })

      // Create tour operator profile if company details provided
      let operator = null
      if (companyName && description) {
        operator = await tx.tourOperator.create({
          data: {
            userId: newUser.id,
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
          },
        })
      }

      return { user: newUser, operator }
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

    // Handle specific Prisma errors
    if (error instanceof Error) {
      if (error.message.includes("Unique constraint")) {
        return NextResponse.json({ error: "Email already exists" }, { status: 400 })
      }
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
