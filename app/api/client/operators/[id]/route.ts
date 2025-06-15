import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const operatorId = params.id

    // Fetch operator with all related data
    const operator = await prisma.tourOperator.findUnique({
      where: {
        id: operatorId,
        isPublic: true,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            createdAt: true,
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
            category: {
              select: {
                name: true,
                color: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        teamMembers: {
          select: {
            id: true,
            name: true,
            role: true,
            image: true,
            bio: true,
          },
        },
        certifications: {
          select: {
            id: true,
            name: true,
            year: true,
            organization: true,
            certificateUrl: true,
          },
        },
        gallery: {
          select: {
            id: true,
            url: true,
            caption: true,
            category: true,
          },
        },
        partnerships: {
          select: {
            id: true,
            name: true,
            logo: true,
            description: true,
            website: true,
          },
        },
        awards: {
          select: {
            id: true,
            name: true,
            year: true,
            organization: true,
            description: true,
          },
        },
        sustainabilityInitiatives: {
          select: {
            id: true,
            title: true,
            description: true,
            icon: true,
            impact: true,
          },
        },
        _count: {
          select: {
            tours: true,
          },
        },
      },
    })

    if (!operator) {
      return NextResponse.json(
        {
          success: false,
          error: "Operator not found",
          message: "The requested operator could not be found or is not public",
        },
        { status: 404 },
      )
    }

    // Calculate statistics
    const activeTours = operator.tours.filter((tour) => tour.rating && tour.rating > 0).length
    const totalReviews = operator.tours.reduce((sum, tour) => sum + (tour.totalReviews || 0), 0)
    const totalBookings = operator.tours.reduce((sum, tour) => sum + (tour.totalBookings || 0), 0)
    const avgRating =
      totalReviews > 0
        ? operator.tours.reduce((sum, tour) => sum + (tour.rating || 0) * (tour.totalReviews || 0), 0) / totalReviews
        : 0

    const response = {
      success: true,
      data: {
        operator: {
          id: operator.id,
          companyName: operator.companyName,
          tagline: operator.tagline,
          description: operator.description,
          founded: operator.founded,
          headquarters: operator.headquarters,
          employees: operator.employees,
          operatingRegions: operator.operatingRegions,
          website: operator.website,
          email: operator.email,
          phone: operator.phone,
          address: operator.address,
          socialMedia: operator.socialMedia,
          businessHours: operator.businessHours,
          timezone: operator.timezone,
          emergencyContact: operator.emergencyContact,
          logo: operator.logo,
          coverImage: operator.coverImage,
          sustainabilityScore: operator.sustainabilityScore,
          safetyRecord: operator.safetyRecord,
          communityImpact: operator.communityImpact,
          customerSatisfaction: operator.customerSatisfaction,
          licenseNumber: operator.licenseNumber,
          createdAt: operator.createdAt,
          updatedAt: operator.updatedAt,
          user: operator.user,
          tours: operator.tours,
          teamMembers: operator.teamMembers,
          certifications: operator.certifications,
          gallery: operator.gallery,
          partnerships: operator.partnerships,
          awards: operator.awards,
          sustainabilityInitiatives: operator.sustainabilityInitiatives,
          stats: {
            totalTours: operator._count.tours,
            activeTours,
            totalReviews,
            totalBookings,
            averageRating: Math.round(avgRating * 10) / 10,
            joinedDate: operator.createdAt,
          },
        },
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching operator details:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch operator details",
        message: "An error occurred while fetching operator details",
      },
      { status: 500 },
    )
  }
}
