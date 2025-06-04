"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Users,
  MapPin,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  AlertTriangle,
  CheckCircle,
  UserCheck,
} from "lucide-react"
import Link from "next/link"
import AdminLayout from "@/components/AdminLayout"

export default function SpotsManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [tourFilter, setTourFilter] = useState("all")

  // Mock data for tour spots
  const tourSpots = [
    {
      id: 1,
      tourId: 1,
      tourTitle: "Santorini Sunset Paradise",
      tourLocation: "Santorini, Greece",
      spotName: "April Departure",
      departureDate: "2024-04-15",
      returnDate: "2024-04-22",
      maxSeats: 8,
      bookedSeats: 6,
      actualTravelers: 7,
      availableSeats: 2,
      status: "Available",
      bookings: [
        { id: "BK001", customerName: "Sarah Johnson", travelers: 2, seats: 2 },
        { id: "BK002", customerName: "Mike Chen", travelers: 3, seats: 2 },
        { id: "BK003", customerName: "Emma Rodriguez", travelers: 2, seats: 2 },
      ],
    },
    {
      id: 2,
      tourId: 1,
      tourTitle: "Santorini Sunset Paradise",
      tourLocation: "Santorini, Greece",
      spotName: "May Departure",
      departureDate: "2024-05-15",
      returnDate: "2024-05-22",
      maxSeats: 12,
      bookedSeats: 8,
      actualTravelers: 10,
      availableSeats: 4,
      status: "Available",
      bookings: [
        { id: "BK004", customerName: "David Thompson", travelers: 4, seats: 3 },
        { id: "BK005", customerName: "Lisa Wang", travelers: 6, seats: 5 },
      ],
    },
    {
      id: 3,
      tourId: 1,
      tourTitle: "Santorini Sunset Paradise",
      tourLocation: "Santorini, Greece",
      spotName: "June Departure",
      departureDate: "2024-06-15",
      returnDate: "2024-06-22",
      maxSeats: 10,
      bookedSeats: 10,
      actualTravelers: 12,
      availableSeats: 0,
      status: "Full",
      bookings: [
        { id: "BK006", customerName: "Robert Kim", travelers: 5, seats: 4 },
        { id: "BK007", customerName: "Maria Garcia", travelers: 4, seats: 3 },
        { id: "BK008", customerName: "James Wilson", travelers: 3, seats: 3 },
      ],
    },
    {
      id: 4,
      tourId: 2,
      tourTitle: "Swiss Alps Adventure",
      tourLocation: "Interlaken, Switzerland",
      spotName: "Spring Adventure",
      departureDate: "2024-04-20",
      returnDate: "2024-04-25",
      maxSeats: 16,
      bookedSeats: 12,
      actualTravelers: 14,
      availableSeats: 4,
      status: "Available",
      bookings: [
        { id: "BK009", customerName: "Anna Schmidt", travelers: 6, seats: 5 },
        { id: "BK010", customerName: "Tom Anderson", travelers: 8, seats: 7 },
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800 border-green-200"
      case "Full":
        return "bg-red-100 text-red-800 border-red-200"
      case "Departed":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredSpots = tourSpots.filter((spot) => {
    const matchesSearch =
      spot.tourTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spot.spotName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spot.tourLocation.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || spot.status.toLowerCase() === statusFilter
    const matchesTour = tourFilter === "all" || spot.tourId.toString() === tourFilter

    return matchesSearch && matchesStatus && matchesTour
  })

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
              Tour Spots Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage tour spots, track bookings, and handle traveler assignments across all departure dates.
            </p>
          </div>
          <div className="mt-4 flex space-x-3 md:ml-4 md:mt-0">
            <Link href="/admin/launch-tour">
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg">
                <Plus className="h-4 w-4 mr-2" />
                Create New Tour
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <Card className="border-2 border-gray-200">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search by tour name, spot name, or location..."
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
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="full">Full</SelectItem>
                  <SelectItem value="departed">Departed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={tourFilter} onValueChange={setTourFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Tour" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tours</SelectItem>
                  <SelectItem value="1">Santorini Sunset</SelectItem>
                  <SelectItem value="2">Swiss Alps Adventure</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="rounded-lg">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Spots Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredSpots.map((spot, index) => (
            <motion.div
              key={spot.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{spot.tourTitle}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {spot.tourLocation}
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(spot.status)} border rounded-full px-3 py-1 text-sm`}>
                      {spot.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-4 pt-0">
                  <div className="space-y-4">
                    {/* Spot Info */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">{spot.spotName}</h4>
                      <div className="space-y-1 text-sm text-blue-700">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>
                            {new Date(spot.departureDate).toLocaleDateString()} -{" "}
                            {new Date(spot.returnDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Capacity Overview */}
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-gray-900">{spot.maxSeats}</div>
                        <div className="text-xs text-gray-600">Max Seats</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-orange-600">{spot.bookedSeats}</div>
                        <div className="text-xs text-gray-600">Booked</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-green-600">{spot.actualTravelers}</div>
                        <div className="text-xs text-gray-600">Travelers</div>
                      </div>
                    </div>

                    {/* Seat vs Traveler Alert */}
                    {spot.bookedSeats !== spot.actualTravelers && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm text-yellow-800 font-medium">Seat-Traveler Mismatch</span>
                        </div>
                        <p className="text-xs text-yellow-700 mt-1">
                          {spot.bookedSeats} seats vs {spot.actualTravelers} travelers
                        </p>
                      </div>
                    )}

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Capacity:</span>
                        <span className="font-medium">
                          {spot.maxSeats - spot.availableSeats} / {spot.maxSeats} occupied
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            spot.availableSeats > 0 ? "bg-green-500" : "bg-red-500"
                          }`}
                          style={{ width: `${((spot.maxSeats - spot.availableSeats) / spot.maxSeats) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Bookings Summary */}
                    <div className="space-y-2">
                      <h5 className="font-medium text-gray-900 text-sm">Assigned Bookings ({spot.bookings.length})</h5>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {spot.bookings.map((booking, bookingIndex) => (
                          <div
                            key={booking.id}
                            className="flex items-center justify-between text-xs bg-gray-50 rounded p-2"
                          >
                            <div>
                              <span className="font-medium text-gray-900">{booking.id}</span>
                              <span className="text-gray-500 ml-2">{booking.customerName}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-gray-600">
                                {booking.seats}S / {booking.travelers}T
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 rounded-lg">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 rounded-lg">
                        <UserCheck className="h-4 w-4 mr-2" />
                        Manage
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-lg">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSpots.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No spots found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-2 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Spots</p>
                  <p className="text-2xl font-bold text-blue-600">{tourSpots.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Available Spots</p>
                  <p className="text-2xl font-bold text-green-600">
                    {tourSpots.filter((spot) => spot.status === "Available").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Travelers</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {tourSpots.reduce((sum, spot) => sum + spot.actualTravelers, 0)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Mismatched Bookings</p>
                  <p className="text-2xl font-bold text-red-600">
                    {tourSpots.filter((spot) => spot.bookedSeats !== spot.actualTravelers).length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
