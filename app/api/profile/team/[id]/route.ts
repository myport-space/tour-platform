import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// PUT /api/profile/team/[id] - Update team member
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const data = await request.json()

    const updatedMember = await prisma.teamMember.update({
      where: { id },
      data: {
        name: data.name,
        role: data.role,
        image: data.image,
        bio: data.bio,
        email: data.email,
        phone: data.phone,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({ message: "Team member updated successfully", teamMember: updatedMember })
  } catch (error) {
    console.error("Error updating team member:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE /api/profile/team/[id] - Delete team member
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    await prisma.teamMember.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Team member deleted successfully" })
  } catch (error) {
    console.error("Error deleting team member:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// GET /api/profile/team/[id] - Get specific team member
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const teamMember = await prisma.teamMember.findUnique({
      where: { id },
    })

    if (!teamMember) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 })
    }

    return NextResponse.json(teamMember)
  } catch (error) {
    console.error("Error fetching team member:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
