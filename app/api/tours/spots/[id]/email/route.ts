import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { verifyToken } from "@/lib/auth"

const prisma = new PrismaClient()

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const spotId = params.id
    const { subject, message, recipients } = await request.json()

    // Verify spot belongs to operator
    const spot = await prisma.spot.findFirst({
      where: {
        id: spotId,
        tour: {
          operatorId: payload.userId,
        },
      },
      include: {
        tour: true,
        bookings: {
          include: {
            customer: true,
          },
        },
      },
    })

    if (!spot) {
      return NextResponse.json({ error: "Spot not found" }, { status: 404 })
    }

    // Get recipient emails
    let emails = []
    if (recipients === "all") {
      emails = spot.bookings.map((booking:any) => booking.user.email)
    } else if (Array.isArray(recipients)) {
      emails = recipients
    }

    // Here you would integrate with your email service (SendGrid, Resend, etc.)
    // For now, we'll just log the email details
    console.log("Sending email:", {
      to: emails,
      subject,
      message,
      spotName: spot.name,
      tourTitle: spot.tour.title,
    })

    // Simulate email sending
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      message: `Email sent to ${emails.length} recipients`,
      recipients: emails.length,
    })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
