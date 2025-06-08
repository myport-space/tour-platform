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

    // Build where clause
    const where: any = {
      operator:{
              userId:payload.id
          }
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }
    

    // Fetch categories with tour counts and revenue
    const categories = await prisma.category.findMany({
      where,
      include: {
        tours: {
          include: {
            spots: {
              include: {
                bookings: true,
              },
            },
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    })

    // Transform data for frontend
    const transformedCategories = categories.map((category) => {
      const tourCount = category.tours.length
      const totalBookings = category.tours.reduce(
        (sum, tour) => sum + tour.spots.reduce((spotSum, spot) => spotSum + spot.bookings.length, 0),
        0,
      )
      const revenue = category.tours.reduce(
        (sum, tour) =>
          sum +
          tour.spots.reduce(
            (spotSum, spot) =>
              spotSum + spot.bookings.reduce((bookingSum, booking) => bookingSum + booking.totalAmount, 0),
            0,
          ),
        0,
      )

      return {
        id: category.id,
        name: category.name,
        description: category.description,
        color: category.color,
        tourCount,
        totalBookings,
        revenue,
        isActive: category.isActive,
      }
    })

    return NextResponse.json({
      categories: transformedCategories,
      total: transformedCategories.length,
    })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

    // Create category
    const category = await prisma.category.create({
      data: {
        operator:{
          connect:{
            userId:payload.id
          }
        },
        name,
        description,
        color: color || "#10B981",
        isActive: true,
      },
    })

    return NextResponse.json({
      message: "Category created successfully",
      category: {
        id: category.id,
        name: category.name,
        description: category.description,
        color: category.color,
        tourCount: 0,
        totalBookings: 0,
        revenue: 0,
        isActive: category.isActive,
      },
    })
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}
