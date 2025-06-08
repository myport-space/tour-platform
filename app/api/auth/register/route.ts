import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken" 
import { PrismaClient } from "@prisma/client"
import { setTokenCookie } from "@/lib/auth"

const prisma = new PrismaClient()
 

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
    const existingUser = await prisma.user.findUnique({
      where:{
        email
      }
    })

    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 })
    }

    console.log({name,email})

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
    
 
 

    // Create response with user data (excluding password) 

    const response = NextResponse.json({
      message: "User created successfully",
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
