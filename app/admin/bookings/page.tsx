"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Users, MapPin, Eye, Search, Filter, Download, Phone, Mail, Clock, DollarSign } from "lucide-react"
import Link from "next/link"
import AdminLayout from "@/components/AdminLayout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const bookings = [
    {
      id: "BK001",
      tourId: 1,
      tourTitle: "Santorini Sunset Paradise",
      tourLocation: "Santorini, Greece",
      customer: {
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 123-4567",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      travelers: 2,
      totalAmount: 2598,
      paidAmount: 2598,
      status: "Confirmed",
      paymentStatus: "Paid",
      bookingDate: "2024-03-15",
      departureDate: "2024-04-15",
      specialRequests: "Vegetarian meals, Airport pickup",
    },
    {
      id: "BK002",
      tourId: 2,
      tourTitle: "Swiss Alps Adventure",
      tourLocation: "Interlaken, Switzerland",
      customer: {
        name: "Michael Chen",
        email: "michael.chen@email.com",
        phone: "+1 (555) 234-5678",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      travelers: 4,
      totalAmount: 3596,
      paidAmount: 1798,
      status: "Confirmed",
      paymentStatus: "Partial",
      bookingDate: "2024-03-18",
      departureDate: "2024-04-22",
      specialRequests: "Family room, Child meals",
    },
    {
      id: "BK003",
      tourId: 3,
      tourTitle: "Bali Cultural Journey",
      tourLocation: "Ubud, Bali",
      customer: {
        name: "Emma Wilson",
        email: "emma.wilson@email.com",
        phone: "+1 (555) 345-6789",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      travelers: 1,
      totalAmount: 799,
      paidAmount: 0,
      status: "Pending",
      paymentStatus: "Pending",
      bookingDate: "2024-03-20",
      departureDate: "2024-05-10",
      specialRequests: "Solo traveler, Photography tour",
    },
    {
      id: "BK004",
      tourId: 4,
      tourTitle: "Iceland Northern Lights",
      tourLocation: "Reykjavik, Iceland",
      customer: {
        name: "David Rodriguez",
        email: "david.rodriguez@email.com",
        phone: "+1 (555) 456-7890",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      travelers: 2,
      totalAmount: 2398,
      paidAmount: 2398,
      status: "Confirmed",
      paymentStatus: "Paid",
      bookingDate: "2024-03-22",
      departureDate: "2024-04-18",
      specialRequests: "Anniversary celebration, Late checkout",
    },
    {
      id: "BK005",
      tourId: 5,
      tourTitle: "Tokyo Food & Culture",
      tourLocation: "Tokyo, Japan",
      customer: {
        name: "Lisa Thompson",
        email: "lisa.thompson@email.com",
        phone: "+1 (555) 567-8901",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      travelers: 3,
      totalAmount: 4797,
      paidAmount: 4797,
      status: "Cancelled",
      paymentStatus: "Refunded",
      bookingDate: "2024-03-10",
      departureDate: "2024-05-20",
      specialRequests: "Dietary restrictions, Cultural guide",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800 border-green-200"
      case "Partial":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Pending":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Refunded":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.tourTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status.toLowerCase() === statusFilter

    return matchesSearch && matchesStatus
  })

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
            <Button variant="outline" className="rounded-lg">
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
              value: bookings.length,
              icon: Calendar,
              color: "from-blue-500 to-blue-600",
            },
            {
              title: "Confirmed",
              value: bookings.filter((b) => b.status === "Confirmed").length,
              icon: Users,
              color: "from-green-500 to-green-600",
            },
            {
              title: "Pending",
              value: bookings.filter((b) => b.status === "Pending").length,
              icon: Clock,
              color: "from-yellow-500 to-yellow-600",
            },
            {
              title: "Total Revenue",
              value: `$${bookings.reduce((sum, b) => sum + b.paidAmount, 0).toLocaleString()}`,
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
              <Button variant="outline" className="rounded-lg">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.map((booking, index) => (
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
                          <div className="flex items-center text-sm text-gray-500 space-x-4">
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
                    <div className="lg:col-span-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Total Amount:</span>
                          <span className="font-semibold">${booking.totalAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Paid Amount:</span>
                          <span className="font-semibold text-green-600">${booking.paidAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Payment Status:</span>
                          <Badge
                            className={`${getPaymentStatusColor(booking.paymentStatus)} border rounded-full px-2 py-1 text-xs`}
                          >
                            {booking.paymentStatus}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="lg:col-span-1">
                      <Link href={`/admin/bookings/${booking.id}`}>
                        <Button variant="outline" size="sm" className="w-full rounded-lg">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
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
        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No bookings found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
