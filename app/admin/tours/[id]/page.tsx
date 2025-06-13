"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import AdminLayout from "@/components/AdminLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, MapPin, Clock, Users, DollarSign, Plus, Send, Settings, Eye, Calendar } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import AddSpotModal from "./add-spot-modal"

interface Tour {
  id: string
  title: string
  description: string
  location: string
  duration: string
  price: number
  status: string
  images: string[]
  category: {
    name: string
    color: string
  }
  tourOperator: {
    user: {
      name: string
      email: string
    }
  }
  spots: Spot[]
  stats: {
    totalBookings: number
    totalTravelers: number
    totalRevenue: number
    totalSpots: number
  }
}

interface Spot {
  id: string
  name: string
  departureDate: string
  returnDate: string
  maxSeats: number
  bookedSeats: number
  status: string
  bookings: Booking[]
}

interface Booking {
  id: string
  travelers: number
  totalAmount: number
  status: string
  customer: {
    name:string
    email: string
    avatar?: string
  }
}

export default function TourDetailsPage() {
  const { id } = useParams()
  const [tour, setTour] = useState<Tour | null>(null)
  const [loading, setLoading] = useState(true)
  const [statusLoading, setStatusLoading] = useState(false)
  const [addSpotModalOpen, setAddSpotModalOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      fetchTour()
    }
  }, [id])

  const fetchTour = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/tours/${id}`, {
        credentials: "include",
        method:"GET"
      })

      if (!response.ok) {
        if (response.status === 404) {
          setError("Tour not found")
        } else {
          setError("Failed to fetch tour details")
        }
        return
      }

      const data = await response.json()
      console.log(data.data);
      
      setTour(data.data)
    } catch (error) {
      console.error("Error loading tour:", error)
      setError("Error loading tour")
    } finally {
      setLoading(false)
    }
  }

  const updateTourStatus = async (newStatus: string) => {
    setStatusLoading(true)
    try {
      const response = await fetch(`/api/tours/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
        credentials: "include",
      })

      if (response.ok) {
        setTour((prev) => (prev ? { ...prev, status: newStatus } : null))
        toast.success("Tour status updated successfully")
      } else {
        toast.error("Failed to update tour status")
      }
    } catch (error) {
      toast.error("Error updating status")
    } finally {
      setStatusLoading(false)
    }
  }

  const sendEmailToTravelers = async (spotId?: string) => {
    try {
      const endpoint = spotId ? `/api/spots/${spotId}/email` : `/api/tours/${id}/email`
      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
      })

      if (response.ok) {
        toast.success("Email sent successfully")
      } else {
        toast.error("Failed to send email")
      }
    } catch (error) {
      toast.error("Error sending email")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getBookingStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </AdminLayout>
    )
  }

  if (error || !tour) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900">{error || "Tour not found"}</h2>
          <p className="text-gray-600 mt-2">
            {error === "Tour not found"
              ? "The tour you're looking for doesn't exist."
              : "There was a problem loading this tour."}
          </p>
          <Link href="/admin/tours">
            <Button className="mt-4">Back to Tours</Button>
          </Link>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex max-md:flex-wrap  space-y-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{tour.title}</h1>
              <p className="text-gray-600">Tour ID: {tour.id}</p>
            </div>
            <Badge className={getStatusColor(tour.status)}>{tour.status}</Badge>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => sendEmailToTravelers()}>
              <Send className="h-4 w-4 mr-2" />
              Email All Travelers
            </Button>
            <Select value={tour?.status?.toLowerCase()} onValueChange={updateTourStatus} disabled={statusLoading}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{tour.stats?.totalBookings}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Total Travelers</p>
                  <p className="text-2xl font-bold text-gray-900">{tour.stats?.totalTravelers}</p>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${tour.stats?.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Active Spots</p>
                  <p className="text-2xl font-bold text-gray-900">{tour.stats?.totalSpots}</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tour Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Tour Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{tour.title}</h3>
                  <p className="text-gray-600 mt-1">{tour.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{tour.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">${tour.price} per person</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Category: {tour.category?.name || "Uncategorized"}</span>
                  </div>
                </div>

                
              </div>

              <div>
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={tour.images?.[0] || "/placeholder.svg?height=300&width=500"}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Spots Management */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Spots Management</h2>
            <Button onClick={() => setAddSpotModalOpen(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Spot
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {tour.spots && tour.spots.length > 0 ? (
              tour.spots.map((spot) => (
                <Card key={spot.id} className="border-2 border-gray-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{spot.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(spot.departureDate).toLocaleDateString()} -{" "}
                            {new Date(spot.returnDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => sendEmailToTravelers(spot.id)}>
                          <Send className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {spot.bookedSeats} / {spot.maxSeats} seats
                      </span>
                      <Badge
                        className={
                          spot.bookedSeats >= spot.maxSeats ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                        }
                      >
                        {spot.bookedSeats >= spot.maxSeats ? "Full" : "Available"}
                      </Badge>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          spot.bookedSeats >= spot.maxSeats
                            ? "bg-red-500"
                            : spot.bookedSeats >= spot.maxSeats * 0.8
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                        style={{ width: `${(spot.bookedSeats / spot.maxSeats) * 100}%` }}
                      />
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">Bookings ({spot.bookings?.length || 0})</h4>
                      {!spot.bookings || spot.bookings.length === 0 ? (
                        <div className="text-center text-gray-400 py-4">
                          <Users className="h-6 w-6 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No bookings yet</p>
                        </div>
                      ) : (
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {spot.bookings.map((booking:any) => (
                            <div key={booking.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="text-xs font-medium text-blue-600">
                                    {booking.customer?.name?.charAt(0) || "U"}
                                  </span>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">{booking.customer?.name || "Unknown"}</p>
                                  <p className="text-xs text-gray-500">{booking.travelers?.length} travelers</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={`text-xs ${getBookingStatusColor(booking.status)}`}>
                                  {booking.status}
                                </Badge>
                                <Link href={`/admin/bookings/${booking.id}`}>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <Calendar className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                <h3 className="text-lg font-medium text-gray-900">No spots available</h3>
                <p className="text-gray-500 mt-1">Create your first spot to start accepting bookings</p>
                <Button onClick={() => setAddSpotModalOpen(true)} className="mt-4 bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Spot
                </Button>
              </div>
            )}
          </div>
        </div>

        <AddSpotModal
          open={addSpotModalOpen}
          onOpenChange={setAddSpotModalOpen}
          tourId={tour.id}
          onSpotAdded={fetchTour}
        />
      </div>
    </AdminLayout>
  )
}
