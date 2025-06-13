"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AdminLayout from "@/components/AdminLayout"
import {
  ArrowLeft,
  Download,
  Mail,
  Edit,
  CheckCircle,
  CreditCard,
  DollarSign,
  Users,
  Plane,
  Clock,
  Calendar,
  MapPin,
  Phone,
  User,
  AlertCircle,
  PenIcon,
  PhoneIcon,
  UserCheck,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

interface BookingDetailsProps {
  params: {
    id: string
  }
}

export default function BookingDetails({ params }: BookingDetailsProps) {
  const [activeTab, setActiveTab] = useState("payments")
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/bookings/${params.id}`, {
          credentials: "include",
        })

        if (!response.ok) {
          if (response.status === 404) {
            setError("Booking not found")
          } else {
            setError("Failed to fetch booking details")
          }
          setLoading(false)
          return
        }

        const data = await response.json()
        setBooking(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching booking details:", error)
        setError("An error occurred while fetching booking details")
        setLoading(false)
      }
    }

    fetchBookingDetails()
  }, [params.id])

  // Function to get status badge color
  const getStatusColor = (status: string = "pending") => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Function to get payment status badge color
  const getPaymentStatusColor = (status: string= "pending") => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800 border-green-200"
      case "FAILED":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "PENDING":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "REFUNDED":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Loading skeleton
  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
        <Link href="/admin/bookings">
          <Button variant="ghost" size="sm" className="text-gray-600">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Bookings
          </Button>
        </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32 mt-2" />
              </div>
            </div>
            <div className="flex space-x-3">
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-28" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-12 w-12 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Skeleton className="h-5 w-5 mr-2" />
                    <Skeleton className="h-6 w-40" />
                  </div>

                  <div className="flex space-x-4">
                    <Skeleton className="w-40 h-30 rounded-lg" />
                    <div className="flex-1">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <div className="flex flex-wrap gap-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 mt-6">
                <div className="border-b border-gray-200 p-4">
                  <div className="flex space-x-4">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>
                <div className="p-6">
                  <Skeleton className="h-40 w-full" />
                </div>
              </Card>
            </div>

            <div>
              <Card className="border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Skeleton className="h-5 w-5 mr-2" />
                    <Skeleton className="h-6 w-40" />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Skeleton className="h-6 w-40" />
                      <Skeleton className="h-4 w-24 mt-1" />
                    </div>

                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <Skeleton className="h-5 w-40 mb-2" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4 mt-1" />
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <Skeleton className="h-5 w-32 mb-3" />
                      <div className="space-y-2">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  // Error state
  if (error) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="bg-red-50 p-6 rounded-lg text-center max-w-md">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{error}</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find the booking you're looking for. It may have been deleted or you may not have permission
              to view it.
            </p>
            <Link href="/admin/bookings">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Bookings
              </Button>
            </Link>
          </div>
        </div>
      </AdminLayout>
    )
  }

  // No booking data
  if (!booking) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="bg-yellow-50 p-6 rounded-lg text-center max-w-md">
            <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Data Available</h2>
            <p className="text-gray-600 mb-6">We couldn't load the booking data. Please try again later.</p>
            <Link href="/admin/bookings">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Bookings
              </Button>
            </Link>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <Link href="/admin/bookings">
          <Button variant="ghost" size="sm" className="text-gray-600">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Bookings
          </Button>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Booking Details</h1>
              <p className="text-gray-500">Booking ID: {booking.id}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="text-gray-600">
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <Edit className="h-4 w-4 mr-2" />
              Edit Booking
            </Button>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Booking Status</p>
                  <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Payment Status</p>
                  <Badge className={getPaymentStatusColor(booking.payments.status||"Paid")}>{booking.payments.status}</Badge>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Total Amount</p>
                  <p className="text-2xl font-bold text-gray-900">${booking.totalAmount.toLocaleString()}</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Travelers</p>
                  <p className="text-2xl font-bold text-gray-900">{booking.travelersCount}</p>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tour Information */}
          <div className="lg:col-span-2">
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Plane className="h-5 w-5 text-gray-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Tour Information</h2>
                </div>

                <div className="flex space-x-4">
                  <div className="w-40 h-30 bg-gray-200 rounded-lg flex-shrink-0">
                    <img
                      src={booking.tour.image || "/placeholder.svg?height=120&width=160"}
                      alt={booking.tour.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{booking.tour.title}</h3>
                    <p className="text-gray-600 mb-4">{booking.tour.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {booking.tour.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {booking.tour.duration}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {booking.tour.startDate} - {booking.tour.endDate}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Section */}
            <Card className="border border-gray-200 my-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start border-b border-gray-200 bg-transparent h-auto p-0">
                  <TabsTrigger
                    value="travelers"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:bg-green-50 rounded-none px-6 py-3"
                  >
                    Travelers
                  </TabsTrigger>
                  <TabsTrigger
                    value="itinerary"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:bg-green-50 rounded-none px-6 py-3"
                  >
                    Itinerary
                  </TabsTrigger>
                  <TabsTrigger
                    value="payments"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:bg-green-50 rounded-none px-6 py-3"
                  >
                    Payments
                  </TabsTrigger>
                  <TabsTrigger
                    value="requests"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:bg-green-50 rounded-none px-6 py-3"
                  >
                    Requests
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="travelers" className="p-6 ">
                  {booking.travelers && booking.travelers.length > 0 ? (
                    <div className="space-y-4">
                      {booking.travelers.map((traveler: any) => (
                        <div
                          key={traveler.id}
                          className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="    flex items-start space-x-4">
                            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{traveler.name}</p>
                              <div className="flex items-center space-x-2">
                                <MapPin className="w-4"/>
                                <p className=" text-sm text-gray-600">{traveler.nationality}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <PhoneIcon className="w-4"/>
                                 <p className=" text-sm text-gray-600">{traveler.phone}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <UserCheck className="w-4"/>
                                <p className="text-sm text-gray-600">
                                  {traveler.age} years • {traveler.gender}
                                </p>
                              </div>
                            </div>
                          </div>
                          {traveler.specialRequirements && (
                            <div className="text-right">
                              <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-xs">
                                Special Requirements
                              </Badge>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-600">No traveler information available.</div>
                  )}
                </TabsContent>

                <TabsContent value="itinerary" className="p-6">
                  {booking.tour.itinerary && booking.tour.itinerary.length > 0 ? (
                    <div className="space-y-6">
                      {booking.tour.itinerary.map((day: any) => (
                        <div key={day.day} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                          <h3 className="font-semibold text-gray-900 mb-2">
                            Day {day.day}: {day.title}
                          </h3>
                          <p className="text-gray-600 mb-3">{day.description}</p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                            {day.accommodation && (
                              <div className="bg-gray-50 p-3 rounded-md">
                                <h4 className="text-sm font-medium text-gray-700 mb-1">Accommodation</h4>
                                <p className="text-sm text-gray-600">{day.accommodation.name}</p>
                                <p className="text-xs text-gray-500">
                                  {day.accommodation.type} • {day.accommodation.roomType}
                                </p>
                              </div>
                            )}

                            {day.transportation && (
                              <div className="bg-gray-50 p-3 rounded-md">
                                <h4 className="text-sm font-medium text-gray-700 mb-1">Transportation</h4>
                                <p className="text-sm text-gray-600">{day.transportation.type}</p>
                                <p className="text-xs text-gray-500">{day.transportation.description}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-600">No itinerary information available.</div>
                  )}
                </TabsContent>

                <TabsContent value="payments" className="p-6">
                  {booking.payments ? (
                    <div className="space-y-4">
                        <div
                          key={booking?.payments.id}
                          className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <CreditCard className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">${booking?.payments.amount.toLocaleString()}</p>
                              <p className="text-sm text-gray-600">
                                {booking?.payments.method} • {booking?.payments.transaction}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">{booking?.payments.date}</p>
                            <Badge className={getPaymentStatusColor(booking?.payments.status)+" text-xs"}>
                              {booking?.payments.status}
                            </Badge>
                          </div>
                          <div className="flex flex-col">
                            <p className="text-gray-800 text-sm font-medium">Action</p>
                             <Link href={`/admin/payments/${booking?.payments.id}`}>
                              <Button variant="outline" className="w-full justify-start text-sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View details
                             </Button>
                             </Link>
                          </div>
                        </div>
                    </div>
                  ) : (
                    <div className="text-gray-600">No payment information available.</div>
                  )}
                </TabsContent>

                <TabsContent value="requests" className="p-6">
                  {booking.specialRequests ? (
                    <div className="space-y-4">
                      {booking.specialRequests}
                    </div>
                  ) : (
                    <div className="text-gray-600">No special requests available.</div>
                  )}
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Customer Information */}
          <div>
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <User className="h-5 w-5 text-gray-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Customer Information</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{booking.customer.name}</h3>
                    <p className="text-sm text-gray-600">{booking.customer.role}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      {booking.customer.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {booking.customer.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {booking.customer.address}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Emergency Contact</h4>
                    <p className="text-sm text-gray-600">
                      {booking.emergencyContact.name} • {booking.emergencyContact.relationship}
                    </p>
                    <p className="text-sm text-gray-600">{booking.emergencyContact.phone}</p>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start text-sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Customer
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
