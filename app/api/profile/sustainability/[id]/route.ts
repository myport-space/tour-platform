import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// PUT /api/profile/sustainability/[id] - Update sustainability initiative
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const data = await request.json()

    const updatedInitiative = await prisma.sustainabilityInitiative.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        startDate: data.startDate,
        impact: data.impact,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({ message: "Sustainability initiative updated successfully", initiative: updatedInitiative })
  } catch (error) {
    console.error("Error updating sustainability initiative:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE /api/profile/sustainability/[id] - Delete sustainability initiative
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    await prisma.sustainabilityInitiative.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Sustainability initiative deleted successfully" })
  } catch (error) {
    console.error("Error deleting sustainability initiative:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// GET /api/profile/sustainability/[id] - Get specific sustainability initiative
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const initiative = await prisma.sustainabilityInitiative.findUnique({
      where: { id },
    })

    if (!initiative) {
      return NextResponse.json({ error: "Sustainability initiative not found" }, { status: 404 })
    }

    return NextResponse.json(initiative)
  } catch (error) {
    console.error("Error fetching sustainability initiative:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
