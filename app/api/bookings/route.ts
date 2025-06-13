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
    const paymentStatus = searchParams.get("paymentStatus") || "all"
    const dateRange = searchParams.get("dateRange") || "all"

    // Build where clause
    const whereClause: any = {
      spot: {
        tour: {
          operator:{
            userId
          },
        },
      },
    }

    // Add search filter
    if (search) {
      whereClause.OR = [
        { id: { contains: search, mode: "insensitive" } },
        { customerName: { contains: search, mode: "insensitive" } },
        { customerEmail: { contains: search, mode: "insensitive" } },
        { spot: { tour: { title: { contains: search, mode: "insensitive" } } } },
      ]
    }

    // Add status filter
    if (status !== "all") {
      whereClause.status = status.toUpperCase()
    }

    // Add payment status filter
    if (paymentStatus !== "all") {
      whereClause.paymentStatus = paymentStatus.toUpperCase()
    }

    // Add date range filter
    if (dateRange !== "all") {
      const now = new Date()
      const startDate = new Date()

      switch (dateRange) {
        case "today":
          startDate.setHours(0, 0, 0, 0)
          break
        case "week":
          startDate.setDate(now.getDate() - 7)
          break
        case "month":
          startDate.setMonth(now.getMonth() - 1)
          break
      }

      if (dateRange !== "all") {
        whereClause.createdAt = {
          gte: startDate,
        }
      }
    }
   
    
    // Fetch bookings with related data
    const bookings = await prisma.booking.findMany({
    where:whereClause,
      include: {
        customer:true,
        payments:{
            select:{
                status:true
            }
        },
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
      orderBy: {
        createdAt: "desc",
      },
    })
    

     

    // Transform data for frontend
    const transformedBookings = bookings.map((booking) => ({
      id: booking.id,
      tourId: booking.spot?.tour?.id,
      tourTitle: booking.spot?.tour?.title,
      tourLocation: booking.spot?.tour?.location,
      customer: {
        name: booking.customer.name,
        email: booking.customer.email,
        phone: booking.customer.phone || "N/A",
        avatar: `/placeholder.svg?height=40&width=40`,
      },
      travelers: booking.seats || 1,
      totalAmount: booking.totalAmount,
      paidAmount: booking.paidAmount,
      status: booking.status,
      bookingDate: booking.createdAt.toISOString().split("T")[0],
      departureDate: booking.spot?.departureDate ? booking.spot.departureDate.toISOString().split("T")[0] : null,
      specialRequests: booking.specialRequests || null,
      spotId: booking.spotId,
    }))

    // Calculate statistics
    const stats = {
      total: bookings.length,
      confirmed: bookings.filter((b) => b.status === "CONFIRMED").length,
      pending: bookings.filter((b) => b.status === "PENDING").length,
      cancelled: bookings.filter((b) => b.status === "CANCELLED").length,
      totalRevenue: bookings.reduce((sum, b) => sum + (b.paidAmount || 0), 0),
    }

    return NextResponse.json({
      bookings: transformedBookings,
      stats,
    })
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}


export async function POST(request: NextRequest) {
  try {
     // Verify authentication
   
    let booking = await prisma.booking.create({
      data:{
        bookingNumber: `BK-${Date.now()}`,
        seats:2, 
        totalAmount:(1299*2),
        currency:"USD",
        customerId:"cmbtow2ao000lvlcgw1540dpd",
        tourId:"cmbtod7z1000avlcgkdcnwh07",
        spotId:"cmbtod8yl000cvlcgvi2txx6p",
        payments:{
          create:{
            amount: (1299*2),
            currency: "USD", 
            method:"PAYPAL",
            customerId:"cmbtow2ao000lvlcgw1540dpd",
            paymentIntentId:"PY28723",
            transactionId:"TRX123456789",
            status:"COMPLETED",
          }
        },
        paidAmount:(1299*2),
        status:"CONFIRMED",
        specialRequests:"No special requests",
        
        travelers:{
          createMany: {
            data: [
              {
                firstName: "Muhammad",
                lastName: "Ali",
                email: "muhammahdali2098@gmail.com",
                phone: "1234567890",
                dateOfBirth:new Date("2000-01-01"),
                emergencyContact: "+9234567890",
                nationality: "Pakistani",
                passportNumber: "142230298309182"
              },
              {
                firstName: "Hassan",
                lastName: "Abbas",
                email: "abbaskhan@gmail.com",
                phone: "+9273827987",
                dateOfBirth: new Date("1998-05-15"),
                emergencyContact: "+9234567890",
                nationality: "Pakistani",
                passportNumber: "29837918237987s"
              }
            ]
          }
          
        }
        
      }
    })

    // Just for testing,
    const spot = await prisma.spot.update({
      where:{
        id:"cmbtod8yl000cvlcgvi2txx6p",
      },
      data:{
        bookedSeats:2,
      }
    })
    return NextResponse.json({message:"Booking created successfully", booking}, { status: 201 })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
    
  }

}