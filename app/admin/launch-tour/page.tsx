"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MapPin,
  DollarSign,
  Camera,
  Plus,
  X,
  Save,
  Eye,
  Upload,
  Calendar,
  Plane,
  Car,
  AlertTriangle,
  CheckCircle,
  Star,
} from "lucide-react"
import AdminLayout from "@/components/AdminLayout"

export default function LaunchTour() {
  const [activeTab, setActiveTab] = useState("basic")
  const [images, setImages] = useState<string[]>([])
  const [itinerary, setItinerary] = useState([
    {
      day: 1,
      title: "",
      description: "",
      activities: [""],
      meals: { breakfast: "", lunch: "", dinner: "" },
      accommodation: {
        name: "",
        type: "", // Hotel, Resort, Guesthouse, etc.
        roomType: "",
      },
    },
  ])
  const [included, setIncluded] = useState([""])
  const [notIncluded, setNotIncluded] = useState([""])
  const [restrictions, setRestrictions] = useState([""])
  const [highlights, setHighlights] = useState([""])
  const [tourType, setTourType] = useState("in-country") // "in-country" or "global"
  const [originCountry, setOriginCountry] = useState("")
  const [destinationCountry, setDestinationCountry] = useState("")
  const [stayNights, setStayNights] = useState(0)
  const [agencyEligible, setAgencyEligible] = useState(true) // Check if agency can create global tours
  const [tourSpots, setTourSpots] = useState([
    {
      id: 1,
      name: "Spot 1",
      departureDate: "",
      returnDate: "",
      maxSeats: 8,
      bookedSeats: 0,
      actualTravelers: 0,
      status: "Available", // Available, Full, Departed
      bookings: [], // Array of booking IDs assigned to this spot
    },
  ])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    duration: "",
    groupSize: "",
    difficulty: "",
    currentPrice: "",
    originalPrice: "",
    currency: "USD",
    discountPercentage: "",
    pricingNotes: "",
    categoryId: "", // Add category selection
  })

  const [categories, setCategories] = useState([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true)
      const response = await fetch("/api/categories", {
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()
        setCategories(data.categories)
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
    } finally {
      setCategoriesLoading(false)
    }
  }

  // Add form submission handler
  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      const tourData = {
        // Basic Info
        title: formData.title,
        description: formData.description,
        location: formData.location,
        duration: formData.duration,
        stayNights,
        groupSize: formData.groupSize,
        difficulty: formData.difficulty,
        highlights,
        tourType,
        originCountry,
        destinationCountry,
        categoryId: formData.categoryId, // Add this line

        // Spots
        tourSpots,

        // Images
        images,

        // Itinerary
        itinerary,

        // Inclusions
        included,
        notIncluded,
        restrictions,

        // Transport
        transportToDestination: {
          description: "Commercial flights and transfers",
        },
        localTransport: {
          description: "Local transportation included",
        },

        // Operator
        operatorInfo: {
          name: "Tour Operator",
        },

        // Pricing
        currentPrice: formData.currentPrice,
        originalPrice: formData.originalPrice,
        currency: formData.currency,
        discountPercentage: formData.discountPercentage,
        pricingNotes: formData.pricingNotes,
      }

      const response = await fetch("/api/tours/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(tourData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitMessage("Tour created successfully!")
        // Reset form or redirect
        setTimeout(() => {
          window.location.href = "/admin/tours"
        }, 2000)
      } else {
        setSubmitMessage(result.error || "Failed to create tour")
      }
    } catch (error) {
      console.error("Error submitting tour:", error)
      setSubmitMessage("Failed to create tour. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Update form inputs to use formData state
  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addTourSpot = () => {
    setTourSpots([
      ...tourSpots,
      {
        id: tourSpots.length + 1,
        name: `Spot ${tourSpots.length + 1}`,
        departureDate: "",
        returnDate: "",
        maxSeats: 8,
        bookedSeats: 0,
        actualTravelers: 0,
        status: "Available",
        bookings: [],
      },
    ])
  }

  const updateTourSpot = (index: number, field: string, value: any) => {
    const updated = [...tourSpots]
    updated[index][field] = value
    setTourSpots(updated)
  }

  const removeTourSpot = (index: number) => {
    setTourSpots(tourSpots.filter((_, i) => i !== index))
  }

  const tabs = [
    { id: "basic", label: "Basic Info", icon: MapPin },
    { id: "spots", label: "Tour Spots", icon: Calendar },
    { id: "images", label: "Images", icon: Camera },
    { id: "itinerary", label: "Itinerary", icon: Calendar },
    { id: "inclusions", label: "Inclusions", icon: CheckCircle },
    { id: "transport", label: "Transport", icon: Car },
    { id: "restrictions", label: "Restrictions", icon: AlertTriangle },
    { id: "operator", label: "Operator", icon: Star },
    { id: "pricing", label: "Pricing", icon: DollarSign },
  ]

  const addItineraryDay = () => {
    setItinerary([
      ...itinerary,
      {
        day: itinerary.length + 1,
        title: "",
        description: "",
        activities: [""],
        meals: { breakfast: "", lunch: "", dinner: "" },
        accommodation: {
          name: "",
          type: "", // Hotel, Resort, Guesthouse, etc.
          roomType: "",
        },
      },
    ])
  }

  const updateItineraryDay = (index: number, field: string, value: any) => {
    const updated = [...itinerary]
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      updated[index][parent][child] = value
    } else {
      updated[index][field] = value
    }
    setItinerary(updated)
  }

  const addListItem = (list: string[], setList: (items: string[]) => void) => {
    setList([...list, ""])
  }

  const updateListItem = (list: string[], setList: (items: string[]) => void, index: number, value: string) => {
    const updated = [...list]
    updated[index] = value
    setList(updated)
  }

  const removeListItem = (list: string[], setList: (items: string[]) => void, index: number) => {
    setList(list.filter((_, i) => i !== index))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const renderBasicInfo = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Tour Type Selection */}
      <motion.div variants={itemVariants}>
        <Card className="border-2 border-blue-200 rounded-3xl">
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-semibold text-blue-800">Tour Type</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  tourType === "in-country" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setTourType("in-country")}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    checked={tourType === "in-country"}
                    onChange={() => setTourType("in-country")}
                    className="text-blue-500"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">In-Country Tour</h3>
                    <p className="text-sm text-gray-600">Tours within your country</p>
                  </div>
                </div>
              </div>

              <div
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  tourType === "global" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"
                } ${!agencyEligible ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => agencyEligible && setTourType("global")}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    checked={tourType === "global"}
                    onChange={() => agencyEligible && setTourType("global")}
                    disabled={!agencyEligible}
                    className="text-green-500"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">Global Tour</h3>
                    <p className="text-sm text-gray-600">International country-to-country tours</p>
                    {!agencyEligible && <p className="text-xs text-red-500 mt-1">Requires agency verification</p>}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Country Selection */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tourType === "global" && (
            <div className="space-y-2">
              <Label htmlFor="originCountry" className="text-sm">
                Origin Country
              </Label>
              <Select value={originCountry} onValueChange={setOriginCountry}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select origin country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pakistan">Pakistan</SelectItem>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="bangladesh">Bangladesh</SelectItem>
                  <SelectItem value="uae">United Arab Emirates</SelectItem>
                  <SelectItem value="saudi-arabia">Saudi Arabia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="destinationCountry" className="text-sm">
              {tourType === "global" ? "Destination Country" : "Country"}
            </Label>
            <Select value={destinationCountry} onValueChange={setDestinationCountry}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select destination country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="japan">Japan</SelectItem>
                <SelectItem value="greece">Greece</SelectItem>
                <SelectItem value="switzerland">Switzerland</SelectItem>
                <SelectItem value="iceland">Iceland</SelectItem>
                <SelectItem value="morocco">Morocco</SelectItem>
                <SelectItem value="indonesia">Indonesia</SelectItem>
                <SelectItem value="thailand">Thailand</SelectItem>
                <SelectItem value="turkey">Turkey</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* Rest of the existing basic info fields */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm">
            Tour Title
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => updateFormData("title", e.target.value)}
            placeholder="e.g., Santorini Sunset Paradise"
            className="rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm">
            Specific Location/City
          </Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => updateFormData("location", e.target.value)}
            placeholder="e.g., Santorini, Tokyo, Karachi"
            className="rounded-xl"
          />
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-2">
          <Label htmlFor="duration" className="text-sm">
            Duration
          </Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => updateFormData("duration", e.target.value)}
            placeholder="e.g., 7 Days"
            className="rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stayNights" className="text-sm">
            Stay Nights
          </Label>
          <Input
            id="stayNights"
            type="number"
            value={stayNights}
            onChange={(e) => setStayNights(Number.parseInt(e.target.value) || 0)}
            placeholder="e.g., 6"
            className="rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="groupSize" className="text-sm">
            Group Size
          </Label>
          <Input
            id="groupSize"
            value={formData.groupSize}
            onChange={(e) => updateFormData("groupSize", e.target.value)}
            placeholder="e.g., 12 People"
            className="rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="difficulty" className="text-sm">
            Difficulty Level
          </Label>
          <Select>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="challenging">Challenging</SelectItem>
              <SelectItem value="extreme">Extreme</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="description" className="text-sm">
          Tour Description
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => updateFormData("description", e.target.value)}
          placeholder="Describe your tour in detail..."
          className="rounded-xl min-h-32 text-sm"
          rows={4}
        />
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="category" className="text-sm">
          Tour Category
        </Label>
        <Select value={formData.categoryId} onValueChange={(value) => updateFormData("categoryId", value)}>
          <SelectTrigger className="rounded-xl">
            <SelectValue placeholder={categoriesLoading ? "Loading categories..." : "Select category"} />
          </SelectTrigger>
          <SelectContent>
            {categoriesLoading ? (
              <div className="p-2 text-sm text-gray-500">Loading categories...</div>
            ) : categories.length === 0 ? (
              <div className="p-2 text-sm text-gray-500">No categories available. Create one first.</div>
            ) : (
              categories.map((category: any) => (
                <SelectItem key={category.id} value={category.id}>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                    <span>{category.name}</span>
                  </div>
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
        {categories.length === 0 && !categoriesLoading && (
          <p className="text-sm text-red-600">
            No categories available. Please{" "}
            <a href="/admin/tours/categories" className="underline">
              create a category
            </a>{" "}
            first.
          </p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        <Label className="text-sm">Tour Highlights</Label>
        {highlights.map((highlight, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Input
              value={highlight}
              onChange={(e) => updateListItem(highlights, setHighlights, index, e.target.value)}
              placeholder="e.g., Blue Dome Churches Photography"
              className="rounded-xl text-sm"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeListItem(highlights, setHighlights, index)}
              className="rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => addListItem(highlights, setHighlights)}
          className="rounded-xl py-3"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Highlight
        </Button>
      </motion.div>
    </motion.div>
  )

  const renderSpots = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants}>
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Tour Spots Management</h2>
          <p className="text-gray-600 text-sm">
            Create multiple departure dates/groups for your tour. Each spot can accommodate different numbers of
            travelers.
          </p>
        </div>
      </motion.div>

      {tourSpots.map((spot, index) => (
        <motion.div key={spot.id} variants={itemVariants}>
          <Card className="border-2 border-blue-200 rounded-3xl">
            <CardHeader className="p-4">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg font-semibold text-blue-800">
                  <Calendar className="h-5 w-5 mr-2 inline" />
                  {spot.name}
                </span>
                {tourSpots.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeTourSpot(index)}
                    className="rounded-full text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Spot Name</Label>
                  <Input
                    value={spot.name}
                    onChange={(e) => updateTourSpot(index, "name", e.target.value)}
                    placeholder="e.g., April Departure, Group A"
                    className="rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Maximum Seats</Label>
                  <Input
                    type="number"
                    value={spot.maxSeats}
                    onChange={(e) => updateTourSpot(index, "maxSeats", Number.parseInt(e.target.value) || 8)}
                    placeholder="8"
                    min="1"
                    max="50"
                    className="rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Departure Date</Label>
                  <Input
                    type="date"
                    value={spot.departureDate}
                    onChange={(e) => updateTourSpot(index, "departureDate", e.target.value)}
                    className="rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Return Date</Label>
                  <Input
                    type="date"
                    value={spot.returnDate}
                    onChange={(e) => updateTourSpot(index, "returnDate", e.target.value)}
                    className="rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{spot.maxSeats}</div>
                    <div className="text-sm text-gray-600">Max Seats</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">{spot.bookedSeats}</div>
                    <div className="text-sm text-gray-600">Booked Seats</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{spot.actualTravelers}</div>
                    <div className="text-sm text-gray-600">Actual Travelers</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      <motion.div variants={itemVariants}>
        <Button onClick={addTourSpot} className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 py-3">
          <Plus className="h-4 w-4 mr-2" />
          Add Tour Spot
        </Button>
      </motion.div>
    </motion.div>
  )

  const renderImages = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants} className="text-center">
        <div className="border-2 border-dashed border-gray-300 rounded-3xl p-12 hover:border-green-400 transition-colors">
          <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Tour Images</h3>
          <p className="text-gray-600 mb-6">Drag and drop your images here, or click to browse</p>
          <Button className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl py-3">
            <Camera className="h-4 w-4 mr-2" />
            Choose Images
          </Button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5].map((index) => (
          <div key={index} className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center">
            <Camera className="h-8 w-8 text-gray-400" />
          </div>
        ))}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        <Label className="text-sm">Image Descriptions</Label>
        {[1, 2, 3].map((index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder={`Image ${index} title`} className="rounded-xl text-sm" />
            <Input placeholder={`Image ${index} description`} className="rounded-xl text-sm" />
          </div>
        ))}
      </motion.div>
    </motion.div>
  )

  const renderItinerary = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {itinerary.map((day, index) => (
        <motion.div key={index} variants={itemVariants}>
          <Card className="border-2 border-gray-200 rounded-3xl">
            <CardHeader className="p-4">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg font-semibold">Day {day.day}</span>
                {itinerary.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setItinerary(itinerary.filter((_, i) => i !== index))}
                    className="rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Day Title</Label>
                  <Input
                    value={day.title}
                    onChange={(e) => updateItineraryDay(index, "title", e.target.value)}
                    placeholder="e.g., Arrival & Oia Exploration"
                    className="rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Description</Label>
                  <Input
                    value={day.description}
                    onChange={(e) => updateItineraryDay(index, "description", e.target.value)}
                    placeholder="Brief description of the day"
                    className="rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm">Meals</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Breakfast</Label>
                    <Input
                      value={day.meals.breakfast}
                      onChange={(e) => updateItineraryDay(index, "meals.breakfast", e.target.value)}
                      placeholder="Breakfast details"
                      className="rounded-xl text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Lunch</Label>
                    <Input
                      value={day.meals.lunch}
                      onChange={(e) => updateItineraryDay(index, "meals.lunch", e.target.value)}
                      placeholder="Lunch details"
                      className="rounded-xl text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Dinner</Label>
                    <Input
                      value={day.meals.dinner}
                      onChange={(e) => updateItineraryDay(index, "meals.dinner", e.target.value)}
                      placeholder="Dinner details"
                      className="rounded-xl text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm">Accommodation</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Hotel/Accommodation Name</Label>
                    <Input
                      value={day.accommodation.name}
                      onChange={(e) => updateItineraryDay(index, "accommodation.name", e.target.value)}
                      placeholder="e.g., Santorini Eco Lodge"
                      className="rounded-xl text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Accommodation Type</Label>
                    <Select
                      value={day.accommodation.type}
                      onValueChange={(value) => updateItineraryDay(index, "accommodation.type", value)}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hotel">Hotel</SelectItem>
                        <SelectItem value="resort">Resort</SelectItem>
                        <SelectItem value="guesthouse">Guesthouse</SelectItem>
                        <SelectItem value="hostel">Hostel</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="camping">Camping</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Room Type</Label>
                  <Input
                    value={day.accommodation.roomType}
                    onChange={(e) => updateItineraryDay(index, "accommodation.roomType", e.target.value)}
                    placeholder="e.g., Deluxe Double"
                    className="rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm">Activities</Label>
                {day.activities.map((activity, actIndex) => (
                  <div key={actIndex} className="flex items-center space-x-2">
                    <Input
                      value={activity}
                      onChange={(e) => {
                        const updated = [...itinerary]
                        updated[index].activities[actIndex] = e.target.value
                        setItinerary(updated)
                      }}
                      placeholder="Activity description"
                      className="rounded-xl text-sm"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const updated = [...itinerary]
                        updated[index].activities = updated[index].activities.filter((_, i) => i !== actIndex)
                        setItinerary(updated)
                      }}
                      className="rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const updated = [...itinerary]
                    updated[index].activities.push("")
                    setItinerary(updated)
                  }}
                  className="rounded-xl py-3"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      <motion.div variants={itemVariants}>
        <Button onClick={addItineraryDay} className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 py-3">
          <Plus className="h-4 w-4 mr-2" />
          Add Day
        </Button>
      </motion.div>
    </motion.div>
  )

  const renderInclusions = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <motion.div variants={itemVariants}>
        <Card className="border-2 border-green-200 rounded-3xl">
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-semibold text-green-800 flex items-center">
              <CheckCircle className="h-6 w-6 mr-2" />
              What's Included
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            {included.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={item}
                  onChange={(e) => updateListItem(included, setIncluded, index, e.target.value)}
                  placeholder="e.g., 7 nights accommodation in eco-friendly hotels"
                  className="rounded-xl text-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeListItem(included, setIncluded, index)}
                  className="rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addListItem(included, setIncluded)}
              className="rounded-xl border-green-300 text-green-600 hover:bg-green-50 py-3"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Inclusion
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-2 border-red-200 rounded-3xl">
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-semibold text-red-800 flex items-center">
              <X className="h-6 w-6 mr-2" />
              What's Not Included
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            {notIncluded.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={item}
                  onChange={(e) => updateListItem(notIncluded, setNotIncluded, index, e.target.value)}
                  placeholder="e.g., International flights to/from destination"
                  className="rounded-xl text-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeListItem(notIncluded, setNotIncluded, index)}
                  className="rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addListItem(notIncluded, setNotIncluded)}
              className="rounded-xl border-red-300 text-red-600 hover:bg-red-50 py-3"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Exclusion
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )

  const renderTransport = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants}>
        <Card className="border-2 border-blue-200 rounded-3xl">
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-semibold text-blue-800 flex items-center">
              <Plane className="h-6 w-6 mr-2" />
              Getting to Destination
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Primary Transport</Label>
                <Input placeholder="e.g., Commercial Flight" className="rounded-xl text-sm" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Duration</Label>
                <Input placeholder="e.g., Varies by departure city" className="rounded-xl text-sm" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Description</Label>
              <Textarea
                placeholder="Describe how travelers get to the destination..."
                className="rounded-xl text-sm"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-2 border-green-200 rounded-3xl">
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-semibold text-green-800 flex items-center">
              <Car className="h-6 w-6 mr-2" />
              Local Transportation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <div className="space-y-2">
              <Label className="text-sm">Transport Type</Label>
              <Input placeholder="e.g., Electric Vehicles & E-bikes" className="rounded-xl text-sm" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Description</Label>
              <Textarea
                placeholder="Describe local transportation options..."
                className="rounded-xl text-sm"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )

  const renderRestrictions = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants}>
        <Card className="border-2 border-yellow-200 rounded-3xl">
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-semibold text-yellow-800 flex items-center">
              <AlertTriangle className="h-6 w-6 mr-2" />
              Important Restrictions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            {restrictions.map((restriction, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={restriction}
                  onChange={(e) => updateListItem(restrictions, setRestrictions, index, e.target.value)}
                  placeholder="e.g., Minimum age: 12 years old"
                  className="rounded-xl text-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeListItem(restrictions, setRestrictions, index)}
                  className="rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addListItem(restrictions, setRestrictions)}
              className="rounded-xl border-yellow-300 text-yellow-600 hover:bg-yellow-50 py-3"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Restriction
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )

  const renderOperator = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants}>
        <Card className="border-2 border-purple-200 rounded-3xl">
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-semibold text-purple-800 flex items-center">
              <Star className="h-6 w-6 mr-2" />
              Tour Operator Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Company Name</Label>
                <Input placeholder="e.g., EcoWander Adventures" className="rounded-xl text-sm" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Founded Year</Label>
                <Input placeholder="e.g., 2010" className="rounded-xl text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Experience</Label>
                <Input placeholder="e.g., 15+ years" className="rounded-xl text-sm" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Total Tours</Label>
                <Input placeholder="e.g., 500+ successful tours" className="rounded-xl text-sm" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Certification</Label>
              <Input placeholder="e.g., Certified Sustainable Tourism" className="rounded-xl text-sm" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Languages Supported</Label>
              <Input placeholder="e.g., English, Greek, German, French" className="rounded-xl text-sm" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )

  const renderPricing = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants}>
        <Card className="border-2 border-green-200 rounded-3xl">
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-semibold text-green-800 flex items-center">
              <DollarSign className="h-6 w-6 mr-2" />
              Tour Pricing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Current Price</Label>
                <Input
                  placeholder="e.g., 1299"
                  type="number"
                  value={formData.currentPrice}
                  onChange={(e) => updateFormData("currentPrice", e.target.value)}
                  className="rounded-xl text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Original Price</Label>
                <Input
                  placeholder="e.g., 1599"
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => updateFormData("originalPrice", e.target.value)}
                  className="rounded-xl text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Currency</Label>
                <Select value={formData.currency} onValueChange={(value) => updateFormData("currency", value)}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Discount Percentage</Label>
                <Input
                  placeholder="e.g., 18"
                  type="number"
                  value={formData.discountPercentage}
                  onChange={(e) => updateFormData("discountPercentage", e.target.value)}
                  className="rounded-xl text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Pricing Notes</Label>
              <Textarea
                placeholder="Any additional pricing information..."
                value={formData.pricingNotes}
                onChange={(e) => updateFormData("pricingNotes", e.target.value)}
                className="rounded-xl text-sm"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return renderBasicInfo()
      case "spots":
        return renderSpots()
      case "images":
        return renderImages()
      case "itinerary":
        return renderItinerary()
      case "inclusions":
        return renderInclusions()
      case "transport":
        return renderTransport()
      case "restrictions":
        return renderRestrictions()
      case "operator":
        return renderOperator()
      case "pricing":
        return renderPricing()
      default:
        return renderBasicInfo()
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">Launch New Tour</h1>
            <p className="mt-1 text-sm text-gray-500">Create and publish a new tour experience for your customers.</p>
          </div>
          <div className="mt-4 flex space-x-3 md:ml-4 md:mt-0">
            <Button variant="outline" className="rounded-lg">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? "Creating..." : "Save & Publish"}
            </Button>
            {submitMessage && (
              <div className={`mt-2 text-sm ${submitMessage.includes("success") ? "text-green-600" : "text-red-600"}`}>
                {submitMessage}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="space-y-1">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="font-medium text-sm">{tab.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
