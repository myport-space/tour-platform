import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Query parameters
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const location = searchParams.get("location")
    const search = searchParams.get("search")
    const sortBy = searchParams.get("sortBy") || "createdAt"
    const sortOrder = searchParams.get("sortOrder") || "desc"

    // Build where clause
    const where: any = {
      isPublic: true,
    }

    if (location) {
      where.OR = [
        { headquarters: { contains: location, mode: "insensitive" } },
        { operatingRegions: { has: location } },
        { address: { contains: location, mode: "insensitive" } },
      ]
    }

    if (search) {
      where.OR = [
        { companyName: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { tagline: { contains: search, mode: "insensitive" } },
      ]
    }

    // Calculate offset
    const offset = (page - 1) * limit

    // Fetch operators with related data
    const [operators, totalCount] = await Promise.all([
      prisma.tourOperator.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          tours: {
            where: {
              status: "ACTIVE",
              isPublished: true,
            },
            select: {
              id: true,
              title: true,
              price: true,
              images: true,
              rating: true,
              totalReviews: true,
              totalBookings: true,
              category: {
                select: {
                  name: true,
                },
              },
            },
            take: 3,
            orderBy: {
              isFeatured: "desc",
            },
          },
          _count: {
            select: {
              tours: true,
            },
          },
        },
        orderBy: {
          [sortBy]: sortOrder as "asc" | "desc",
        },
        skip: offset,
        take: limit,
      }),
      prisma.tourOperator.count({ where }),
    ])

    // Transform data for client
    const transformedOperators = operators.map((operator) => {
      const totalReviews = operator.tours.reduce((sum, tour) => sum + (tour.totalReviews || 0), 0)
      const totalBookings = operator.tours.reduce((sum, tour) => sum + (tour.totalBookings || 0), 0)
      const avgRating =
        totalReviews > 0
          ? operator.tours.reduce((sum, tour) => sum + (tour.rating || 0) * (tour.totalReviews || 0), 0) / totalReviews
          : 0

      return {
        id: operator.id,
        companyName: operator.companyName,
        tagline: operator.tagline,
        description: operator.description,
        headquarters: operator.headquarters,
        operatingRegions: operator.operatingRegions,
        logo: operator.logo,
        sustainabilityScore: operator.sustainabilityScore,
        safetyRecord: operator.safetyRecord,
        customerSatisfaction: operator.customerSatisfaction,
        createdAt: operator.createdAt,
        user: operator.user,
        tours: operator.tours,
        stats: {
          totalTours: operator._count.tours,
          activeTours: operator.tours.length,
          totalReviews,
          totalBookings,
          averageRating: Math.round(avgRating * 10) / 10,
          joinedDate: operator.createdAt,
        },
      }
    })

    // Get available filters
    const [locations, operatingRegions] = await Promise.all([
      prisma.tourOperator.findMany({
        where: { isPublic: true },
        select: { headquarters: true },
        distinct: ["headquarters"],
      }),
      prisma.tourOperator.findMany({
        where: { isPublic: true },
        select: { operatingRegions: true },
      }),
    ])

    // Flatten operating regions
    const allRegions = operatingRegions.flatMap((op) => op.operatingRegions).filter(Boolean)
    const uniqueRegions = [...new Set(allRegions)]

    const response = {
      success: true,
      data: {
        operators: transformedOperators,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          totalItems: totalCount,
          itemsPerPage: limit,
          hasNextPage: page < Math.ceil(totalCount / limit),
          hasPreviousPage: page > 1,
        },
        filters: {
          locations: locations.map((l) => l.headquarters).filter(Boolean),
          operatingRegions: uniqueRegions,
        },
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching operators:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch operators",
        message: "An error occurred while fetching operators",
      },
      { status: 500 },
    )
  }
}
