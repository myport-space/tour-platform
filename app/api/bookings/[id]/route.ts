import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { verifyToken } from "@/lib/auth"

const prisma = new PrismaClient()

// Get age of travelers 
function getAge(dateOfBirth:any) {
      const dob = new Date(dateOfBirth); // Convert to Date object
      const today = new Date();

      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      const dayDiff = today.getDate() - dob.getDate();

      // Adjust if birthday hasn't occurred yet this year
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }

      return age;
    }


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload || !payload.id) {
      return NextResponse.json({ error: "Invalid authentication token" }, { status: 401 })
    }

    const bookingId = params.id
    if (!bookingId) {
      return NextResponse.json({ error: "Booking ID is required" }, { status: 400 })
    }

    // Get the operator ID from the token
    const operatorId = payload.id
    
    // Fetch the booking with all related data
    const booking = await prisma.booking.findFirst({
      where: {
      
        AND:[
            {  id: bookingId}, 
            {
                spot: {
                    tour: {
                        operator:{
                            userId:operatorId
                        },
                    },
                },
            }
        ]
      },
      include: {
        spot: {
          include: {
            tour: {
              include: {
                category: true,
                itinerary:true,
                accommodations:true
              },
            },
          },
        },
        customer: true,
        travelers: true,
        payments: true, 
      },
    })



    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }


    let paymentStatus = ""
    booking.payments.filter((pym:any)=> paymentStatus=pym.status)
    

    

    // Format the booking data for the frontend
    const formattedBooking = {
      id: booking.id,
      status: booking.status,
      paymentStatus: paymentStatus,
      totalAmount: booking.totalAmount,
      travelersCount: booking.travelers.length,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
      tour: {
        id: booking?.spot?.tour?.id,
        title: booking?.spot?.tour?.title,
        description: booking?.spot?.tour?.description,
        location: booking?.spot?.tour.location,
        duration: `${booking?.spot?.tour.duration} days`,
        startDate: new Date(booking?.spot?.departureDate ?? "").toLocaleDateString(),
        endDate: new Date(
          new Date(booking?.spot?.departureDate ?? "").getTime() //+ booking?.spot?.tour.duration * 24 * 60 * 60 * 1000,
        ).toLocaleDateString(),
        image:
          booking?.spot?.tour.images && booking.spot.tour.images.length > 0
            ? booking?.spot?.tour?.images[0]
            : "/placeholder.svg?height=120&width=160",
        category: booking?.spot?.tour.category?.name || "Uncategorized",
        itinerary: booking?.spot?.tour.itinerary.map((day) => ({
          day: day.day,
          title: day.title,
          description: day.description,
          
        })),
      },
      spot: {
        id: booking?.spot?.id,
        departureDate: new Date(booking?.spot?.departureDate ??"").toLocaleDateString(),
        returnDate: new Date(
          new Date(booking?.spot?.departureDate ??"").getTime() //+ booking.spot.tour.duration * 24 * 60 * 60 * 1000,
        ).toLocaleDateString(),
        totalSeats: booking?.spot?.maxSeats,
        availableSeats: (booking?.spot?.maxSeats??0) - (booking?.spot?.bookedSeats ?? 0),
        price: booking?.spot?.price,
      },
      customer: {
        id: booking.customer.id,
        name: `${booking.customer.name} $`,
        role: "Lead Traveler",
        email: booking.customer.email,
        phone: booking.customer.phone || "Not provided",
        address:  "Not provided",
      },
      emergencyContact: {
        name: booking.customer.name || "Not provided",
        relationship:  "Not provided",
        phone: booking.customer.phone || "Not provided",
      },
      travelers: booking.travelers.map((traveler) => ({
        id: traveler.id,
        name: `${traveler.firstName} ${traveler.lastName}`,
        email:traveler.email,
        phone:traveler.phone,
        nationality:traveler.nationality,
        age: getAge(traveler.dateOfBirth),
        specialRequirements: traveler.dietaryRequirements,
      })),
      payments: booking.payments.map((payment) => ({
        id: payment.id,
        amount: payment.amount,
        method: payment.method,
        transaction: payment.transactionId || "N/A",
        date: new Date(payment.createdAt).toLocaleDateString(),
        status: payment.status,
      })),
      specialRequests: booking?.specialRequests
    }

    return NextResponse.json(formattedBooking)
  } catch (error) {
    console.error("Error fetching booking details:", error)
    return NextResponse.json({ error: "Failed to fetch booking details" }, { status: 500 })
  }
}
