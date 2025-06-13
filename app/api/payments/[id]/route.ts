import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/payments/[id] - Get a specific payment
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: params.id },
      include: {
        booking: {
          include: {
            customer: true,
            tour: true,
          },
        },
      },
    })

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 })
    }

    // Format the response
    const formattedPayment = {
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
        tourDate: payment.booking.tour.createdAt,
        numberOfPeople: payment.booking.seats,
      },
      amount: payment.amount,
      method: payment.method,
      status: payment.status.charAt(0).toUpperCase() + payment.status.slice(1), // Capitalize first letter
      date: payment.createdAt
        ? new Date(payment.createdAt).toISOString().split("T")[0]
        : new Date(payment.createdAt).toISOString().split("T")[0],
      processingFee: 0,
      netAmount: payment.amount - 0,
      currency: payment.currency,
      gateway: payment.method, // Using payment method as gateway for now
      refundAmount: payment.amount || 0,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    }

    return NextResponse.json(formattedPayment)
  } catch (error) {
    console.error("Error fetching payment:", error)
    return NextResponse.json({ error: "Failed to fetch payment" }, { status: 500 })
  }
}

// PUT /api/payments/[id] - Update a payment
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    // Check if payment exists
    const existingPayment = await prisma.payment.findUnique({
      where: { id: params.id },
      include: { booking: true },
    })

    if (!existingPayment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 })
    }

    // Update payment
    const payment = await prisma.payment.update({
      where: { id: params.id },
      data: {
        amount: body.amount !== undefined ? body.amount : undefined,
        currency: body.currency,
        method: body.paymentMethod,
        transactionId: body.transactionId,
        status: body.status,
        createdAt: body.paymentDate ? new Date(body.paymentDate) : undefined,
        updatedAt: body.refundDate ? new Date(body.refundDate) : undefined,
      },
      include:{
        booking:{
          include:{
            spot:true
          }
        }
      }
    })

    // Update booking payment status if status changed
    if (body.status && body.status !== existingPayment.status) {
      let bookingPaymentStatus = existingPayment.booking.status

      if (body.status === "COMPLETED") {
        bookingPaymentStatus = "COMPLETED"
      } else if (body.status === "REFUNDED") {
        bookingPaymentStatus = "REFUNDED"
      } else if (body.status === "FAILED") {
        bookingPaymentStatus = "CANCELLED"
      } else if (body.status === "PENDING") {
        bookingPaymentStatus = "PENDING"
      }

      if(bookingPaymentStatus == "REFUNDED" || bookingPaymentStatus == "CANCELLED"){
        await prisma.booking.update({
          where:{ id: existingPayment.booking.id },
          data:{
            paidAmount:0,
            seats:0, 
            spot:{
              update:{
                bookedSeats : (payment?.booking?.spot?.bookedSeats ?? 0) - existingPayment.booking.seats 
              }
            }
          }
        })
      }

      await prisma.booking.update({
        where: { id: existingPayment.booking.id },
        data: { status: bookingPaymentStatus },
      })
    }

    return NextResponse.json(payment)
  } catch (error) {
    console.error("Error updating payment:", error)
    return NextResponse.json({ error: "Failed to update payment" }, { status: 500 })
  }
}

// DELETE /api/payments/[id] - Delete a payment
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if payment exists
    const existingPayment = await prisma.payment.findUnique({
      where: { id: params.id },
    })

    if (!existingPayment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 })
    }

    // Delete payment
    await prisma.payment.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Payment deleted successfully" })
  } catch (error) {
    console.error("Error deleting payment:", error)
    return NextResponse.json({ error: "Failed to delete payment" }, { status: 500 })
  }
}
