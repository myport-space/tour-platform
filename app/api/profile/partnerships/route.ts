import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyToken } from "@/lib/auth"
// POST /api/profile/partnerships - Add partnership
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
        
    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }// This should come from authentication
    const data = await request.json()
    const userId = payload.id 

    // First, get the operator profile
    const operator = await prisma.tourOperator.findFirst({
      where: { userId }
    })

    if (!operator) {
      return NextResponse.json({ error: "Operator profile not found" }, { status: 404 })
    }

    const partnership = await prisma.partnership.create({
      data: {
        operatorId: operator.id,
        name: data.name,
        logo: data.logo || "",
        description: data.description || "",
        website: data.website || "",
        startDate: data.startDate || "",
      },
    })

    return NextResponse.json({ message: "Partnership added successfully", partnership })
  } catch (error) {
    console.error("Error adding partnership:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// GET /api/profile/partnerships - Get all partnerships
export async function GET(request: NextRequest) {
  try {
   const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
        
    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }// This should come from authentication
    const userId = payload.id 
    const operator = await prisma.tourOperator.findFirst({
      where: { userId },
      include: {
        partnerships: {
          orderBy: { startDate: 'desc' }
        }
      }
    })

    if (!operator) {
      return NextResponse.json({ error: "Operator profile not found" }, { status: 404 })
    }

    return NextResponse.json(operator.partnerships)
  } catch (error) {
    console.error("Error fetching partnerships:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
