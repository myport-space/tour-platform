import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { verifyToken } from "@/lib/auth"

const prisma = new PrismaClient()

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, color } = body

    // Validate required fields
    if (!name || !description) {
      return NextResponse.json({ error: "Name and description are required" }, { status: 400 })
    }

    // Update category
    const category = await prisma.category.update({
      where: { id: params.id },
      data: {
        name,
        description,
        color: color || "#10B981",
      },
    })

    return NextResponse.json({
      message: "Category updated successfully",
      category: {
        id: category.id,
        name: category.name,
        description: category.description,
        color: category.color,
        tourCount: 0, // Will be calculated in the frontend
        totalBookings: 0,
        revenue: 0,
        isActive: category.isActive,
      },
    })
  } catch (error) {
    console.error("Error updating category:", error)
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Check if category has tours
    const toursCount = await prisma.tour.count({
      where: { categoryId: params.id },
    })

    if (toursCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete category. It has ${toursCount} tours associated with it.` },
        { status: 400 },
      )
    }

    // Delete category
    await prisma.category.delete({
      where: {
        id:params.id
      }
    })

    return NextResponse.json({
      message: "Category deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting category:", error)
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}
