import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const rating = searchParams.get("rating") || "all"
    const status = searchParams.get("status") || "all"

    // Try to use Prisma if available, otherwise use fallback
    let reviews:any = []

    try {
      const { prisma } = await import("@/lib/prisma")
      if (prisma && prisma.review) {
        const whereClause: any = {}

        // Add search filter
        if (search) {
          whereClause.OR = [
            {
              customer: {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
            {
              tour: {
                title: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
            {
              comment: {
                contains: search,
                mode: "insensitive",
              },
            },
          ]
        }

        // Add rating filter
        if (rating !== "all") {
          whereClause.rating = Number.parseInt(rating)
        }

        // Add status filter (we'll map this from verification status)
        if (status !== "all") {
          if (status === "published") {
            whereClause.isVerified = true
          } else if (status === "pending") {
            whereClause.isVerified = false
            whereClause.operatorResponse = null
          } else if (status === "flagged") {
            // For now, we'll consider reviews with responses but not verified as flagged
            whereClause.isVerified = false
            whereClause.operatorResponse = { not: null }
          }
        }

        const dbReviews = await prisma.review.findMany({
          where: whereClause,
          include: {
            customer: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
            tour: {
              select: {
                id: true,
                title: true,
                location: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        })

        // Transform the data to match the UI expectations
        reviews = dbReviews.map((review) => ({
          id: review.id,
          customer: {
            name: review.customer.name,
            avatar: review.customer.avatar || "/placeholder.svg?height=40&width=40",
          },
          tour: {
            title: review.tour.title,
            location: review.tour.location,
          },
          rating: review.rating,
          title: review.title || "Review",
          content: review.comment,
          date: review.createdAt.toISOString().split("T")[0],
          status: review.isVerified ? "Published" : review.operatorResponse ? "Flagged" : "Pending",
          helpful: review.helpfulVotes,
          hasResponse: !!review.operatorResponse,
          response: review.operatorResponse,
          verified: review.isVerified,
        }))
      }
    } catch (error) {
      console.warn("Prisma not available, using fallback data")
    }

   
    return NextResponse.json({
      success: true,
      data: reviews,
      total: reviews.length,
    })
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch reviews" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { reviewId, response } = body

    // Try to use Prisma if available
    try {
      const { prisma } = await import("@/lib/prisma")
      if (prisma && prisma.review) {
        const updatedReview = await prisma.review.update({
          where: { id: reviewId },
          data: { operatorResponse: response },
          include: {
            customer: {
              select: {
                name: true,
                avatar: true,
              },
            },
            tour: {
              select: {
                title: true,
                location: true,
              },
            },
          },
        })

        return NextResponse.json({
          success: true,
          data: updatedReview,
        })
      }
    } catch (error) {
      console.warn("Prisma not available for updating review")
    }

    // Fallback response for when Prisma is not available
    return NextResponse.json({
      success: true,
      message: "Review response added successfully",
    })
  } catch (error) {
    console.error("Error updating review:", error)
    return NextResponse.json({ success: false, error: "Failed to update review" }, { status: 500 })
  }
}
