import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const tourId = params.id

    // Fetch tour with all related data
    const tour = await prisma.tour.findUnique({
      where: {
        id: tourId,
        status: "ACTIVE",
        isPublished: true,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            description: true,
            color: true,
            icon: true,
          },
        },
        operator: {
          select: {
            id: true,
            companyName: true,
            tagline: true,
            description: true,
            founded: true,
            headquarters: true,
            employees: true,
            operatingRegions: true,
            website: true,
            email: true,
            phone: true,
            address: true,
            socialMedia: true,
            businessHours: true,
            timezone: true,
            emergencyContact: true,
            logo: true,
            coverImage: true,
            sustainabilityScore: true,
            safetyRecord: true,
            communityImpact: true,
            customerSatisfaction: true,
            licenseNumber: true,
            isPublic: true,
            createdAt: true,
          },
        },
        spots: {
          select: {
            id: true,
            name: true,
            description: true,
            departureDate: true,
            returnDate: true,
            maxSeats: true,
            bookedSeats: true,
            price: true,
            status: true,
          },
          orderBy: {
            departureDate: "asc",
          },
        },
        itinerary: {
          select: {
            id: true,
            day: true,
            title: true,
            description: true,
            activities: true,
            meals: true,
          },
          orderBy: {
            day: "asc",
          },
        },
        accommodations: {
          select: {
            id: true,
            name: true,
            type: true,
            roomType: true,
            description: true,
            address: true,
            checkIn: true,
            checkOut: true,
            nights: true,
            amenities: true,
            images: true,
          },
        },
        transportation: {
          select: {
            id: true,
            type: true,
            description: true,
            departure: true,
            arrival: true,
            duration: true,
            details: true,
          },
        },
        reviews: {
          include: {
            customer: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },
        bookings: {
          where: {
            status: "CONFIRMED",
          },
          select: {
            id: true,
            bookingNumber: true,
            totalAmount: true,
            seats: true,
            createdAt: true,
          },
        },
        _count: {
          select: {
            bookings: true,
            reviews: true,
          },
        },
      },
    })

    if (!tour) {
      return NextResponse.json(
        {
          success: false,
          error: "Tour not found",
          message: "The requested tour could not be found or is not active",
        },
        { status: 404 },
      )
    }

    // Calculate statistics
    const totalBookings = tour._count.bookings
    const totalReviews = tour._count.reviews
    const avgRating = totalReviews > 0 ? tour.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews : 0

    // Get rating distribution
    const ratingDistribution = {
      5: tour.reviews.filter((r) => r.rating === 5).length,
      4: tour.reviews.filter((r) => r.rating === 4).length,
      3: tour.reviews.filter((r) => r.rating === 3).length,
      2: tour.reviews.filter((r) => r.rating === 2).length,
      1: tour.reviews.filter((r) => r.rating === 1).length,
    }

    // Transform reviews
    const transformedReviews = tour.reviews.map((review) => ({
      id: review.id,
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      isVerified: review.isVerified,
      isRecommended: review.isRecommended,
      helpfulVotes: review.helpfulVotes,
      operatorResponse: review.operatorResponse,
      createdAt: review.createdAt,
      reviewer: {
        id: review.customer?.id,
        name: review.customer?.name || "Anonymous",
        avatar: review.customer?.avatar,
      },
    }))

    const response = {
      success: true,
      data: {
        tour: {
          id: tour.id,
          title: tour.title,
          description: tour.description,
          shortDescription: tour.shortDescription,
          location: tour.location,
          duration: tour.duration,
          stayNights: tour.stayNights,
          tourType: tour.tourType,
          originCountry: tour.originCountry,
          destinationCountry: tour.destinationCountry,
          price: tour.price,
          originalPrice: tour.originalPrice,
          currency: tour.currency,
          maxGroupSize: tour.maxGroupSize,
          minAge: tour.minAge,
          maxAge: tour.maxAge,
          difficulty: tour.difficulty,
          highlights: tour.highlights,
          inclusions: tour.inclusions,
          exclusions: tour.exclusions,
          requirements: tour.requirements,
          restrictions: tour.restrictions,
          images: tour.images,
          videoUrl: tour.videoUrl,
          status: tour.status,
          isPublished: tour.isPublished,
          isFeatured: tour.isFeatured,
          rating: tour.rating,
          totalReviews: tour.totalReviews,
          totalBookings: tour.totalBookings,
          createdAt: tour.createdAt,
          updatedAt: tour.updatedAt,
          category: tour.category,
          operator: tour.operator,
          spots: tour.spots,
          itinerary: tour.itinerary,
          accommodations: tour.accommodations,
          transportation: tour.transportation,
          reviews: transformedReviews,
          stats: {
            totalBookings,
            totalReviews,
            averageRating: Math.round(avgRating * 10) / 10,
            ratingDistribution,
            activeBookings: tour.bookings.length,
            completionRate: totalBookings > 0 ? Math.round((tour.bookings.length / totalBookings) * 100) : 0,
          },
        },
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching tour details:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch tour details",
        message: "An error occurred while fetching tour details",
      },
      { status: 500 },
    )
  }
}
