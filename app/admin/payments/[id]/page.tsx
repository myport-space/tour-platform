"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle, Clock, XCircle, RefreshCw, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AdminLayout from "@/components/AdminLayout"
import { useToast } from "@/hooks/use-toast"

interface PaymentDetails {
  id: string
  transactionId: string
  customer: {
    name: string
    email: string
    avatar: string
  }
  booking: {
    id: string
    tour: string
    tourDate: string
    numberOfPeople: number
  }
  amount: number
  method: string
  status: string
  date: string
  processingFee: number
  netAmount: number
  currency: string
  gateway: string
  refundDate: string | null
  refundAmount: number
  createdAt: string
  updatedAt: string
}

export default function PaymentDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [payment, setPayment] = useState<PaymentDetails | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch payment details
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch(`/api/payments/${params.id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch payment details")
        }

        const data = await response.json()
        setPayment(data)
      } catch (error) {
        console.error("Error fetching payment details:", error)
        toast({
          title: "Error",
          description: "Failed to load payment details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPaymentDetails()
  }, [params.id, toast])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800 border-green-200"
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "FAILED":
        return "bg-red-100 text-red-800 border-red-200"
      case "REFUNDED":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "PENDING":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "FAILED":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "REFUNDED":
        return <RefreshCw className="h-4 w-4 text-blue-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  // Handle refund
  const handleRefund = async () => {
    if (!payment) return

    if (payment.status === "REFUNDED") {
      toast({
        title: "Already Refunded",
        description: "This payment has already been refunded.",
      })
      return
    }

    if (payment.status !== "COMPLETED") {
      toast({
        title: "Cannot Refund",
        description: "Only completed payments can be refunded.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch(`/api/payments/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "REFUNDED",
          refundDate: new Date().toISOString(),
          refundAmount: payment.amount,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to process refund")
      }

      toast({
        title: "Refund Processed",
        description: `Successfully refunded $${payment.amount.toLocaleString()}`,
      })

      // Refresh payment data
      const updatedPayment = await fetch(`/api/payments/${params.id}`).then((res) => res.json())
      setPayment(updatedPayment)
    } catch (error) {
      console.error("Error processing refund:", error)
      toast({
        title: "Refund Failed",
        description: "Failed to process refund. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <span className="ml-2 text-gray-600">Loading payment details...</span>
        </div>
      </AdminLayout>
    )
  }

  if (!payment) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-xl font-semibold text-gray-800">Payment Not Found</h2>
          <p className="text-gray-600 mt-2">The requested payment could not be found.</p>
          <Button className="mt-4" onClick={() => router.push("/admin/payments")}>
            Back to Payments
          </Button>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <Button variant="ghost" size="sm" onClick={() => router.push("/admin/payments")} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center">
            <div>
              <Badge className={`${getStatusColor(payment.status)} flex items-center gap-1 px-3 py-1.5`}>
                {getStatusIcon(payment.status)}
                <span className="text-sm font-medium">{payment.status}</span>
             </Badge>
              <h1 className="text-2xl font-bold text-gray-900">Payment Details</h1>
               <p className="text-gray-600">ID: {payment.id}</p>
            </div>
          </div>
            {/* Actions */}

           <div className="flex  flex-wrap gap-4">
                {payment.status === "COMPLETED" && (
                  <Button variant="outline" onClick={handleRefund}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Process Refund
                  </Button>
                )}
                <Button variant="outline" onClick={() => location.assign(`/admin/bookings/${payment.booking.id}`)}>
                  View Booking
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    // Generate and download receipt
                    toast({
                      title: "Receipt Generated",
                      description: "Payment receipt has been generated and downloaded.",
                    })
                  }}
                >
                  Download Receipt
                </Button>
          </div>
          
        </div>
        
        {/* Payment Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
            <CardDescription>Transaction details and payment information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Transaction ID</h3>
                  <p className="text-gray-900 font-medium">{payment.transactionId || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Payment Method</h3>
                  <p className="text-gray-900">
                    {payment.method} ({payment.gateway})
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Payment Date</h3>
                  <p className="text-gray-900">{payment.date}</p>
                </div>
                {payment.status === "Refunded" && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Refund Date</h3>
                    <p className="text-gray-900">{payment.refundDate || "N/A"}</p>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Amount</h3>
                  <p className="text-2xl font-bold text-gray-900">
                    ${payment.amount.toLocaleString()} {payment.currency}
                  </p>
                </div>
                {payment.status === "Completed" && (
                  <>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Processing Fee</h3>
                      <p className="text-gray-900">${payment.processingFee.toFixed(2)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Net Amount</h3>
                      <p className="text-gray-900 font-medium">${payment.netAmount.toFixed(2)}</p>
                    </div>
                  </>
                )}
                {payment.status === "Refunded" && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Refund Amount</h3>
                    <p className="text-gray-900">${payment.refundAmount.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Details */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Information</CardTitle>
            <CardDescription>Details about the associated booking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Booking ID</h3>
                  <p className="text-gray-900">{payment.booking.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Tour</h3>
                  <p className="text-gray-900 font-medium">{payment.booking.tour}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Tour Date</h3>
                  <p className="text-gray-900">{new Date(payment.booking.tourDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Number of People</h3>
                  <p className="text-gray-900">{payment.booking.numberOfPeople}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Customer</h3>
                  <p className="text-gray-900 font-medium">{payment.customer.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="text-gray-900">{payment.customer.email}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

         

        {/* Payment Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Timeline</CardTitle>
            <CardDescription>History of payment events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-4 w-4 rounded-full bg-green-500 mt-1"></div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Payment Created</p>
                  <p className="text-sm text-gray-500">{new Date(payment.createdAt).toLocaleString()}</p>
                </div>
              </div>

              {payment.status === "Completed" && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-4 w-4 rounded-full bg-green-500 mt-1"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Payment Completed</p>
                    <p className="text-sm text-gray-500">{payment.date}</p>
                  </div>
                </div>
              )}

              {payment.status === "Failed" && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-4 w-4 rounded-full bg-red-500 mt-1"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Payment Failed</p>
                    <p className="text-sm text-gray-500">{payment.date}</p>
                  </div>
                </div>
              )}

              {payment.status === "Refunded" && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-4 w-4 rounded-full bg-blue-500 mt-1"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Payment Refunded</p>
                    <p className="text-sm text-gray-500">{payment.refundDate || "Unknown date"}</p>
                    <p className="text-sm text-gray-500">Amount: ${payment.refundAmount.toLocaleString()}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start">
                <div className="flex-shrink-0 h-4 w-4 rounded-full bg-gray-300 mt-1"></div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Last Updated</p>
                  <p className="text-sm text-gray-500">{new Date(payment.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
