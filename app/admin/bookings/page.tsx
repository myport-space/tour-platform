"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Users, MapPin, Eye, Search, Download, Phone, Mail, Clock, DollarSign, Loader2,Link2 } from "lucide-react"
import Link from "next/link"
import AdminLayout from "@/components/AdminLayout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

interface Booking {
  id: string
  tourId: number
  tourTitle: string
  tourLocation: string
  customer: {
    name: string
    email: string
    phone: string
    avatar: string
  }
  travelers: number
  totalAmount: number
  paidAmount: number
  status: string
  bookingDate: string
  departureDate: string
  specialRequests: string | null
  spotId: string
}

interface BookingStats {
  total: number
  confirmed: number
  pending: number
  cancelled: number
  totalRevenue: number
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [stats, setStats] = useState<BookingStats>({
    total: 0,
    confirmed: 0,
    pending: 0,
    cancelled: 0,
    totalRevenue: 0,
  })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const { toast } = useToast()

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        search: searchTerm,
        status: statusFilter,
        paymentStatus: paymentStatusFilter,
        dateRange: dateFilter,
      })

      const response = await fetch(`/api/bookings?${params}`, {
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch bookings")
      }

      const data = await response.json()
      setBookings(data.bookings)
      setStats(data.stats)
    } catch (error) {
      console.error("Error fetching bookings:", error)
      toast({
        title: "Error",
        description: "Failed to fetch bookings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [searchTerm, statusFilter, paymentStatusFilter, dateFilter])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200"
      case "partial":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "pending":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "refunded":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const exportBookings = () => {
    // Create CSV content
    const csvContent = [
      [
        "Booking ID",
        "Customer Name",
        "Email",
        "Tour",
        "Travelers",
        "Total Amount",
        "Paid Amount",
        "Status",
        "Booking Date",
        "Departure Date",
      ],
      ...bookings.map((booking) => [
        booking.id,
        booking.customer.name,
        booking.customer.email,
        booking.tourTitle,
        booking.travelers,
        booking.totalAmount,
        booking.paidAmount,
        booking.status,
        booking.bookingDate,
        booking.departureDate,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    // Download CSV
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `bookings-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading bookings...</span>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">Bookings Management</h1>
            <p className="mt-1 text-sm text-gray-500">Track and manage all tour bookings and customer information.</p>
          </div>
          <div className="mt-4 flex space-x-3 md:ml-4 md:mt-0">
            <Button variant="outline" className="rounded-lg" onClick={exportBookings}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Total Bookings",
              value: stats.total,
              icon: Calendar,
              color: "from-blue-500 to-blue-600",
            },
            {
              title: "Confirmed",
              value: stats.confirmed,
              icon: Users,
              color: "from-green-500 to-green-600",
            },
            {
              title: "Pending",
              value: stats.pending,
              icon: Clock,
              color: "from-yellow-500 to-yellow-600",
            },
            {
              title: "Total Revenue",
              value: `$${stats.totalRevenue.toLocaleString()}`,
              icon: DollarSign,
              color: "from-purple-500 to-purple-600",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border-2 border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`bg-gradient-to-r ${stat.color} rounded-full p-3`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <Card className="border-2 border-gray-200">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search by booking ID, customer name, or tour..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={paymentStatusFilter} onValueChange={setPaymentStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Bookings List */}
        <div className="space-y-4">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Booking Info */}
                    <div className="lg:col-span-4">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={booking.customer.avatar || "/placeholder.svg"}
                            alt={booking.customer.name}
                          />
                          <AvatarFallback>
                            {booking.customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{booking.customer.name}</h3>
                            <Badge
                              className={`${getStatusColor(booking.status)} border rounded-full px-2 py-1 text-xs`}
                            >
                              {booking.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">Booking ID: {booking.id}</p>
                          <div className="space-y-1 text-sm text-gray-500 ">
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-1" />
                              {booking.customer.email}
                            </div>
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-1" />
                              {booking.customer.phone}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tour Info */}
                    <div className="lg:col-span-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{booking.tourTitle}</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {booking.tourLocation}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          {booking.travelers} {booking.travelers === 1 ? "Traveler" : "Travelers"}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Departure: {new Date(booking.departureDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Payment Info */}
                    <div className="lg:col-span-2">
                      <div className="">
                          <span className="text-sm text-gray-700 font-semibold">Payment</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Total Amount :</span>
                          <span className="font-semibold">${booking.totalAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Paid Amount :</span>
                          <span className="font-semibold text-green-600">${booking.paidAmount.toLocaleString()}</span>
                        </div>
                        
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="lg:col-span-2 ">
                     <div className="flex flex-col space-y-2">
                          <span className="text-sm text-gray-700 font-semibold">Actions</span>
                          <Link href={`/admin/bookings/${booking.id}`}>
                            <Button variant="outline" size="sm" className="w-full rounded-lg">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </Link>
                          <Link href={`/admin/tours/${booking.tourId}`} >
                            <Button variant="secondary" size="sm" className="w-full rounded-lg">
                              <Link2 className="h-4 w-4 mr-2" />
                              View Tour
                            </Button>
                          </Link>
                        </div>
                     </div>
                  </div>

                  {/* Special Requests */}
                  {booking.specialRequests && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Special Requests:</span> {booking.specialRequests}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {bookings.length === 0 && !loading && (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No bookings found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== "all" || paymentStatusFilter !== "all" || dateFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "No bookings have been made yet."}
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
