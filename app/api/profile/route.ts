import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyToken } from "@/lib/auth"
// GET /api/profile - Get operator profile
export async function GET(request: NextRequest) {
  try {
    // In a real app, you'd get the user ID from the JWT token
     const token = request.cookies.get("auth-token")?.value
        if (!token) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
    
        const payload = await verifyToken(token)
        if (!payload) {
          return NextResponse.json({ error: "Invalid token" }, { status: 401 })
        }
    
    const profile = await prisma.tourOperator.findFirst({
      where: { 
        userId:payload.id
       },
      include: {
        teamMembers: {
          orderBy: { createdAt: 'asc' }
        },
        certifications: {
          orderBy: { year: 'desc' }
        },
        gallery: {
          orderBy: { createdAt: 'desc' }
        },
        partnerships: {
          orderBy: { startDate: 'desc' }
        },
        awards: {
          orderBy: { year: 'desc' }
        },
        sustainabilityInitiatives: {
          orderBy: { startDate: 'desc' }
        },
      },
    })

    if (!profile) {
      // Create a default profile if none exists
      const defaultProfile = await prisma.tourOperator.create({
        data: {
          userId:payload.id,
          companyName: "Your Tour Company",
          tagline: "Amazing adventures await",
          description: "We provide unforgettable tour experiences",
          founded: new Date().getFullYear().toString(),
          headquarters: "",
          employees: 1,
          operatingRegions: [],
          website: "",
          email: "",
          phone: "",
          address: "",
          socialMedia: {},
          businessHours: {
            monday: "9:00-17:00",
            tuesday: "9:00-17:00",
            wednesday: "9:00-17:00",
            thursday: "9:00-17:00",
            friday: "9:00-17:00",
            saturday: "Closed",
            sunday: "Closed"
          },
          timezone: "UTC",
          emergencyContact: "",
          sustainabilityScore: 0,
          safetyRecord: 0,
          communityImpact: 0,
          customerSatisfaction: 0,
        },
        include: {
          teamMembers: true,
          certifications: true,
          gallery: true,
          partnerships: true,
          awards: true,
          sustainabilityInitiatives: true,
        },
      })
      return NextResponse.json(defaultProfile)
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error("Error fetching profile:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT /api/profile - Update operator profile
export async function PUT(request: NextRequest) {
  try {
     const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }
  // This should come from authentication
    const data = await request.json()

    const updatedProfile = await prisma.tourOperator.upsert({
      where: { userId:payload.id },
      update: {
        companyName: data.companyName,
        tagline: data.tagline,
        description: data.description,
        founded: data.founded,
        headquarters: data.headquarters,
        employees: data.employees,
        operatingRegions: data.operatingRegions || [],
        website: data.website,
        email: data.email,
        phone: data.phone,
        address: data.address,
        socialMedia: data.socialMedia || {},
        businessHours: data.businessHours || {},
        timezone: data.timezone,
        emergencyContact: data.emergencyContact,
        logo: data.logo,
        coverImage: data.coverImage,
        sustainabilityScore: data.sustainabilityScore,
        safetyRecord: data.safetyRecord,
        communityImpact: data.communityImpact,
        customerSatisfaction: data.customerSatisfaction,
        licenseNumber: data.licenseNumber,
        isPublic: data.isPublic ?? true,
        allowSearchIndexing: data.allowSearchIndexing ?? true,
        allowContactForm: data.allowContactForm ?? true,
        updatedAt: new Date(),
      },
      create: {
        userId:payload.id,
        companyName: data.companyName || "Your Tour Company",
        tagline: data.tagline,
        description: data.description,
        founded: data.founded,
        headquarters: data.headquarters,
        employees: data.employees || 1,
        operatingRegions: data.operatingRegions || [],
        website: data.website,
        email: data.email,
        phone: data.phone,
        address: data.address,
        socialMedia: data.socialMedia || {},
        businessHours: data.businessHours || {},
        timezone: data.timezone,
        emergencyContact: data.emergencyContact,
        logo: data.logo,
        coverImage: data.coverImage,
        sustainabilityScore: data.sustainabilityScore || 0,
        safetyRecord: data.safetyRecord || 0,
        communityImpact: data.communityImpact || 0,
        customerSatisfaction: data.customerSatisfaction || 0,
        licenseNumber: data.licenseNumber,
        isPublic: data.isPublic ?? true,
        allowSearchIndexing: data.allowSearchIndexing ?? true,
        allowContactForm: data.allowContactForm ?? true,
      },
    })

    return NextResponse.json({ message: "Profile updated successfully", profile: updatedProfile })
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
