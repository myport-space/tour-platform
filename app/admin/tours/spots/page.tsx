"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar, Users, MapPin, Search, Plus, Eye, AlertTriangle, CheckCircle, Mail, Trash2 } from "lucide-react"
import Link from "next/link"
import AdminLayout from "@/components/AdminLayout"

export default function SpotsManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [tourFilter, setTourFilter] = useState("all")
  const [tourSpots, setTourSpots] : any = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSpot, setSelectedSpot] :any= useState(null)
  const [emailDialog, setEmailDialog] = useState(false)
  const [emailData, setEmailData] = useState({ subject: "", message: "" })
  const [sendingEmail, setSendingEmail] = useState(false)

  useEffect(() => {
    fetchSpots()
  }, [searchTerm, statusFilter, tourFilter])

  const fetchSpots = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        search: searchTerm,
        status: statusFilter,
        tourId: tourFilter,
      })

      const response = await fetch(`/api/tours/spots?${params}`, {
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()
        setTourSpots(data.spots)
      }
    } catch (error) {
      console.error("Error fetching spots:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (spot:any) => {
    setSelectedSpot(spot)
  }

  const handleSendEmail = async (spot:any) => {
    setSelectedSpot(spot)
    setEmailDialog(true)
    setEmailData({
      subject: `Update for ${spot.tourTitle} - ${spot.spotName}`,
      message: `Dear travelers,\n\nWe have an important update regarding your upcoming tour "${spot.tourTitle}" scheduled for ${new Date(spot.departureDate).toLocaleDateString()}.\n\nBest regards,\nYour Tour Operator`,
    })
  }

  const sendEmail = async () => {
    if (!selectedSpot || !emailData.subject || !emailData.message) return

    try {
      setSendingEmail(true)
      const response = await fetch(`/api/tours/spots/${selectedSpot.id}/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          subject: emailData.subject,
          message: emailData.message,
          recipients: "all",
        }),
      })

      if (response.ok) {
        const result = await response.json()
        alert(`Email sent successfully to ${result.recipients} recipients!`)
        setEmailDialog(false)
      } else {
        alert("Failed to send email")
      }
    } catch (error) {
      console.error("Error sending email:", error)
      alert("Error sending email")
    } finally {
      setSendingEmail(false)
    }
  }

  const handleDeleteSpot = async (spot:any) => {
    if (!confirm(`Are you sure you want to delete the spot "${spot.spotName}"?`)) return

    try {
      const response = await fetch(`/api/tours/spots/${spot.id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (response.ok) {
        alert("Spot deleted successfully!")
        fetchSpots() // Refresh the list
      } else {
        const error = await response.json()
        alert(error.error || "Failed to delete spot")
      }
    } catch (error) {
      console.error("Error deleting spot:", error)
      alert("Error deleting spot")
    }
  }

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
                    {tourSpots.filter((spot:any) => spot.status === "Available").length}
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
                    {tourSpots.reduce((sum:any,b:any)=>sum + (b.bookedSeats||0),0) ||0}
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
                    {tourSpots.filter((spot:any) => spot.bookedSeats !== spot.bookings?.reduce((sum:any, booking:any) => sum + booking.travelers.length , 0)).length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
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
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Spots Grid */}
        {loading ? (
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-semibold text-gray-900">Loading spots...</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {tourSpots.map((spot:any, index:any) => (
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
                          <div className="text-lg font-bold text-green-600">{spot.bookings?.reduce((sum:any, booking:any) => sum + booking.travelers.length , 0)} </div>
                          <div className="text-xs text-gray-600">Travelers</div>
                        </div>
                      </div>

                      {/* Seat vs Traveler Alert */}
                      {spot.bookedSeats !== spot.bookings?.reduce((sum:any, booking:any) => sum + booking.travelers.length , 0) && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm text-yellow-800 font-medium">Seat-Traveler Mismatch</span>
                          </div>
                          <p className="text-xs text-yellow-700 mt-1">
                            {spot.bookedSeats} seats vs {spot.bookings?.reduce((sum:any, booking:any) => sum + booking.travelers.length , 0)}  travelers
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
                        <h5 className="font-medium text-gray-900 text-sm">
                          Assigned Bookings ({spot.bookings.length})
                        </h5>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {spot.bookings.map((booking:any, bookingIndex:any) => (
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
                                  {booking.seats}S / {booking.travelers.length}T
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 rounded-lg"
                          onClick={() => handleViewDetails(spot)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg"
                          onClick={() => handleSendEmail(spot)}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteSpot(spot)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {tourSpots.length === 0 && !loading && (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No spots found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}

       
      </div>

      {/* Email Dialog */}
      <Dialog open={emailDialog} onOpenChange={setEmailDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Send Email to Travelers</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={emailData.subject}
                onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                placeholder="Email subject"
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={emailData.message}
                onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
                placeholder="Email message"
                rows={6}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEmailDialog(false)}>
                Cancel
              </Button>
              <Button onClick={sendEmail} disabled={sendingEmail}>
                {sendingEmail ? "Sending..." : "Send Email"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Spot Details Dialog */}
      {selectedSpot && !emailDialog && (
        <Dialog open={!!selectedSpot} onOpenChange={() => setSelectedSpot(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {selectedSpot.tourTitle} - {selectedSpot.spotName}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Departure Date</Label>
                  <p className="text-sm text-gray-600">{new Date(selectedSpot.departureDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label>Return Date</Label>
                  <p className="text-sm text-gray-600">{new Date(selectedSpot.returnDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label>Max Seats</Label>
                  <p className="text-sm text-gray-600">{selectedSpot.maxSeats}</p>
                </div>
                <div>
                  <Label>Available Seats</Label>
                  <p className="text-sm text-gray-600">{selectedSpot.availableSeats}</p>
                </div>
              </div>

              <div>
                <Label>Bookings ({selectedSpot.bookings.length})</Label>
                <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                  {selectedSpot.bookings.map((booking:any) => (
                    <div key={booking.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{booking.customerName}</p>
                        <p className="text-sm text-gray-600">{booking.customerEmail}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">
                          {booking.seats} seats, {booking.travelers.length} travelers
                        </p>
                        <p className="text-xs text-gray-500">{booking.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AdminLayout>
  )
}
