import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { verifyToken } from "@/lib/auth"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
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

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || "all"
    const tourId = searchParams.get("tourId") || "all"
    
    // Build where clause
    const where: any = {
       tour: {
        operator:{
          userId:payload.id
        } , // Only get spots for tours owned by this operator
      },
    }

    if (search) {
      where.OR = [
        { spotName: { contains: search, mode: "insensitive" } },
        { tour: { title: { contains: search, mode: "insensitive" } } },
        { tour: { location: { contains: search, mode: "insensitive" } } },
      ]
    }

    if (tourId !== "all") {
      where.tourId = Number.parseInt(tourId)
    }

    // Fetch spots with related data
    const spots = await prisma.spot.findMany({
      where,
      include: {
        tour: {
          select: {
            id: true,
            title: true,
            location: true,
          },
        },
        bookings: {
          include: {
            travelers:true,
            tour:true,
            customer: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        departureDate: "asc",
      },
    })

    


    // Transform data for frontend
    const transformedSpots = spots.map((spot:any) => {
      const bookedSeats = spot.bookings.reduce((sum:any, booking:any) => sum + (booking.seats || 1), 0)
      const actualTravelers = spot.bookings.reduce((sum:any, booking:any) => sum + booking.travelers, 0)
      const availableSeats = spot.maxSeats - bookedSeats

      // Determine status based on availability and dates
      let spotStatus = "Available"
      if (availableSeats <= 0) {
        spotStatus = "Full"
      } else if (new Date(spot.departureDate) < new Date()) {
        spotStatus = "Departed"
      }

      return {
        id: spot.id,
        tourId: spot.tourId,
        tourTitle: spot.tour.title,
        tourLocation: spot.tour.location,
        spotName: spot.spotName,
        departureDate: spot.departureDate.toISOString().split("T")[0],
        returnDate: spot.returnDate.toISOString().split("T")[0],
        maxSeats: spot.maxSeats,
        bookedSeats,
        actualTravelers,
        availableSeats,
        status: spotStatus,
        bookings: spot.bookings.map((booking:any) => ({
          id: booking.id,
          customerId: booking.customer.id,
          customerName: booking.customer.name,
          customerEmail: booking.customer.email,
          travelers: booking.travelers,
          seats: booking.seats || 1,
          status: booking.status,
          bookingDate: booking.createdAt,
        })),
      }
    })

    // Filter by status after transformation
    const filteredSpots =
      status === "all"
        ? transformedSpots
        : transformedSpots.filter((spot: { status: string }) => spot.status.toLowerCase() === status.toLowerCase())

    
    return NextResponse.json({
      spots: filteredSpots,
      total: filteredSpots.length,
    })
  } catch (error) {
    console.error("Error fetching tour spots:", error)
    return NextResponse.json({ error: "Failed to fetch tour spots" }, { status: 500 })
  }
}
