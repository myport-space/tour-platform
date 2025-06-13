import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyToken } from "@/lib/auth"
// POST /api/profile/certifications - Add certification
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

    const certification = await prisma.certification.create({
      data: {
        operatorId: operator.id,
        name: data.name,
        year: data.year,
        organization: data.organization,
        certificateNumber: data.certificateNumber || "",
        certificateUrl: data.certificateUrl || "",
      },
    })

    return NextResponse.json({ message: "Certification added successfully", certification })
  } catch (error) {
    console.error("Error adding certification:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// GET /api/profile/certifications - Get all certifications
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
        certifications: {
          orderBy: { year: 'desc' }
        }
      }
    })

    if (!operator) {
      return NextResponse.json({ error: "Operator profile not found" }, { status: 404 })
    }

    return NextResponse.json(operator.certifications)
  } catch (error) {
    console.error("Error fetching certifications:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
