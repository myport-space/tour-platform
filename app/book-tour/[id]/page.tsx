"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  CalendarIcon,
  Users,
  User,
  MapPin,
  CreditCard,
  Shield,
  CheckCircle,
  Star,
  Clock,
  Heart,
  Plus,
  Minus,
  Info,
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

interface BookTourProps {
  params: {
    id: string
  }
}

export default function BookTour({ params }: BookTourProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [travelers, setTravelers] = useState(1)
  const [step, setStep] = useState(1)

  // Sample tour data
  const tour = {
    id: params.id,
    title: "Santorini Sunset Paradise",
    location: "Santorini, Greece",
    duration: "7 Days",
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviews: 234,
    image: "https://res.cloudinary.com/dnsc6ccwp/image/upload/v1748534256/backpacker-772991_qtegir.jpg",
    availableDates: [
      new Date(2024, 3, 15), // April 15
      new Date(2024, 3, 22), // April 22
      new Date(2024, 4, 6), // May 6
      new Date(2024, 4, 13), // May 13
      new Date(2024, 4, 20), // May 20
    ],
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

  const calculateTotal = () => {
    const subtotal = tour.price * travelers
    const taxes = subtotal * 0.1
    const serviceFee = 50
    return {
      subtotal,
      taxes,
      serviceFee,
      total: subtotal + taxes + serviceFee,
    }
  }

  const pricing = calculateTotal()

  const renderStep1 = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      {/* Date Selection */}
      <motion.div variants={itemVariants}>
        <Card className="border-2 border-blue-200 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-blue-800 flex items-center">
              <CalendarIcon className="h-6 w-6 mr-2" />
              Select Departure Date
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal rounded-xl h-12">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => !tour.availableDates.some((d) => d.toDateString() === date.toDateString())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Available Dates</h4>
                <div className="space-y-2">
                  {tour.availableDates.map((date, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedDate(date)}
                      className={`w-full text-left p-3 rounded-xl border-2 transition-all duration-200 ${
                        selectedDate?.toDateString() === date.toDateString()
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <div className="font-medium text-sm">{format(date, "EEEE, MMMM d, yyyy")}</div>
                      <div className="text-sm text-gray-500">8 spots available</div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Travelers Selection */}
      <motion.div variants={itemVariants}>
        <Card className="border-2 border-green-200 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-green-800 flex items-center">
              <Users className="h-6 w-6 mr-2" />
              Number of Travelers
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900 text-sm">Adults</div>
                <div className="text-sm text-gray-500">Age 18+</div>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  className="rounded-full w-10 h-10"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-bold w-8 text-center">{travelers}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTravelers(Math.min(12, travelers + 1))}
                  className="rounded-full w-10 h-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )

  const renderStep2 = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      {/* Lead Traveler Information */}
      <motion.div variants={itemVariants}>
        <Card className="border-2 border-purple-200 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-purple-800 flex items-center">
              <User className="h-6 w-6 mr-2" />
              Lead Traveler Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm">
                  First Name
                </Label>
                <Input id="firstName" placeholder="John" className="rounded-xl text-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm">
                  Last Name
                </Label>
                <Input id="lastName" placeholder="Doe" className="rounded-xl text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">
                  Email Address
                </Label>
                <Input id="email" type="email" placeholder="john@example.com" className="rounded-xl text-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm">
                  Phone Number
                </Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" className="rounded-xl text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-sm">
                  Date of Birth
                </Label>
                <Input id="dateOfBirth" type="date" className="rounded-xl text-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality" className="text-sm">
                  Nationality
                </Label>
                <Select>
                  <SelectTrigger className="rounded-xl text-sm">
                    <SelectValue placeholder="Select nationality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm">
                Address
              </Label>
              <Textarea
                id="address"
                placeholder="123 Main St, City, State, ZIP"
                className="rounded-xl text-sm"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Additional Travelers */}
      {travelers > 1 && (
        <motion.div variants={itemVariants}>
          <Card className="border-2 border-orange-200 rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-orange-800 flex items-center">
                <Users className="h-6 w-6 mr-2" />
                Additional Travelers ({travelers - 1})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-4">
              {Array.from({ length: travelers - 1 }, (_, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-2xl space-y-4">
                  <h4 className="font-semibold text-gray-900 text-sm">Traveler {index + 2}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">First Name</Label>
                      <Input placeholder="First name" className="rounded-xl text-sm" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Last Name</Label>
                      <Input placeholder="Last name" className="rounded-xl text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Date of Birth</Label>
                      <Input type="date" className="rounded-xl text-sm" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Nationality</Label>
                      <Select>
                        <SelectTrigger className="rounded-xl text-sm">
                          <SelectValue placeholder="Select nationality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Special Requests */}
      <motion.div variants={itemVariants}>
        <Card className="border-2 border-gray-200 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
              <Info className="h-6 w-6 mr-2" />
              Special Requests & Dietary Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <div className="space-y-2">
              <Label htmlFor="dietary" className="text-sm">
                Dietary Requirements
              </Label>
              <Select>
                <SelectTrigger className="rounded-xl text-sm">
                  <SelectValue placeholder="Select dietary requirements" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No special requirements</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="gluten-free">Gluten-free</SelectItem>
                  <SelectItem value="halal">Halal</SelectItem>
                  <SelectItem value="kosher">Kosher</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="requests" className="text-sm">
                Special Requests
              </Label>
              <Textarea
                id="requests"
                placeholder="Any special requests, accessibility needs, or additional information..."
                className="rounded-xl text-sm"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )

  const renderStep3 = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      {/* Payment Information */}
      <motion.div variants={itemVariants}>
        <Card className="border-2 border-green-200 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-green-800 flex items-center">
              <CreditCard className="h-6 w-6 mr-2" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber" className="text-sm">
                Card Number
              </Label>
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="rounded-xl text-sm" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryMonth" className="text-sm">
                  Expiry Month
                </Label>
                <Select>
                  <SelectTrigger className="rounded-xl text-sm">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i + 1} value={String(i + 1).padStart(2, "0")}>
                        {String(i + 1).padStart(2, "0")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryYear" className="text-sm">
                  Expiry Year
                </Label>
                <Select>
                  <SelectTrigger className="rounded-xl text-sm">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => (
                      <SelectItem key={2024 + i} value={String(2024 + i)}>
                        {2024 + i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv" className="text-sm">
                  CVV
                </Label>
                <Input id="cvv" placeholder="123" className="rounded-xl text-sm" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardName" className="text-sm">
                Name on Card
              </Label>
              <Input id="cardName" placeholder="John Doe" className="rounded-xl text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billingAddress" className="text-sm">
                Billing Address
              </Label>
              <Textarea
                id="billingAddress"
                placeholder="Same as contact address"
                className="rounded-xl text-sm"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Terms and Conditions */}
      <motion.div variants={itemVariants}>
        <Card className="border-2 border-blue-200 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-blue-800 flex items-center">
              <Shield className="h-6 w-6 mr-2" />
              Terms & Conditions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1" />
                <div className="text-sm text-gray-600">
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1" />
                <div className="text-sm text-gray-600">
                  I understand the{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Cancellation Policy
                  </a>{" "}
                  and booking terms
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1" />
                <div className="text-sm text-gray-600">
                  I would like to receive updates and promotional offers via email
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-gray-200 px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={`/tour/${params.id}`}>
              <Button variant="outline" className="rounded-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tour
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Book Your Adventure</h1>
              <p className="text-gray-600 mt-1">Complete your booking in {3} easy steps</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step >= stepNumber
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {stepNumber}
              </div>
            ))}
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-4 py-2 rounded-full">
                  Step {step} of 3
                </Badge>
                <h2 className="text-lg font-semibold text-gray-900">
                  {step === 1 && "Select Date & Travelers"}
                  {step === 2 && "Traveler Information"}
                  {step === 3 && "Payment & Confirmation"}
                </h2>
              </div>
            </div>

            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between mt-8"
            >
              <Button
                variant="outline"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="rounded-xl px-6 py-2"
              >
                Previous
              </Button>
              <Button
                onClick={() => {
                  if (step < 3) {
                    setStep(step + 1)
                  } else {
                    // Handle booking submission
                    alert("Booking submitted!")
                  }
                }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl px-6 py-2"
              >
                {step === 3 ? "Complete Booking" : "Continue"}
              </Button>
            </motion.div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="sticky top-8">
              <Card className="border-2 border-gray-200 rounded-3xl">
                <CardHeader>
                  <CardTitle className="text-base font-semibold">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-4">
                  {/* Tour Info */}
                  <div className="space-y-4">
                    <img
                      src={tour.image || "/placeholder.svg"}
                      alt={tour.title}
                      className="w-full h-48 object-cover rounded-2xl"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{tour.title}</h3>
                      <div className="flex items-center text-gray-600 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{tour.location}</span>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{tour.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>{tour.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Booking Details */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 text-sm">Booking Details</h4>
                    {selectedDate && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Departure Date</span>
                        <span className="font-medium">{format(selectedDate, "MMM d, yyyy")}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Travelers</span>
                      <span className="font-medium">
                        {travelers} Adult{travelers > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  {/* Pricing */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 text-sm">Price Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          ${tour.price} x {travelers} traveler{travelers > 1 ? "s" : ""}
                        </span>
                        <span className="font-medium">${pricing.subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Taxes & fees</span>
                        <span className="font-medium">${pricing.taxes.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Service fee</span>
                        <span className="font-medium">${pricing.serviceFee}</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-green-600">${pricing.total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Guarantees */}
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex items-center text-sm text-gray-600">
                      <Shield className="h-4 w-4 mr-2 text-green-500" />
                      <span>Free cancellation up to 48 hours</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Heart className="h-4 w-4 mr-2 text-green-500" />
                      <span>Carbon neutral travel included</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      <span>Best price guarantee</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
