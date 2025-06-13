import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/payments/stats - Get payment statistics
export async function GET(request: NextRequest) {
  try {
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
    //     _sum: { processingFees: true },
    //   }),
      // Pending amount
      prisma.payment.aggregate({
        where: { status: "PENDING" },
        _sum: { amount: true },
      }),
      // Total transactions count
      prisma.payment.count(),
      // Count by status
      prisma.payment.groupBy({
        by: ["status"],
        orderBy: {
          status: "asc",
        },
        _count: {
          status: true,
        },
        _sum: {
          amount: true,
        },
      }),
      // Count by payment method
      prisma.payment.groupBy({
        by: ["method"],
        orderBy: {
          method: "asc",
        },
        _count: {
          method: true,
        },
        _sum: {
          amount: true,
        },
      }),
      // Recent payments
      prisma.payment.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
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
      }),
    ])

    // Format status counts
    const statusCounts = stats[4].reduce((acc: any, curr) => {
      acc[curr.status] = {
        count: curr?._count,
        amount: curr?._sum.amount || 0,
      }
      return acc
    }, {})

    // Format payment method counts
    const methodCounts = stats[5].reduce((acc: any, curr) => {
      acc[curr.method] = {
        count: curr?._count?.paymentMethod,
        amount: curr._sum.amount || 0,
      }
      return acc
    }, {})

    // Format recent payments
    const recentPayments = stats[6].map((payment) => ({
      id: payment.id,
      amount: payment.amount,
      status: payment.status,
      date: payment.createdAt,
      customer: payment.booking.user.name || "Unknown",
      tour: payment.booking.tour.title,
    }))

    return NextResponse.json({
      totalRevenue: stats[0]._sum.amount || 0,
      totalFees: stats[1]|| 0,
      pendingAmount: stats[2]._sum.amount || 0,
      totalTransactions: stats[3],
      byStatus: statusCounts,
      byMethod: methodCounts,
      recentPayments,
    })
  } catch (error) {
    console.error("Error fetching payment stats:", error)
    return NextResponse.json({ error: "Failed to fetch payment statistics" }, { status: 500 })
  }
}
