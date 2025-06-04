"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MapPin,
  Users,
  Star,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Plus,
  Download,
  MoreHorizontal,
  Clock,
  DollarSign,
  Plane,
} from "lucide-react"
import Link from "next/link"
import AdminLayout from "@/components/AdminLayout"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ToursPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [tourTypeFilter, setTourTypeFilter] = useState("all")

  const [editTourId, setEditTourId] = useState<number | null>(null)
  const [deleteTourId, setDeleteTourId] = useState<number | null>(null)
  const [addSpotTourId, setAddSpotTourId] = useState<number | null>(null)

  const tours = [
    {
      id: 1,
      title: "Santorini Sunset Paradise",
      description: "Experience the magical sunsets of Santorini with luxury accommodations",
      location: "Santorini, Greece",
      tourType: "global",
      originCountry: "Pakistan",
      destinationCountry: "Greece",
      category: "Luxury",
      status: "Active",
      duration: "7 days",
      stayNights: 6,
      price: 1299,
      maxTravelers: 12,
      currentBookings: 8,
      rating: 4.9,
      reviews: 156,
      image: "/placeholder.svg?height=200&width=300",
      createdAt: "2024-01-15",
      nextDeparture: "2024-04-15",
    },
    {
      id: 2,
      title: "Swiss Alps Adventure",
      description: "Hiking and skiing in the beautiful Swiss Alps",
      location: "Interlaken, Switzerland",
      tourType: "global",
      originCountry: "Pakistan",
      destinationCountry: "Switzerland",
      category: "Adventure",
      status: "Active",
      duration: "5 days",
      stayNights: 4,
      price: 899,
      maxTravelers: 16,
      currentBookings: 12,
      rating: 4.8,
      reviews: 89,
      image: "/placeholder.svg?height=200&width=300",
      createdAt: "2024-01-20",
      nextDeparture: "2024-04-22",
    },
    {
      id: 3,
      title: "Northern Areas Explorer",
      description: "Discover the beauty of Pakistan's northern mountains",
      location: "Hunza Valley, Pakistan",
      tourType: "in-country",
      originCountry: "Pakistan",
      destinationCountry: "Pakistan",
      category: "Adventure",
      status: "Active",
      duration: "6 days",
      stayNights: 5,
      price: 599,
      maxTravelers: 10,
      currentBookings: 7,
      rating: 4.7,
      reviews: 67,
      image: "/placeholder.svg?height=200&width=300",
      createdAt: "2024-02-01",
      nextDeparture: "2024-05-10",
    },
    {
      id: 4,
      title: "Iceland Northern Lights",
      description: "Chase the Northern Lights in Iceland's stunning landscapes",
      location: "Reykjavik, Iceland",
      tourType: "global",
      originCountry: "Pakistan",
      destinationCountry: "Iceland",
      category: "Nature",
      status: "Active",
      duration: "4 days",
      stayNights: 3,
      price: 1199,
      maxTravelers: 8,
      currentBookings: 6,
      rating: 4.9,
      reviews: 134,
      image: "/placeholder.svg?height=200&width=300",
      createdAt: "2024-02-10",
      nextDeparture: "2024-04-18",
    },
    {
      id: 5,
      title: "Tokyo Food & Culture",
      description: "Discover Tokyo's incredible food scene and rich culture",
      location: "Tokyo, Japan",
      tourType: "global",
      originCountry: "Pakistan",
      destinationCountry: "Japan",
      category: "Food & Culture",
      status: "Paused",
      duration: "8 days",
      stayNights: 7,
      price: 1599,
      maxTravelers: 14,
      currentBookings: 3,
      rating: 4.6,
      reviews: 92,
      image: "/placeholder.svg?height=200&width=300",
      createdAt: "2024-02-15",
      nextDeparture: "2024-05-20",
    },
    {
      id: 6,
      title: "Moroccan Desert Safari",
      description: "Experience the magic of the Sahara Desert",
      location: "Marrakech, Morocco",
      tourType: "global",
      originCountry: "Pakistan",
      destinationCountry: "Morocco",
      category: "Adventure",
      status: "Active",
      duration: "9 days",
      stayNights: 8,
      price: 1099,
      maxTravelers: 12,
      currentBookings: 9,
      rating: 4.8,
      reviews: 78,
      image: "/placeholder.svg?height=200&width=300",
      createdAt: "2024-03-01",
      nextDeparture: "2024-04-25",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200"
      case "Draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Paused":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredTours = tours.filter((tour) => {
    const matchesSearch =
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || tour.status.toLowerCase() === statusFilter
    const matchesCategory = categoryFilter === "all" || tour.category.toLowerCase() === categoryFilter.toLowerCase()
    const matchesTourType = tourTypeFilter === "all" || tour.tourType.toLowerCase() === tourTypeFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesCategory && matchesTourType
  })

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">Tours Management</h1>
            <p className="mt-1 text-sm text-gray-500">Manage all your tours, create new ones, and track performance.</p>
          </div>
          <div className="mt-4 flex space-x-3 md:ml-4 md:mt-0">
            <Button variant="outline" className="rounded-lg">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Link href="/admin/launch-tour">
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg">
                <Plus className="h-4 w-4 mr-2" />
                Create Tour
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
                    placeholder="Search tours by name or location..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="adventure">Adventure</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="nature">Nature</SelectItem>
                  <SelectItem value="food & culture">Food & Culture</SelectItem>
                </SelectContent>
              </Select>
              <Select value={tourTypeFilter} onValueChange={setTourTypeFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Tour Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="in-country">In-Country</SelectItem>
                  <SelectItem value="global">Global</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="rounded-lg">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg overflow-hidden">
                <div className="relative">
                  <Image
                    src={tour.image || "/placeholder.svg"}
                    alt={tour.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3 flex flex-col space-y-2">
                    <Badge className={`${getStatusColor(tour.status)} border rounded-full px-3 py-1 text-sm`}>
                      {tour.status}
                    </Badge>
                    <Badge
                      className={`border rounded-full px-3 py-1 text-sm ${
                        tour.tourType === "global"
                          ? "bg-blue-100 text-blue-800 border-blue-200"
                          : "bg-purple-100 text-purple-800 border-purple-200"
                      }`}
                    >
                      {tour.tourType === "global" ? "Global" : "Local"}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm rounded-full">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{tour.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">{tour.description}</p>
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {tour.location}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {tour.duration} ({tour.stayNights}N)
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        {tour.currentBookings}/{tour.maxTravelers}
                      </div>
                    </div>

                    {tour.tourType === "global" && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Plane className="h-4 w-4 mr-1" />
                        {tour.originCountry} → {tour.destinationCountry}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium text-sm">{tour.rating}</span>
                        <span className="text-gray-500 text-sm ml-1">({tour.reviews})</span>
                      </div>
                      <div className="flex items-center font-bold text-green-600">
                        <DollarSign className="h-4 w-4" />
                        {tour.price}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <Link href={`/admin/tours/${tour.id}`}>
                        <Button variant="outline" size="sm" className="flex-1 rounded-lg">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 rounded-lg"
                        onClick={() => setEditTourId(tour.id)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 rounded-lg"
                        onClick={() => setDeleteTourId(tour.id)}
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

        {/* Empty State */}
        {filteredTours.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No tours found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Edit Tour Modal */}
        {editTourId && (
          <Dialog open={!!editTourId} onOpenChange={() => setEditTourId(null)}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Edit Tour</DialogTitle>
                <DialogDescription>Update tour information and settings.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    defaultValue={tours.find((t) => t.id === editTourId)?.title}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    defaultValue={tours.find((t) => t.id === editTourId)?.description}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    defaultValue={tours.find((t) => t.id === editTourId)?.price}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="maxTravelers" className="text-right">
                    Max Travelers
                  </Label>
                  <Input
                    id="maxTravelers"
                    type="number"
                    defaultValue={tours.find((t) => t.id === editTourId)?.maxTravelers}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditTourId(null)}>
                  Cancel
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Delete Tour Modal */}
        {deleteTourId && (
          <Dialog open={!!deleteTourId} onOpenChange={() => setDeleteTourId(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Tour</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete "{tours.find((t) => t.id === deleteTourId)?.title}"? This action
                  cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteTourId(null)}>
                  Cancel
                </Button>
                <Button variant="destructive">Delete Tour</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AdminLayout>
  )
}
