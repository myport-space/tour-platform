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
      specializations,
      languages,
      rememberMe = false,
    } = body

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
    const user = await prisma.$transaction(async (tx) => {
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

      // Create tour operator profile
      await tx.tourOperator.create({
        data: {
          userId: newUser.id,
          companyName,
          companyDescription: description,
          companyAddress: address,
          companyCity: city,
          companyCountry: country,
          companyWebsite: website || null,
          specializations: specializations || [],
          languages: languages || [],
        },
      })

      return newUser
    })

    // Generate JWT token
    const token = await signToken({
      id: user.id,
      email: user.email,
      role: user.role,
    })

    // Create response
    const response = NextResponse.json({
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })

    // Set token cookie
    setTokenCookie(response, token, rememberMe)

    return response
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
