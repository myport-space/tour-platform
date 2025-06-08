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
            companyDescription,
            companyWebsite,
            companyAddress,
            companyCity,
            companyCountry,
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
    setTokenCookie(response, token, false)

    return response
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
