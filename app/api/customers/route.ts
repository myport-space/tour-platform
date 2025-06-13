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
    if (!payload || payload.role !== "OPERATOR") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = payload.id

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || "all"

     

    // Fetch customers with their bookings
    const customers = await prisma.customerUser.findMany({
      where: {
        AND:[
          {
            bookings:{
              some:{
                spot:{
                  tour:{
                    operator:{
                      userId:userId
                    }
                  }
                }
              }
            },
            OR:[
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
              { phone: { contains: search, mode: "insensitive" } },
            ]
          }
        ]
      },
      include: {
        bookings: {
          include: {
            spot: {
              include: {
                tour: {
                  include: {
                    category: true,
                  },
                },
              },
            },
          },
          where: {
            spot: {
              tour: {
                operator:{
                    userId
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // Transform data for frontend
    const transformedCustomers = customers.map((customer) => {
      const totalBookings = customer.bookings.length
      const totalSpent = customer.bookings.reduce((sum, booking) => sum + booking.totalAmount, 0)
      const lastBooking =
        customer.bookings.length > 0
          ? customer.bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
              .createdAt
          : null

      // Determine customer status
      let customerStatus = "New"
      const lastBookingDate = lastBooking ? new Date(lastBooking) : null
      const threeMonthsAgo = new Date()
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
      const sixMonthsAgo = new Date()
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

      if (totalBookings >= 4 || totalSpent >= 10000) {
        customerStatus = "VIP"
      } else if (lastBookingDate && lastBookingDate > threeMonthsAgo) {
        customerStatus = "Active"
      } else if (lastBookingDate && lastBookingDate < sixMonthsAgo) {
        customerStatus = "Inactive"
      } else if (totalBookings === 1) {
        customerStatus = "New"
      } else {
        customerStatus = "Active"
      }

      // Get preferred categories
      const categoryCount: { [key: string]: number } = {}
      customer.bookings.forEach((booking) => {
        const categoryName = booking?.spot?.tour.category.name || ""
        categoryCount[categoryName] = (categoryCount[categoryName] || 0) + 1
      })
      const preferredCategories = Object.entries(categoryCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([category]) => category)

      return {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone || "",
        avatar: customer.avatar || `/placeholder.svg?height=40&width=40`,
        location:  "Not specified",// customer.address
        joinDate: customer.createdAt.toISOString().split("T")[0],
        totalBookings,
        totalSpent,
        lastBooking: lastBooking ? new Date(lastBooking).toISOString().split("T")[0] : null,
        status: customerStatus,
        rating: 4.5 + Math.random() * 0.5, // Mock rating for now
        preferredCategories,
      }
    })

    // Apply status filter
    const filteredCustomers =
      status === "all"
        ? transformedCustomers
        : transformedCustomers.filter((customer) => customer.status.toLowerCase() === status.toLowerCase())

    // Calculate statistics
    const stats = {
      totalCustomers: transformedCustomers.length,
      activeCustomers: transformedCustomers.filter((c) => c.status === "Active").length,
      vipCustomers: transformedCustomers.filter((c) => c.status === "VIP").length,
      avgCustomerValue:
        transformedCustomers.length > 0
          ? Math.round(transformedCustomers.reduce((sum, c) => sum + c.totalSpent, 0) / transformedCustomers.length)
          : 0,
    }

    return NextResponse.json({
      customers: filteredCustomers,
      stats,
    })
  } catch (error) {
    console.error("Error fetching customers:", error)
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 })
  }
}
