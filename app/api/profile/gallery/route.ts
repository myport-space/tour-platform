import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyToken } from "@/lib/auth"
// POST /api/profile/gallery - Add gallery item
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

    const galleryItem = await prisma.galleryItem.create({
      data: {
        operatorId: operator.id,
        url: data.url,
        caption: data.caption || "",
        category: data.category || "general",
      },
    })

    return NextResponse.json({ message: "Gallery item added successfully", galleryItem })
  } catch (error) {
    console.error("Error adding gallery item:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// GET /api/profile/gallery - Get all gallery items
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
        gallery: {
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!operator) {
      return NextResponse.json({ error: "Operator profile not found" }, { status: 404 })
    }

    return NextResponse.json(operator.gallery)
  } catch (error) {
    console.error("Error fetching gallery items:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
