import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { verifyToken } from "@/lib/auth"

const prisma = new PrismaClient()

// Get single spot details
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const spotId = params.id
    const spot = await prisma.spot.findFirst({
      where: {
        id: spotId,
        tour: {
          operatorId: payload.userId,
        },
      },
      include: {
        tour: true,
        bookings: {
          include: {
            customer: true,
          },
        },
      },
    })

    if (!spot) {
      return NextResponse.json({ error: "Spot not found" }, { status: 404 })
    }

    return NextResponse.json({ spot })
  } catch (error) {
    console.error("Error fetching spot:", error)
    return NextResponse.json({ error: "Failed to fetch spot" }, { status: 500 })
  }
}

// Update spot
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const spotId = params.id
    const body = await request.json()

    // Verify spot belongs to operator
    const existingSpot = await prisma.spot.findFirst({
      where: {
        id: spotId,
        tour: {
          operatorId: payload.userId,
        },
      },
    })

    if (!existingSpot) {
      return NextResponse.json({ error: "Spot not found" }, { status: 404 })
    }

    const updatedSpot = await prisma.spot.update({
      where: { id: spotId },
      data: {
        name: body.spotName,
        departureDate: new Date(body.departureDate),
        returnDate: new Date(body.returnDate),
        maxSeats: Number.parseInt(body.maxSeats),
      },
    })

    return NextResponse.json({ spot: updatedSpot })
  } catch (error) {
    console.error("Error updating spot:", error)
    return NextResponse.json({ error: "Failed to update spot" }, { status: 500 })
  }
}

// Delete spot
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const spotId =params.id

    // Verify spot belongs to operator and check for bookings
    const spot = await prisma.spot.findFirst({
      where: {
        id: spotId,
        tour: {
          operatorId: payload.userId,
        },
      },
      include: {
        bookings: true,
      },
    })

    if (!spot) {
      return NextResponse.json({ error: "Spot not found" }, { status: 404 })
    }

    if (spot.bookings.length > 0) {
      return NextResponse.json(
        {
          error: "Cannot delete spot with existing bookings",
        },
        { status: 400 },
      )
    }

    await prisma.spot.delete({
      where: { id: spotId },
    })

    return NextResponse.json({ message: "Spot deleted successfully" })
  } catch (error) {
    console.error("Error deleting spot:", error)
    return NextResponse.json({ error: "Failed to delete spot" }, { status: 500 })
  }
}
