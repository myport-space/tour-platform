import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken" 
import { PrismaClient } from "@prisma/client"
import { Turret_Road } from "next/font/google"

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
      specializations,
      languages,
    } = body

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
    

    return NextResponse.json({
      message: "User created successfully",
      token,
      user: user,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
