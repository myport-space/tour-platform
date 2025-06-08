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
    const category = searchParams.get("category") || "all"
    const tourType = searchParams.get("tourType") || "all"
    
    
    // Build where clause
    const where: any = {
      operator:{
          userId:payload.id
        }// Only get tours for this operator
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    if (status !== "all") {
      where.status = status.toUpperCase()
    }

    if (category !== "all") {
      where.category = { name: { equals: category, mode: "insensitive" } }
    }

    if (tourType !== "all") {
      where.tourType = tourType.toUpperCase()
    }

    // Fetch tours with related data
    const tours = await prisma.tour.findMany({
      where,
      include: {
        category: true,
        spots: {
          include: {
            bookings: {
              include: {
                customer: {
                  select: {
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
        reviews: true,
        _count: {
          select: {
            spots: true,
            bookings: true,
            reviews: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // Transform data for frontend
    const transformedTours = tours.map((tour) => {
      const totalBookings = tour.spots.reduce((sum, spot) => sum + spot.bookings.length, 0)
      const totalRevenue = tour.spots.reduce(
        (sum, spot) => sum + spot.bookings.reduce((bookingSum, booking) => bookingSum + booking.totalAmount, 0),
        0,
      )
      const averageRating =
        tour.reviews && tour.reviews.length > 0
          ? tour.reviews.reduce((sum, review) => sum + review.rating, 0) / tour.reviews.length
          : 0

      // Ensure duration is a string
      let durationString = "N/A"
      if (typeof tour.duration === "string") {
        durationString = tour.duration
      } else if (typeof tour.duration === "object" && tour.duration !== null) {
        // Handle if duration is stored as JSON object
        const durationObj = tour.duration as any
        if (durationObj.days) {
          durationString = `${durationObj.days} days`
        } else if (durationObj.nights) {
          durationString = `${durationObj.nights} nights`
        }
      } else if (typeof tour.duration === "number") {
        durationString = `${tour.duration} days`
      }

      return {
        id: tour.id,
        title: tour.title || "Untitled Tour",
        description: tour.description || "No description available",
        location: tour.location || "Location TBD",
        tourType: tour.tourType ? tour.tourType.toLowerCase() : "in-country",
        originCountry: tour.originCountry || "N/A",
        destinationCountry: tour.destinationCountry || "N/A",
        category: tour.category?.name || "Uncategorized",
        status: tour.status || "DRAFT",
        duration: durationString,
        stayNights: tour.stayNights || 0,
        price: tour.price || 0,
        maxTravelers: tour.maxGroupSize || 0,
        currentBookings: totalBookings,
        rating: Number(averageRating.toFixed(1)),
        reviews: tour.reviews?.length || 0,
        image: tour.images && tour.images.length > 0 ? tour.images[0] : "/placeholder.svg?height=200&width=300",
        createdAt: tour.createdAt.toISOString().split("T")[0],
        nextDeparture: tour.spots[0]?.departureDate?.toISOString().split("T")[0] || null,
        totalRevenue,
        spotsCount: tour._count.spots,
      }
    })

    return NextResponse.json({
      tours: transformedTours,
      total: transformedTours.length,
    })
  } catch (error) {
    console.error("Error fetching tours:", error)
    return NextResponse.json({ error: "Failed to fetch tours" }, { status: 500 })
  }
}
