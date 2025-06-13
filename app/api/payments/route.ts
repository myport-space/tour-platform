import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/payments - List all payments with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || undefined
    const method = searchParams.get("method") || undefined
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Build filter conditions
    const where: any = {}

    // Status filter
    if (status && status !== "all") {
      where.status = status
    }

    // Method filter
    if (method && method !== "all") {
      where.paymentMethod = {
        contains: method,
        mode: "insensitive",
      }
    }

    // Search filter (across multiple fields)
    if (search) {
      where.OR = [
        { id: { contains: search, mode: "insensitive" } },
        { transactionId: { contains: search, mode: "insensitive" } },
        { booking: { tour: { title: { contains: search, mode: "insensitive" } } } },
        { booking: { user: { name: { contains: search, mode: "insensitive" } } } },
        { booking: { user: { email: { contains: search, mode: "insensitive" } } } },
      ]
    }

    // Get payments with pagination
    const payments = await prisma.payment.findMany({
      where,
      include: {
        booking: {
          include: {
            customer: true,
            tour: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    })

    // Get total count for pagination
    const total = await prisma.payment.count({ where })

    // Calculate statistics
    const stats = await prisma.$transaction([
      // Total revenue (completed payments)
      prisma.payment.aggregate({
        where: { status: "COMPLETED" },
        _sum: { amount: true },
      }),
      // Processing fees (completed payments)
    //   prisma.payment.aggregate({
    //     where: { status: "COMPLETED" },
    //     _sum: { amount: true },
    //   }),
      // Pending amount
      prisma.payment.aggregate({
        where: { status: "PENDING" },
        _sum: { amount: true },
      }),
      // Total transactions count
      prisma.payment.count(),
    ])

    // Format the response
    const formattedPayments = payments.map((payment) => ({
      id: payment.id,
      transactionId: payment.transactionId || "",
      customer: {
        name: payment.booking.customer.name || "Unknown",
        email: payment.booking.customer.email,
        avatar: "/placeholder.svg?height=40&width=40", // Placeholder for now
      },
      booking: {
        id: payment.booking.id,
        tour: payment.booking.tour.title,
      },
      amount: payment.amount,
      method: payment.method,
      status: payment.status.charAt(0).toUpperCase() + payment.status.slice(1), // Capitalize first letter
      date: payment.createdAt
        ? new Date(payment.createdAt).toISOString().split("T")[0]
        : new Date(payment.createdAt).toISOString().split("T")[0],
      processingFee:  0,
      netAmount: payment.amount - ( 0),
      currency: payment.currency,
      gateway: payment.method, // Using payment method as gateway for now
    }))

    return NextResponse.json({
      payments: formattedPayments,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        totalRevenue: stats[0]._sum.amount || 0,
        totalFees: stats[1]._sum.amount || 0,
        pendingAmount: stats[1]._sum.amount || 0,
        totalTransactions: stats[2],
      },
    })
  } catch (error) {
    console.error("Error fetching payments:", error)
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 })
  }
}

// POST /api/payments - Create a new payment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.bookingId || !body.amount || !body.paymentMethod) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create payment
    const payment = await prisma.payment.create({
      data: {
        bookingId: body.bookingId,
        amount: body.amount,
        currency: body.currency || "USD",
        method: body.paymentMethod,
        transactionId: body.transactionId,
        status: body.status || "pending",
        createdAt: body.paymentDate ? new Date(body.paymentDate) : undefined,
        customerId:body.customerId
      },
    })

    // If payment is completed, update booking payment status
    if (payment.status === "COMPLETED") {
      await prisma.booking.update({
        where: { id: body.bookingId },
        data: { status: "CONFIRMED" },
      })
    }

    return NextResponse.json(payment)
  } catch (error) {
    console.error("Error creating payment:", error)
    return NextResponse.json({ error: "Failed to create payment" }, { status: 500 })
  }
}
