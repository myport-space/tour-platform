import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Query parameters
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const categoryId = searchParams.get("categoryId")
    const location = searchParams.get("location")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const tourType = searchParams.get("tourType")
    const difficulty = searchParams.get("difficulty")
    const search = searchParams.get("search")
    const sortBy = searchParams.get("sortBy") || "createdAt"
    const sortOrder = searchParams.get("sortOrder") || "desc"

    // Build where clause
    const where: any = {
      isPublished: true,
    }

    if (categoryId) {
      where.categoryId = categoryId
    }

    if (location) {
      where.OR = [
        { location: { contains: location, mode: "insensitive" } },
        { title: { contains: location, mode: "insensitive" } },
        { description: { contains: location, mode: "insensitive" } },
      ]
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
      ]
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = Number.parseFloat(minPrice)
      if (maxPrice) where.price.lte = Number.parseFloat(maxPrice)
    }

    if (tourType) {
      where.tourType = tourType
    }

    if (difficulty) {
      where.difficulty = difficulty
    }

    // Calculate offset
    const offset = (page - 1) * limit

    // Fetch tours with related data
    const [tours, totalCount] = await Promise.all([
      prisma.tour.findMany({
        where,
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
              logo: true,
              sustainabilityScore: true,
              safetyRecord: true,
              customerSatisfaction: true,
              isPublic: true,
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
          },
          _count: {
            select: {
              bookings: true,
              reviews: true,
            },
          },
        },
        orderBy: {
          [sortBy]: sortOrder as "asc" | "desc",
        },
        skip: offset,
        take: limit,
      }),
      prisma.tour.count({ where }),
    ])

    // Transform data for client
    const transformedTours = tours.map((tour) => ({
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
      stats: {
        totalBookings: tour._count.bookings,
        totalReviews: tour._count.reviews,
        averageRating: tour.rating || 0,
      },
    }))

    // Get available filters
    const [categories, locations, priceRange] = await Promise.all([
      prisma.category.findMany({
        where: { isActive: true },
        select: {
          id: true,
          name: true,
          description: true,
          color: true,
          icon: true,
        },
      }),
      prisma.tour.findMany({
        where: { status: "ACTIVE", isPublished: true },
        select: { location: true },
        distinct: ["location"],
      }),
      prisma.tour.aggregate({
        where: { status: "ACTIVE", isPublished: true },
        _min: { price: true },
        _max: { price: true },
      }),
    ])

    const response = {
      success: true,
      data: {
        tours: transformedTours,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          totalItems: totalCount,
          itemsPerPage: limit,
          hasNextPage: page < Math.ceil(totalCount / limit),
          hasPreviousPage: page > 1,
        },
        filters: {
          categories: categories,
          locations: locations.map((l) => l.location).filter(Boolean),
          tourTypes: ["IN_COUNTRY", "GLOBAL"],
          difficulties: ["Easy", "Moderate", "Challenging", "Extreme"],
          priceRange: {
            min: priceRange._min.price || 0,
            max: priceRange._max.price || 0,
          },
        },
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching tours:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch tours",
        message: "An error occurred while fetching tours",
      },
      { status: 500 },
    )
  }
}
