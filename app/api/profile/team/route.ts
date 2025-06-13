import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

import { verifyToken } from "@/lib/auth"
// POST /api/profile/team - Add team member
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
    const userId = payload.id 
    const data = await request.json()

    // First, get the operator profile
    const operator = await prisma.tourOperator.findFirst({
      where: { userId }
    })

    if (!operator) {
      return NextResponse.json({ error: "Operator profile not found" }, { status: 404 })
    }

    const teamMember = await prisma.teamMember.create({
      data: {
        operatorId: operator.id,
        name: data.name || "New Team Member",
        role: data.role || "Team Member",
        image: data.image || "",
        bio: data.bio || "",
        email: data.email || "",
        phone: data.phone || "",
      },
    })

    return NextResponse.json({ message: "Team member added successfully", teamMember })
  } catch (error) {
    console.error("Error adding team member:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// GET /api/profile/team - Get all team members
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
        teamMembers: {
          orderBy: { createdAt: 'asc' }
        }
      }
    })

    if (!operator) {
      return NextResponse.json({ error: "Operator profile not found" }, { status: 404 })
    }

    return NextResponse.json(operator.teamMembers)
  } catch (error) {
    console.error("Error fetching team members:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
