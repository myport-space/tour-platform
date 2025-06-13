import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyToken } from "@/lib/auth"
// POST /api/profile/awards - Add award
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

    const award = await prisma.award.create({
      data: {
        operatorId: operator.id,
        name: data.name,
        year: data.year,
        organization: data.organization,
        description: data.description || "",
      },
    })

    return NextResponse.json({ message: "Award added successfully", award })
  } catch (error) {
    console.error("Error adding award:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// GET /api/profile/awards - Get all awards
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
        awards: {
          orderBy: { year: 'desc' }
        }
      }
    })

    if (!operator) {
      return NextResponse.json({ error: "Operator profile not found" }, { status: 404 })
    }

    return NextResponse.json(operator.awards)
  } catch (error) {
    console.error("Error fetching awards:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
