"use client"

import { useState } from "react"
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
} from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface BookingDetailsProps {
  params: {
    id: string
  }
}

export default function BookingDetails({ params }: BookingDetailsProps) {
  const [activeTab, setActiveTab] = useState("payments")

  // Mock booking data
  const booking = {
    id: "BK001",
    status: "Confirmed",
    paymentStatus: "Paid",
    totalAmount: 2598,
    travelers: 2,
    tour: {
      title: "Santorini Sunset Paradise",
      description: "Experience the magical sunsets of Santorini with luxury accommodations and breathtaking views.",
      location: "Santorini, Greece",
      duration: "7 days",
      startDate: "4/15/2024",
      endDate: "4/22/2024",
      image: "/placeholder.svg?height=120&width=160",
    },
    customer: {
      name: "Sarah Johnson",
      role: "Lead Traveler",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY 10001",
    },
    emergencyContact: {
      name: "John Johnson",
      relationship: "Spouse",
      phone: "+1 (555) 987-6543",
    },
    payments: [
      {
        id: 1,
        amount: 1299,
        method: "Credit Card",
        transaction: "TXN123456",
        date: "3/15/2024",
        status: "Completed",
      },
      {
        id: 2,
        amount: 1299,
        method: "Credit Card",
        transaction: "TXN123457",
        date: "3/15/2024",
        status: "Completed",
      },
    ],
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/bookings">
              <Button variant="ghost" size="sm" className="text-gray-600">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Bookings
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Booking Details</h1>
              <p className="text-gray-500">Booking ID: {booking.id}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="text-gray-600">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
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
                  <Badge className="bg-green-100 text-green-800 border-green-200">{booking.status}</Badge>
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
                  <Badge className="bg-green-100 text-green-800 border-green-200">{booking.paymentStatus}</Badge>
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
                  <p className="text-2xl font-bold text-gray-900">{booking.travelers}</p>
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
                      src={booking.tour.image || "/placeholder.svg"}
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
            <Card className="border border-gray-200">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start border-b border-gray-200 bg-transparent h-auto p-0">
                  <TabsTrigger
                    value="travelers"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none px-6 py-3"
                  >
                    Travelers
                  </TabsTrigger>
                  <TabsTrigger
                    value="itinerary"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none px-6 py-3"
                  >
                    Itinerary
                  </TabsTrigger>
                  <TabsTrigger
                    value="payments"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none px-6 py-3"
                  >
                    Payments
                  </TabsTrigger>
                  <TabsTrigger
                    value="requests"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none px-6 py-3"
                  >
                    Requests
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="travelers" className="p-6">
                  <div className="text-gray-600">Travelers information will be displayed here.</div>
                </TabsContent>

                <TabsContent value="itinerary" className="p-6">
                  <div className="text-gray-600">Tour itinerary will be displayed here.</div>
                </TabsContent>

                <TabsContent value="payments" className="p-6">
                  <div className="space-y-4">
                    {booking.payments.map((payment) => (
                      <div
                        key={payment.id}
                        className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">${payment.amount.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">
                              {payment.method} • {payment.transaction}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{payment.date}</p>
                          <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="requests" className="p-6">
                  <div className="text-gray-600">Special requests will be displayed here.</div>
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
