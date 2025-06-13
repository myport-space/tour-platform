"use client"

import type React from "react"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Users, Send, Settings, Eye, Edit, GripVertical, BluetoothSearchingIcon } from "lucide-react"
import EditSpotModal from "./edit-tour-spot"
import Link from "next/link"

interface Booking_ {
  id: string
  customerName: string
  email: string
  phone: string
  travelers: number
  amount: number
  status: string
  bookingDate: string
  avatar: string
}

interface Spot_ {
  id: string
  name: string
  departureDate: string
  returnDate: string
  maxSeats: number
  status: string
  tourId: string
  bookings: any[]
}

interface TourSpotsProps {
  spots: Spot_[]
  setSpots: React.Dispatch<React.SetStateAction<Spot_[]>>
}

export function TourSpots({ spots , setSpots }: TourSpotsProps) {
  const [expandedSpot, setExpandedSpot] = useState<string | null>(null)
 
  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const sourceSpotIndex = spots.findIndex((spot) => spot.id === source.droppableId)
    const destSpotIndex = spots.findIndex((spot) => spot.id === destination.droppableId)

    if (sourceSpotIndex === -1 || destSpotIndex === -1) return

    const sourceSpot = spots[sourceSpotIndex]
    const destSpot = spots[destSpotIndex]

    const booking = sourceSpot.bookings.find((b) => b.id === draggableId)
    if (!booking) return

    // Remove from source
    const newSourceBookings = sourceSpot.bookings.filter((b) => b.id !== draggableId)

    // Add to destination
    const newDestBookings = [...destSpot.bookings]
    newDestBookings.splice(destination.index, 0, booking)

    const newSpots = [...spots]
    newSpots[sourceSpotIndex] = { ...sourceSpot, bookings: newSourceBookings }
    newSpots[destSpotIndex] = { ...destSpot, bookings: newDestBookings }

    setSpots(newSpots)
  }

  const getBookingStatusColor = (status: string) => {
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

  const toggleExpandSpot = (spotId: string) => {
    setExpandedSpot(expandedSpot === spotId ? null : spotId)
  }

 


  const sendEmailToTravelers = (spotId: string) => {
    console.log(`Sending email to travelers in spot ${spotId}`)
    // Implement email sending logic here
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {spots.length > 0 ? (
          spots.map((spot) => {
            const totalTravelers = spot.bookings.reduce((sum, booking) => sum + booking.travelers.length, 0)
            const isFull = totalTravelers >= spot.maxSeats

            return (
              <Card key={spot.id} className={`border-2 ${isFull ? "border-red-200" : "border-gray-200"}`}>
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => console.log("It word")
                        }
                        className="text-blue-600"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button onClick={()=>alert("hi")} variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">
                        {totalTravelers} / {spot.maxSeats} travelers
                      </span>
                    </div>
                    <Badge className={isFull ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}>
                      {spot.status.toLowerCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Droppable droppableId={spot.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-h-[200px] space-y-3 p-2 rounded-lg transition-colors ${
                          snapshot.isDraggingOver ? "bg-blue-50 border-2 border-blue-200" : "bg-gray-50"
                        }`}
                      >
                        {spot.bookings.length === 0 ? (
                          <div className="flex items-center justify-center h-32 text-gray-400">
                            <div className="text-center">
                              <Users className="h-8 w-8 mx-auto mb-2" />
                              <p className="text-sm">No bookings yet</p>
                              <p className="text-xs mt-1">Drag bookings here</p>
                            </div>
                          </div>
                        ) : (
                          spot.bookings.map((booking, index) => (
                            <Draggable key={booking.id} draggableId={booking.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className={`bg-white border border-gray-200 rounded-lg p-3 transition-shadow ${
                                    snapshot.isDragging ? "shadow-lg" : "hover:shadow-md"
                                  }`}
                                >
                                  <div className="flex items-center space-x-3">
                                    <div {...provided.dragHandleProps} className="cursor-grab">
                                      <GripVertical className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={booking.avatar || "/placeholder.svg"} />
                                      <AvatarFallback>
                                        {booking.customer.name
                                          .split(" ")
                                          .map((n:any) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 ">
                                      <p className="text-sm font-medium text-gray-900 truncate">
                                       {booking.customer.name}
                                      </p>
                                      <div className="flex flex-col  text-xs text-gray-500">
                                        <span>{booking.travelers.length} travelers</span>
                                        <div className="flex space-y-3">
                                          <span>${booking.payments.amount}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex flex-col items-end space-y-1">
                                      <Badge className={`text-xs ${getBookingStatusColor(booking.status)}`}>
                                        {booking.status}
                                      </Badge>
                                      <Link href={`/admin/bookings/${booking.id}`} className="flex space-x-1">
                                        <Button  variant="ghost" size="sm" className="h-6 w-6 p-0">
                                          <Eye className="h-3 w-3" />
                                        </Button> 
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </CardContent>
              </Card>
            )
          })
        ) : (
          <div className="col-span-3 py-12 text-center text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <h3 className="text-lg font-medium mb-2">No spots available</h3>
            <p>Click "Add New Spot" to create your first departure date</p>
          </div>
        )}
      </div>
    </DragDropContext>


  )
}
