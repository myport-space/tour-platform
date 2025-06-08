import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyToken } from "@/lib/auth"
import { TourStatus } from "@prisma/client"

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload || payload.role !== "OPERATOR") {
      return NextResponse.json({ error: "Unauthorized - Operator access required" }, { status: 401 })
    }

    const body = await request.json()
    const {
      // Basic Info
      title,
      description,
      location,
      tourType,
      categoryId,
      duration,
      groupSize,
      difficulty,
      highlights,
      originCountry,
      destinationCountry,

      // Spots
      tourSpots,

      // Images
      images,

      // Itinerary
      itinerary,

      // Inclusions
      included,
      notIncluded,
      restrictions,

      // Transport
      transportToDestination,
      localTransport,

       
      // Pricing
      currentPrice,
      originalPrice,
      currency, 
    } = body

    // Validate required fields
    if (!title || !description || !location || !duration || !currentPrice) {
      return NextResponse.json(
        { error: "Missing required fields: title, description, location, duration, currentPrice" },
        { status: 400 },
      )
    }

    // Get operator ID from user
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      include: { operator: true },
    })

    if (!user || !user.operator) {
      return NextResponse.json({ error: "Operator profile not found" }, { status: 404 })
    }

    // Create the tour with all related data
    const tourData = {
      title,
      description,
      shortDescription: description.substring(0, 200),
      location: `${location}, ${destinationCountry || ""}`.trim(),
      duration,
      images,
      price: Number.parseFloat(currentPrice),
      originalPrice: originalPrice ? Number.parseFloat(originalPrice) : null,
      currency: currency || "USD",
      maxGroupSize: Number.parseInt(groupSize) || 20,
      difficulty: difficulty || "moderate",
      highlights: highlights || [],
      inclusions: included || [],
      exclusions: notIncluded || [],
      restrictions: restrictions || [],
      status: TourStatus.DRAFT,
      isPublished: false,
      categoryId, // You might want to make this dynamic
      operatorId: user.operator.id,

    }

    // Create the main tour
    const tour = await prisma.tour.create({
        data:{
            ...tourData,
            tourType:"IN_COUNTRY" // jut in development
        }
    })

    // Create tour spots
    if (tourSpots && tourSpots.length > 0) {
      for (const spot of tourSpots) {
        if (spot.departureDate && spot.returnDate) {
          await prisma.spot.create({
            data: {
              name: spot.name || `Spot ${spot.id}`,
              description: `Departure: ${spot.departureDate}, Return: ${spot.returnDate}`,
              departureDate: new Date(spot.departureDate),
              returnDate: new Date(spot.returnDate),
              maxSeats: Number.parseInt(spot.maxSeats) || 8,
              bookedSeats: 0,
              price: tour.price,
              status: "ACTIVE",
              tourId: tour.id,
            },
          })
        }
      }
    }

    // Create itinerary
    if (itinerary && itinerary.length > 0) {
      for (const day of itinerary) {
        if (day.title || day.description) {
          await prisma.itinerary.create({
            data: {
              day: day.day,
              title: day.title || `Day ${day.day}`,
              description: day.description || "",
              activities: day.activities || [],
              meals: [], // Convert meal object to array if needed
              tourId: tour.id,
            },
          })

          // Create accommodation if provided
          if (day.accommodation && day.accommodation.name) {
            await prisma.accommodation.create({
              data: {
                name: day.accommodation.name,
                type: day.accommodation.type.toUpperCase() || "HOTEL",
                roomType: day.accommodation.roomType.toUpperCase() || "DOUBLE",
                description: `Accommodation for Day ${day.day}`,
                nights: 1,
                amenities: [],
                images: [],
                tourId: tour.id,
              },
            })
          }
        }
      }
    }

    // Create transportation records
    if (transportToDestination) {
      await prisma.transportation.create({
        data: {
          type: "PLANE",
          description: transportToDestination.description || "Transportation to destination",
          departure: originCountry || "Origin",
          arrival: destinationCountry || location,
          duration: transportToDestination.duration || "Varies",
          details: transportToDestination.description || "",
          tourId: tour.id,
        },
      })
    }

    if (localTransport) {
      await prisma.transportation.create({
        data: {
          type: "CAR",
          description: localTransport.description || "Local transportation",
          departure: "Various locations",
          arrival: "Tour destinations",
          duration: "As needed",
          details: localTransport.description || "",
          tourId: tour.id,
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: "Tour created successfully",
      tour,
    })
  } catch (error) {
    console.error("Error creating tour:", error)
    return NextResponse.json({ error: "Failed to create tour" }, { status: 500 })
  }
}
