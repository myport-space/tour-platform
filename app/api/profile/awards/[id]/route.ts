import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// PUT /api/profile/awards/[id] - Update award
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const data = await request.json()

    const updatedAward = await prisma.award.update({
      where: { id },
      data: {
        name: data.name,
        year: data.year,
        organization: data.organization,
        description: data.description,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({ message: "Award updated successfully", award: updatedAward })
  } catch (error) {
    console.error("Error updating award:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE /api/profile/awards/[id] - Delete award
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    await prisma.award.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Award deleted successfully" })
  } catch (error) {
    console.error("Error deleting award:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// GET /api/profile/awards/[id] - Get specific award
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const award = await prisma.award.findUnique({
      where: { id },
    })

    if (!award) {
      return NextResponse.json({ error: "Award not found" }, { status: 404 })
    }

    return NextResponse.json(award)
  } catch (error) {
    console.error("Error fetching award:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
