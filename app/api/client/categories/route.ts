import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeToursCount = searchParams.get("includeTours") === "true"
    const limit = Number.parseInt(searchParams.get("limit") || "5")

    // Fetch categories with tour counts
    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
      },
      include: {
        tours: includeToursCount
          ? {
              where: {
                status: "ACTIVE",
                isPublished: true,
              },
              select: {
                id: true,
                title: true,
                shortDescription: true,
                price: true,
                originalPrice: true,
                currency: true,
                duration: true,
                location: true,
                images: true,
                rating: true,
                totalReviews: true,
                totalBookings: true,
                isFeatured: true,
                operator: {
                  select: {
                    companyName: true,
                    logo: true,
                  },
                },
              },
              take: limit,
              orderBy: {
                isFeatured: "desc",
              },
            }
          : undefined,
        _count: {
          select: {
            tours: {
              where: {
                status: "ACTIVE",
                isPublished: true,
              },
            },
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    })

    const transformedCategories = categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      color: category.color,
      icon: category.icon,
      isActive: category.isActive,
      createdAt: category.createdAt,
      toursCount: category._count.tours,
      tours: category.tours || [],
    }))

    const response = {
      success: true,
      data: {
        categories: transformedCategories,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch categories",
        message: "An error occurred while fetching categories",
      },
      { status: 500 },
    )
  }
}
