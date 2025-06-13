import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// PUT /api/profile/certifications/[id] - Update certification
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const data = await request.json()

    const updatedCertification = await prisma.certification.update({
      where: { id },
      data: {
        name: data.name,
        year: data.year,
        organization: data.organization,
        certificateNumber: data.certificateNumber,
        certificateUrl: data.certificateUrl,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({ message: "Certification updated successfully", certification: updatedCertification })
  } catch (error) {
    console.error("Error updating certification:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE /api/profile/certifications/[id] - Delete certification
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    await prisma.certification.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Certification deleted successfully" })
  } catch (error) {
    console.error("Error deleting certification:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// GET /api/profile/certifications/[id] - Get specific certification
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const certification = await prisma.certification.findUnique({
      where: { id },
    })

    if (!certification) {
      return NextResponse.json({ error: "Certification not found" }, { status: 404 })
    }

    return NextResponse.json(certification)
  } catch (error) {
    console.error("Error fetching certification:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
