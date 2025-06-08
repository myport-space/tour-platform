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
      where:{
        email
      }
    })

    if (existingUser) {
      return NextResponse.json({ error: "User already exists with this email" }, { status: 400 })
    }

    console.log({name,email})

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
       data:{
        name,
        email,
        password: hashedPassword,
        phone,
        role: "OPERATOR",
        status: "ACTIVE", 
       },
       select:{
        id:true,
        email:true,
        phone:true,
        role:true,
        status:true
       }
    }) 

    // Create a operator for the user
    await prisma.tourOperator.create({
       data:{
            companyName,
            companyDescription:description,
            companyWebsite:website,
            companyAddress:address,
            companyCity:city,
            companyCountry:country,
            specializations: specializations || [],
            languages: languages || [],
            userId:user.id
       }
    })

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
      user: user
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
