import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// PUT /api/profile/gallery/[id] - Update gallery item
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const data = await request.json()

    const updatedGalleryItem = await prisma.galleryItem.update({
      where: { id },
      data: {
        url: data.url,
        caption: data.caption,
        category: data.category,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({ message: "Gallery item updated successfully", galleryItem: updatedGalleryItem })
  } catch (error) {
    console.error("Error updating gallery item:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE /api/profile/gallery/[id] - Delete gallery item
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    await prisma.galleryItem.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Gallery item deleted successfully" })
  } catch (error) {
    console.error("Error deleting gallery item:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// GET /api/profile/gallery/[id] - Get specific gallery item
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const galleryItem = await prisma.galleryItem.findUnique({
      where: { id },
    })

    if (!galleryItem) {
      return NextResponse.json({ error: "Gallery item not found" }, { status: 404 })
    }

    return NextResponse.json(galleryItem)
  } catch (error) {
    console.error("Error fetching gallery item:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
