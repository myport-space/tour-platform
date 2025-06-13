import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Get current date and previous month date for comparisons
    const now = new Date();
    const firstDayCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const firstDaySixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, 1);

    // Get tours statistics
    const totalTours = await prisma.tour.count();
    const activeTours = await prisma.tour.count({
      where: {
        status: "ACTIVE",
      },
    });
    const upcomingTours :any = []
    const completedTours = await prisma.tour.count({
      where: {
        status: "COMPLETED",
      },
    });

    // Get revenue statistics
    const totalRevenueResult = await prisma.booking.aggregate({
        _sum:{
            paidAmount:true
        }
    })
    const totalRevenue = totalRevenueResult._sum.paidAmount || 0;

    const currentMonthRevenueResult = await prisma.booking.aggregate({
      _sum: {
        paidAmount: true,
      },
      where: {
        createdAt: {
          gte: firstDayCurrentMonth,
        },
      },
    });
    const currentMonthRevenue = currentMonthRevenueResult._sum.paidAmount || 0;

    const previousMonthRevenueResult = await prisma.booking.aggregate({
      _sum: {
        paidAmount: true,
      },
      where: {
        createdAt: {
          gte: firstDayPreviousMonth,
          lt: firstDayCurrentMonth,
        },
      },
    });
    const previousMonthRevenue = previousMonthRevenueResult._sum.paidAmount || 0;

    // Calculate monthly growth
    const monthlyGrowth =
      previousMonthRevenue === 0
        ? 100
        : ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;

    // Get traveler statistics
    let _totalTravelers = await prisma.booking.aggregate({
        _sum: {
            seats: true,
        },
    });
    const totalTravelers = _totalTravelers._sum.seats || 0;

    // Get average rating
    const ratingsResult = await prisma.review.aggregate({
      _avg: {
        rating: true,
      },
    });
    const averageRating = ratingsResult._avg.rating || 0;

    // Get monthly data for charts
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
      
      const monthName = monthDate.toLocaleString('default', { month: 'short' });
      
      const monthTours = await prisma.tour.count({
        where: {
          createdAt: {
            gte: monthDate,
            lte: monthEnd,
          },
        },
      });
      
      const monthRevenueResult = await prisma.booking.aggregate({
        _sum: {
          paidAmount: true,
        },
        where: {
          createdAt: {
            gte: monthDate,
            lte: monthEnd,
          },
        },
      });
      const monthRevenue = monthRevenueResult._sum.paidAmount || 0;
      
      const monthTravelers = await prisma.booking.count({
        where: {
          createdAt: {
            gte: monthDate,
            lte: monthEnd,
          },
        },
      });
      
      monthlyData.push({
        month: monthName,
        tours: monthTours,
        revenue: monthRevenue,
        travelers: monthTravelers,
      });
    }

    // Get tour status distribution
    const tourStatusData = [
      { name: "Active", value: activeTours, color: "#10B981" },
      { name: "Upcoming", value: upcomingTours, color: "#3B82F6" },
      { name: "Completed", value: completedTours, color: "#6B7280" },
    ];

    // Get recent tours
    const recentTours = await prisma.tour.findMany({
      take: 4,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        bookings: true,
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    });

    // Format recent tours data
    const formattedRecentTours = recentTours.map((tour) => {
      // Calculate total revenue for this tour
      const tourRevenue = tour.bookings.reduce((sum: number, payment) => sum + payment.paidAmount, 0);
      
      // Calculate average rating
      const ratings = tour.reviews.map((review) => review.rating);
      const avgRating = ratings.length > 0 
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
        : 0;
      
      return {
        id: tour.id,
        title: tour.title,
        location: tour.location,
        status: tour.status,
        travelers: tour.bookings.length,
        departure:new Date(),
        revenue: tourRevenue,
        rating: parseFloat(avgRating.toFixed(1)),
      };
    });

    // Compile all dashboard data
    const dashboardData = {
      stats: {
        totalTours,
        activeTours,
        upcomingTours,
        completedTours,
        totalRevenue,
        totalTravelers,
        averageRating,
        monthlyGrowth,
      },
      monthlyData,
      tourStatusData,
      recentTours: formattedRecentTours,
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("Dashboard data fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
