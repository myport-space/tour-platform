import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyToken } from "@/lib/auth"

// POST /api/profile/sustainability - Add sustainability initiative
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

    const initiative = await prisma.sustainabilityInitiative.create({
      data: {
        operatorId: operator.id,
        title: data.title,
        description: data.description,
        icon: data.icon || "Leaf",
        startDate: data.startDate || "",
        impact: data.impact || "",
      },
    })

    return NextResponse.json({ message: "Sustainability initiative added successfully", initiative })
  } catch (error) {
    console.error("Error adding sustainability initiative:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// GET /api/profile/sustainability - Get all sustainability initiatives
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
        sustainabilityInitiatives: {
          orderBy: { startDate: 'desc' }
        }
      }
    })

    if (!operator) {
      return NextResponse.json({ error: "Operator profile not found" }, { status: 404 })
    }

    return NextResponse.json(operator.sustainabilityInitiatives)
  } catch (error) {
    console.error("Error fetching sustainability initiatives:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
