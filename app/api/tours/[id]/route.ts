import { verifyToken } from "@/lib/auth"
import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

    let tour = await prisma.tour.findFirst({
        where:{
            AND:[
                {id:params.id},
                {operator:{
                    userId:payload.id
                }}
            ]
        },
        include:{
            spots:{
                include:{
                    bookings:{
                        include:{
                            customer:true,
                            travelers:true,
                            payments:true,
                        }
                    }
                }
            },
            accommodations:true,
            bookings:true,
            category:true,
            
            itinerary:true,
            reviews:true,
            transportation:true,
            operator:true
        }
    })

    const tourStats = {
        totalBookings: tour?.bookings?.length || 0,
        totalTravelers: tour?.spots.reduce((sum,b)=>sum + (b.bookedSeats||0),0) ||0,
        totalRevenue: tour?.bookings?.reduce((sum, b) => sum + (b.paidAmount || 0), 0) || 0,
        totalSpots: tour?.spots?.length || 0,
    };

    return NextResponse.json({
        message: "This is a placeholder for GET request",
        data:{
            ...tour,
            stats:tourStats
        }
    })

  }
    catch (error) {
         console.error("Error updating category:", error)
           return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
        
    }
}