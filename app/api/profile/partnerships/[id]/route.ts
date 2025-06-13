import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// PUT /api/profile/partnerships/[id] - Update partnership
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const data = await request.json()

    const updatedPartnership = await prisma.partnership.update({
      where: { id },
      data: {
        name: data.name,
        logo: data.logo,
        description: data.description,
        website: data.website,
        startDate: data.startDate,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({ message: "Partnership updated successfully", partnership: updatedPartnership })
  } catch (error) {
    console.error("Error updating partnership:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE /api/profile/partnerships/[id] - Delete partnership
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    await prisma.partnership.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Partnership deleted successfully" })
  } catch (error) {
    console.error("Error deleting partnership:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// GET /api/profile/partnerships/[id] - Get specific partnership
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const partnership = await prisma.partnership.findUnique({
      where: { id },
    })

    if (!partnership) {
      return NextResponse.json({ error: "Partnership not found" }, { status: 404 })
    }

    return NextResponse.json(partnership)
  } catch (error) {
    console.error("Error fetching partnership:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
