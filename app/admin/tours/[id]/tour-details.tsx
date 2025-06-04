"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Clock, Users, DollarSign, Check, X } from "lucide-react"

interface TourDetailsProps {
  tour: {
    id: string
    title: string
    description: string
    location: string
    duration: string
    price: number
    totalBookings:number,
    totalRevenue:number,
    totalTravelers:number,
    images: string[]
    category?: string
    difficulty?: string
    maxGroupSize?: number
    minAge?: number
    includes?: string[]
    excludes?: string[]
  }
}

export function TourDetails({ tour }: TourDetailsProps) {
  // Add null checks to prevent errors
  const {
    title = "",
    description = "",
    location = "",
    duration = "",
    price = 0,
    images = [],
    category = "General",
    difficulty = "Easy",
    maxGroupSize = 10,
    totalBookings=0,
    totalRevenue=0,
    totalTravelers=0,
    minAge = 0,
    includes = [],
    excludes = [],
  } = tour || {}

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Tour Details</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-6 text-sm">
            <div className="text-center">
              <div className="font-semibold text-gray-900">{totalBookings}</div>
              <div className="text-gray-500">Bookings</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">{totalTravelers}</div>
              <div className="text-gray-500">Travelers</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">${totalRevenue.toLocaleString()}</div>
              <div className="text-gray-500">Revenue</div>
            </div>
          </div>
        </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                  <p className="text-gray-600 mt-2">{description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span>${price} per person</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>Max {maxGroupSize} people</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {category}
                  </Badge>
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                    {difficulty}
                  </Badge>
                  {minAge > 0 && (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      {minAge}+ Age
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={images[0] || "/placeholder.svg?height=300&width=500"}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="gallery">
          <Card>
            <CardHeader>
              <CardTitle>Tour Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.length > 0 ? (
                  images.map((image, index) => (
                    <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Tour image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 py-8 text-center text-gray-500">No images available for this tour</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inclusions">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {includes.length > 0 ? (
                    includes.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span>{item}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No inclusions specified</li>
                  )}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What's Not Included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {excludes.length > 0 ? (
                    excludes.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <X className="h-4 w-4 text-red-600" />
                        <span>{item}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No exclusions specified</li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="requirements">
          <Card>
            <CardHeader>
              <CardTitle>Tour Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {minAge > 0 && (
                  <div>
                    <h3 className="font-medium">Age Requirement</h3>
                    <p className="text-gray-600">Participants must be {minAge} years or older</p>
                  </div>
                )}

                <div>
                  <h3 className="font-medium">Physical Requirements</h3>
                  <p className="text-gray-600">
                    This tour is rated as {difficulty} difficulty.
                    {difficulty === "Easy" && " Suitable for most fitness levels."}
                    {difficulty === "Moderate" && " Requires some physical fitness and mobility."}
                    {difficulty === "Challenging" && " Requires good physical fitness and endurance."}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">Group Size</h3>
                  <p className="text-gray-600">This tour accommodates a maximum of {maxGroupSize} travelers.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
