"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/Header"
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import {
  Star,
  MapPin,
  Clock,
  Users,
  Calendar,
  ArrowLeft,
  Phone,
  CheckCircle,
  X,
  Car,
  Bike,
  Shield,
  Heart,
  Award,
  User,
  AlertTriangle,
  Leaf,
  Plane,
  Bus,
  Navigation,
  Utensils,
  Coffee,
  Wine,
  Share2,
  Globe,
  Home,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TourDetailsProps {
  params: {
    id: string
  }
}

type ReviewType = {
  name: string
  rating: number
  date: string
  comment: string
}

export default function TourDetails({ params }: TourDetailsProps) {
  const [showStickyBooking, setShowStickyBooking] = useState(false)
  const [currentItinerarySlide, setCurrentItinerarySlide] = useState(0)

  useEffect(() => {
    //const handleScroll = () => {
    // const scrollPosition = window.scrollY
    //const windowHeight = window.innerHeight
    //setShowStickyBooking(scrollPosition > windowHeight * 0.8)
    //}
    //window.addEventListener("scroll", handleScroll)
    //return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const tour = {
    id: params.id,
    title: "Santorini Sunset Paradise",
    location: "Santorini, Greece",
    tourType: "global", // "in-country" or "global"
    originCountry: "Pakistan",
    destinationCountry: "Greece",
    duration: "7 Days",
    stayNights: 6,
    groupSize: "12 People",
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviews: 234,
    images: [
      {
        url: "https://res.cloudinary.com/dnsc6ccwp/image/upload/v1748534256/backpacker-772991_qtegir.jpg",
        title: "Breathtaking Sunset Views",
        description: "Experience the world-famous Santorini sunsets from the best vantage points on the island",
      },
      {
        url: "https://res.cloudinary.com/dnsc6ccwp/image/upload/v1748534253/hallstatt-3609863_mpb94y.jpg",
        title: "Traditional Greek Villages",
        description: "Explore authentic whitewashed villages with blue-domed churches and narrow cobblestone streets",
      },
      {
        url: "https://res.cloudinary.com/dnsc6ccwp/image/upload/v1748534259/mountain-5092625_t0lga6.jpg",
        title: "Volcanic Landscapes",
        description: "Discover the unique volcanic terrain and dramatic cliffs that make Santorini so special",
      },
      {
        url: "https://res.cloudinary.com/dnsc6ccwp/image/upload/v1748534258/lake-1681485_xtuz3o.jpg",
        title: "Crystal Clear Waters",
        description: "Swim in pristine Aegean waters and relax on unique black sand beaches",
      },
      {
        url: "https://res.cloudinary.com/dnsc6ccwp/image/upload/v1748534261/man-1834849_p8nojm.jpg",
        title: "Adventure Activities",
        description: "Enjoy hiking, sailing, and other exciting activities with stunning island views",
      },
    ],
    description:
      "Experience the magic of Santorini with breathtaking sunsets, pristine beaches, and authentic Greek culture. This eco-friendly tour combines luxury with sustainability, offering you the chance to explore one of the world's most beautiful islands while minimizing your environmental impact.",
    highlights: [
      "Blue Dome Churches Photography",
      "Organic Wine Tasting Experience",
      "Sunset Cruise with Local Guide",
      "Traditional Village Walking Tours",
      "Sustainable Cooking Classes",
      "Beach Conservation Activities",
      "Private Caldera Views",
      "Archaeological Site Visits",
    ],
    included: [
      "7 nights accommodation in eco-friendly hotels",
      "All meals featuring local organic ingredients",
      "Professional eco-guide throughout the trip",
      "All transportation in electric vehicles",
      "Entrance fees to all attractions",
      "Travel insurance coverage",
      "Carbon offset for your entire journey",
      "Welcome and farewell dinners",
      "24/7 emergency support",
      "Complimentary Wi-Fi",
    ],
    notIncluded: [
      "International flights to/from Santorini",
      "Personal expenses and souvenirs",
      "Optional spa treatments",
      "Alcoholic beverages (except wine tasting)",
      "Tips for guides and drivers",
      "Laundry services",
      "Room service charges",
      "Travel visa fees",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Oia Exploration",
        description: "Arrive in Santorini, check into eco-lodge, explore Oia village and sunset viewing",
        image: "https://res.cloudinary.com/dnsc6ccwp/image/upload/v1748534253/hallstatt-3609863_mpb94y.jpg",
        meals: {
          breakfast: null,
          lunch: "Welcome lunch at traditional taverna",
          dinner: "Sunset dinner with local specialties",
        },
        activities: ["Airport transfer", "Hotel check-in", "Oia village tour", "Sunset viewing point"],
        accommodation: {
          name: "Santorini Eco Lodge",
          type: "Hotel",
          address: "Oia Village, Santorini, Greece",
          checkIn: "3:00 PM",
          checkOut: "11:00 AM",
          roomType: "Deluxe Sea View Room",
        },
      },
      {
        day: 2,
        title: "Fira & Cultural Immersion",
        description: "Visit Fira town, archaeological museum, traditional pottery workshop",
        image: "https://res.cloudinary.com/dnsc6ccwp/image/upload/v1748534256/backpacker-772991_qtegir.jpg",
        meals: {
          breakfast: "Continental breakfast at hotel",
          lunch: "Picnic lunch with local products",
          dinner: "Traditional Greek dinner with live music",
        },
        activities: ["Fira town exploration", "Archaeological museum", "Pottery workshop", "Cable car ride"],
        accommodation: {
          name: "Santorini Eco Lodge",
          type: "Hotel",
          address: "Oia Village, Santorini, Greece",
          checkIn: "Already checked in",
          checkOut: "11:00 AM (Day 7)",
          roomType: "Deluxe Sea View Room",
        },
      },
      {
        day: 3,
        title: "Wine Country & Vineyards",
        description: "Organic vineyard tours, wine tasting, sustainable farming practices",
        image: "https://res.cloudinary.com/dnsc6ccwp/image/upload/v1748534259/mountain-5092625_t0lga6.jpg",
        meals: {
          breakfast: "Organic breakfast at vineyard",
          lunch: "Farm-to-table lunch with wine pairing",
          dinner: "Gourmet dinner at award-winning restaurant",
        },
        activities: ["Vineyard tours", "Wine tasting sessions", "Sustainable farming workshop", "Cooking class"],
        accommodation: {
          name: "Santorini Eco Lodge",
          type: "Hotel",
          address: "Oia Village, Santorini, Greece",
          checkIn: "Already checked in",
          checkOut: "11:00 AM (Day 7)",
          roomType: "Deluxe Sea View Room",
        },
      },
      {
        day: 4,
        title: "Beach Conservation Day",
        description: "Beach cleanup activities, marine life protection, snorkeling",
        image: "https://res.cloudinary.com/dnsc6ccwp/image/upload/v1748534258/lake-1681485_xtuz3o.jpg",
        meals: {
          breakfast: "Healthy breakfast buffet",
          lunch: "Beachside seafood lunch",
          dinner: "BBQ dinner on the beach",
        },
        activities: ["Beach conservation project", "Snorkeling expedition", "Marine life education", "Beach games"],
        accommodation: {
          name: "Santorini Eco Lodge",
          type: "Hotel",
          address: "Oia Village, Santorini, Greece",
          checkIn: "Already checked in",
          checkOut: "11:00 AM (Day 7)",
          roomType: "Deluxe Sea View Room",
        },
      },
      {
        day: 5,
        title: "Traditional Villages",
        description: "Pyrgos and Megalochori village tours, local artisan workshops",
        image: "https://res.cloudinary.com/dnsc6ccwp/image/upload/v1748534261/man-1834849_p8nojm.jpg",
        meals: {
          breakfast: "Village bakery breakfast",
          lunch: "Home-cooked meal with local family",
          dinner: "Traditional feast at village square",
        },
        activities: ["Pyrgos village tour", "Megalochori exploration", "Artisan workshops", "Local market visit"],
        accommodation: {
          name: "Santorini Eco Lodge",
          type: "Hotel",
          address: "Oia Village, Santorini, Greece",
          checkIn: "Already checked in",
          checkOut: "11:00 AM (Day 7)",
          roomType: "Deluxe Sea View Room",
        },
      },
      {
        day: 6,
        title: "Sailing & Sunset Cruise",
        description: "Full day sailing trip, swimming, sunset dinner on boat",
        image: "https://res.cloudinary.com/dnsc6ccwp/image/upload/v1748534256/backpacker-772991_qtegir.jpg",
        meals: {
          breakfast: "Light breakfast on board",
          lunch: "Fresh seafood lunch on boat",
          dinner: "Romantic sunset dinner cruise",
        },
        activities: ["Sailing expedition", "Swimming stops", "Volcano visit", "Hot springs"],
        accommodation: {
          name: "Santorini Eco Lodge",
          type: "Hotel",
          address: "Oia Village, Santorini, Greece",
          checkIn: "Already checked in",
          checkOut: "11:00 AM (Day 7)",
          roomType: "Deluxe Sea View Room",
        },
      },
      {
        day: 7,
        title: "Departure",
        description: "Final breakfast, souvenir shopping, departure transfers",
        image: "https://res.cloudinary.com/dnsc6ccwp/image/upload/v1748534258/lake-1681485_xtuz3o.jpg",
        meals: {
          breakfast: "Farewell breakfast with group",
          lunch: null,
          dinner: null,
        },
        activities: ["Souvenir shopping", "Final group photos", "Airport transfer"],
        accommodation: {
          name: "Santorini Eco Lodge",
          type: "Hotel",
          address: "Oia Village, Santorini, Greece",
          checkIn: "Already checked in",
          checkOut: "11:00 AM (Day 7)",
          roomType: "Deluxe Sea View Room",
        },
      },
    ],
    tourOperator: {
      name: "EcoWander Adventures",
      rating: 4.8,
      experience: "15+ years",
      certification: "Certified Sustainable Tourism",
      guides: "Local Expert Guides",
      insurance: "Full Coverage Included",
      languages: ["English", "Greek", "German", "French"],
      groupSizes: "Small groups (8-12 people)",
      founded: "2010",
      totalTours: "500+ successful tours",
    },
    transportation: {
      toDestination: {
        primary: "Commercial Flight",
        icon: Plane,
        description: "Fly to Santorini (JTR) Airport from major international hubs",
        duration: "Varies by departure city",
        details: [
          "Direct flights available from Athens (45 minutes)",
          "Connecting flights from major European cities",
          "Airport transfer included in package",
          "Meet & greet service at arrival",
        ],
      },
      localTransport: {
        type: "Electric Vehicles & E-bikes",
        description:
          "All ground transportation provided in eco-friendly electric vehicles and e-bikes for short distances",
        features: [
          "Air-conditioned electric buses for group transfers",
          "E-bike rentals included for village exploration",
          "Walking tours in historic areas",
          "Private electric vehicle for airport transfers",
          "Boat transfers for island hopping",
        ],
        vehicles: [
          { type: "Electric Bus", icon: Bus, usage: "Group transfers and sightseeing" },
          { type: "E-bikes", icon: Bike, usage: "Village exploration and short distances" },
          { type: "Electric Van", icon: Car, usage: "Airport transfers and small group tours" },
          { type: "Walking", icon: Navigation, usage: "Historic sites and village centers" },
        ],
      },
    },
    restrictions: [
      "Minimum age: 12 years old",
      "Maximum age: 75 years old",
      "Moderate fitness level required for walking tours",
      "Not suitable for wheelchair users due to terrain",
      "No serious medical conditions",
      "Must be able to walk 3-5 km daily",
      "Swimming ability required for water activities",
      "Valid passport required (6+ months validity)",
    ],
    reviewsList: [
      {
        name: "Sarah Johnson",
        rating: 5,
        date: "March 2024",
        comment:
          "Absolutely incredible experience! The eco-friendly approach made it even more special. Our guide Maria was fantastic and the sunset views were breathtaking. The accommodations were perfect and the food was amazing.",
      },
      {
        name: "Michael Chen",
        rating: 5,
        date: "February 2024",
        comment:
          "Perfect blend of adventure and sustainability. The wine tasting was amazing and I loved learning about local conservation efforts. The small group size made it feel very personal and intimate.",
      },
      {
        name: "Emma Rodriguez",
        rating: 4,
        date: "January 2024",
        comment:
          "Great tour overall! The accommodations were comfortable and the food was delicious. Would definitely recommend to eco-conscious travelers. Only minor issue was some activities felt rushed.",
      },
      {
        name: "David Thompson",
        rating: 5,
        date: "December 2023",
        comment:
          "This was our honeymoon trip and it exceeded all expectations. The sunset cruise was magical and the local guides were incredibly knowledgeable. Every detail was perfectly planned.",
      },
    ],
  }

  // Animation variants
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section with Gallery on Left */}
      <section className="relative min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-16 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 md:mb-8"
          >
            <Link href="/">
              <Button
                variant="outline"
                className="border-2 border-green-500 text-green-600 hover:bg-green-50 rounded-full px-4 md:px-6 py-2 md:py-3 text-sm transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Tours
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-12 items-start">
            {/* Left Side - Image Gallery (Larger Area) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-3"
            >
              <div className="grid grid-cols-2 gap-4 h-full">
                {/* Main large image */}
                <div className="col-span-2 relative rounded-2xl overflow-hidden h-64 md:h-80">
                  <img
                    src={tour.images[0].url || "/placeholder.svg"}
                    alt={tour.images[0].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg md:text-xl font-bold mb-2">{tour.images[0].title}</h3>
                    <p className="text-white/90 text-sm">{tour.images[0].description}</p>
                  </div>
                </div>

                {/* Smaller gallery images */}
                {tour.images.slice(1, 5).map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative rounded-xl overflow-hidden h-32 md:h-40 cursor-pointer group"
                  >
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-2 left-2 right-2 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-xs font-bold mb-1">{image.title}</p>
                      <p className="text-xs text-white/90 line-clamp-2">{image.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Content & Pricing (Smaller Area) */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              {/* Tour Badges */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap gap-2 md:gap-4"
              >
                <Badge className="bg-green-500 text-white border-0 px-3 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm">
                  <Leaf className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  Eco-Friendly Tour
                </Badge>
                <Badge
                  className={`border-0 px-3 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm ${
                    tour.tourType === "global" ? "bg-blue-500 text-white" : "bg-purple-500 text-white"
                  }`}
                >
                  <Globe className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  {tour.tourType === "global" ? "Global Tour" : "In-Country Tour"}
                </Badge>
                <Badge className="bg-red-500 text-white border-0 px-3 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm">
                  Save ${tour.originalPrice - tour.price}
                </Badge>
              </motion.div>

              {/* Title & Location */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  {tour.title}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-6 mb-4 md:mb-6">
                  <div className="flex items-center text-gray-600 text-sm md:text-base">
                    <MapPin className="h-4 w-4 md:h-5 md:w-5 mr-2 text-green-500" />
                    <span className="font-medium">{tour.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm md:text-base">
                    <Star className="h-4 w-4 md:h-5 md:w-5 fill-yellow-400 text-yellow-400 mr-2" />
                    <span className="font-bold">{tour.rating}</span>
                    <span className="ml-2">({tour.reviews} reviews)</span>
                  </div>
                </div>
              </motion.div>

              {/* Simple Tour Details - No Boxes */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-6 md:gap-8"
              >
                <div className="flex items-center text-gray-700">
                  <Clock className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm md:text-base font-medium">
                    {tour.duration} ({tour.stayNights} nights)
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Users className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm md:text-base font-medium">{tour.groupSize}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="text-sm md:text-base font-medium">Apr 15</span>
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-sm md:text-base text-gray-600 leading-relaxed"
              >
                {tour.description}
              </motion.p>

              {/* Pricing Card */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                variants={cardVariants}
                whileHover="hover"
              >
                <Card className="border-2 border-green-200 rounded-2xl md:rounded-3xl overflow-hidden bg-white shadow-xl">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 md:p-6 text-white">
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-black text-white mb-2">${tour.price}</div>
                      <div className="text-base md:text-lg text-green-100 line-through">${tour.originalPrice}</div>
                      <div className="text-sm text-green-100">per person</div>
                    </div>
                  </div>
                  <CardContent className="p-4 md:p-6">
                    <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-base md:text-lg py-4 md:py-6 rounded-xl md:rounded-2xl transition-all duration-300">
                          Book This Adventure
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant="outline"
                          className="w-full border-2 border-green-500 text-green-600 hover:bg-green-50 text-sm md:text-base py-4 md:py-6 rounded-xl md:rounded-2xl transition-all duration-300"
                        >
                          <Phone className="mr-2 h-4 w-4" />
                          Call for Details
                        </Button>
                      </motion.div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 md:gap-3 text-center text-xs md:text-sm text-gray-600">
                      {[
                        { icon: Shield, text: "Free cancellation up to 48 hours" },
                        { icon: Heart, text: "Carbon neutral travel included" },
                        { icon: Award, text: "Best price guarantee" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-center">
                          <item.icon className="h-3 w-3 md:h-4 md:w-4 mr-2 text-green-500" />
                          {item.text}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="grid grid-cols-2 gap-3 md:gap-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-gray-200 rounded-xl md:rounded-2xl py-3 md:py-4 text-sm"
                  >
                    <Share2 className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                    Share
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-gray-200 rounded-xl md:rounded-2xl py-3 md:py-4 text-sm"
                  >
                    <Heart className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                    Save
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
          {tour.tourType === "global" && (
            <div className="flex items-center text-gray-600 text-sm md:text-base mt-2">
              <Plane className="h-4 w-4 md:h-5 md:w-5 mr-2 text-blue-500" />
              <span className="font-medium">
                {tour.originCountry} → {tour.destinationCountry}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Main Content Tabs Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="highlights" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-100 p-1 rounded-2xl">
              <TabsTrigger
                value="highlights"
                className="rounded-xl py-3 text-sm font-medium data-[state=active]:bg-green-500 data-[state=active]:text-white"
              >
                Highlights
              </TabsTrigger>
              <TabsTrigger
                value="included"
                className="rounded-xl py-3 text-sm font-medium data-[state=active]:bg-green-500 data-[state=active]:text-white"
              >
                Included
              </TabsTrigger>
              <TabsTrigger
                value="itinerary"
                className="rounded-xl py-3 text-sm font-medium data-[state=active]:bg-green-500 data-[state=active]:text-white"
              >
                Itinerary
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="rounded-xl py-3 text-sm font-medium data-[state=active]:bg-green-500 data-[state=active]:text-white"
              >
                Details
              </TabsTrigger>
            </TabsList>

            {/* Tour Highlights Tab */}
            <TabsContent value="highlights" className="mt-0">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-3">
                    Tour Highlights
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                    Discover the amazing experiences waiting for you on this incredible journey
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tour.highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-4 rounded-xl hover:border-green-400 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-full p-2 mr-3">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-800">{highlight}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* What's Included Tab */}
            <TabsContent value="included" className="mt-0">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-3">
                    What's Included
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                    Everything you need for an amazing and worry-free experience
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Included in Your Package
                    </h3>
                    <div className="space-y-3">
                      {tour.included.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          whileHover={{ scale: 1.01, x: 5 }}
                          className="bg-white border border-green-200 p-3 rounded-lg hover:border-green-400 transition-all duration-300"
                        >
                          <div className="flex items-start">
                            <CheckCircle className="h-4 w-4 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-red-700 mb-4 flex items-center">
                      <X className="h-5 w-5 mr-2" />
                      Not Included
                    </h3>
                    <div className="space-y-3">
                      {tour.notIncluded.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          whileHover={{ scale: 1.01, x: -5 }}
                          className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 p-3 rounded-lg hover:border-red-400 transition-all duration-300"
                        >
                          <div className="flex items-start">
                            <X className="h-4 w-4 mr-3 text-red-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* Day by Day Itinerary Tab with Dots */}
            <TabsContent value="itinerary" className="mt-0">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent mb-3">
                    Day by Day Itinerary
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                    Your complete journey breakdown with detailed activities and meals
                  </p>
                </div>

                {/* Shadcn Itinerary Carousel */}
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  plugins={[
                    Autoplay({
                      delay: 5000,
                    }),
                  ]}
                  className="w-full"
                  setApi={(api) => {
                    if (api) {
                      api.on("select", () => {
                        setCurrentItinerarySlide(api.selectedScrollSnap())
                      })
                    }
                  }}
                >
                  <CarouselContent>
                    {tour.itinerary.map((item, index) => (
                      <CarouselItem key={index}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 shadow-lg h-full"
                        >
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                            {/* Details on left for desktop, full width for mobile */}
                            <div className="lg:order-1 space-y-4">
                              <div className="flex items-center space-x-3">
                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                                  Day {item.day}
                                </div>
                              </div>

                              <h4 className="text-xl font-bold text-gray-900">{item.title}</h4>
                              <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>

                              {/* Meals */}
                              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                                <h5 className="font-semibold text-blue-700 flex items-center mb-3 text-sm">
                                  <Utensils className="h-4 w-4 mr-2" />
                                  Meals Included
                                </h5>
                                <div className="space-y-2">
                                  {item.meals.breakfast && (
                                    <div className="flex items-center text-gray-700 text-xs">
                                      <Coffee className="h-3 w-3 mr-2 text-orange-500" />
                                      <span className="font-medium mr-2">Breakfast:</span>
                                      <span>{item.meals.breakfast}</span>
                                    </div>
                                  )}
                                  {item.meals.lunch && (
                                    <div className="flex items-center text-gray-700 text-xs">
                                      <Utensils className="h-3 w-3 mr-2 text-blue-500" />
                                      <span className="font-medium mr-2">Lunch:</span>
                                      <span>{item.meals.lunch}</span>
                                    </div>
                                  )}
                                  {item.meals.dinner && (
                                    <div className="flex items-center text-gray-700 text-xs">
                                      <Wine className="h-3 w-3 mr-2 text-purple-500" />
                                      <span className="font-medium mr-2">Dinner:</span>
                                      <span>{item.meals.dinner}</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Accommodation */}
                              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
                                <h5 className="font-semibold text-purple-700 flex items-center mb-3 text-sm">
                                  <Home className="h-4 w-4 mr-2" />
                                  Accommodation
                                </h5>
                                <div className="space-y-2">
                                  <div className="flex items-center text-gray-700 text-xs">
                                    <span className="font-medium mr-2">Hotel:</span>
                                    <span>{item.accommodation.name}</span>
                                  </div>
                                  <div className="flex items-center text-gray-700 text-xs">
                                    <span className="font-medium mr-2">Type:</span>
                                    <span>{item.accommodation.type}</span>
                                  </div>
                                  <div className="flex items-center text-gray-700 text-xs">
                                    <span className="font-medium mr-2">Room:</span>
                                    <span>{item.accommodation.roomType}</span>
                                  </div>
                                  {item.accommodation.checkIn && (
                                    <div className="flex items-center text-gray-700 text-xs">
                                      <span className="font-medium mr-2">Check-in:</span>
                                      <span>{item.accommodation.checkIn}</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Activities */}
                              <div className="space-y-2">
                                <h5 className="font-semibold text-green-600 text-sm">Activities</h5>
                                <div className="flex flex-wrap gap-2">
                                  {item.activities.map((activity, actIndex) => (
                                    <motion.div
                                      key={actIndex}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ duration: 0.2, delay: actIndex * 0.05 }}
                                      whileHover={{ scale: 1.05 }}
                                      className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200 px-2 py-1 rounded-full text-xs cursor-pointer"
                                    >
                                      {activity}
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Image on right for desktop, top for mobile */}
                            <div className="lg:order-2">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={`Day ${item.day}`}
                                className="rounded-xl h-48 lg:h-64 w-full object-cover transition-transform duration-300"
                              />
                            </div>
                          </div>
                        </motion.div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>

                {/* Dots Indicator */}
                <div className="flex justify-center mt-6 space-x-2">
                  {tour.itinerary.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentItinerarySlide ? "bg-blue-500 scale-125" : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      onClick={() => {
                        // You can add click functionality here if needed
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* Details Tab */}
            <TabsContent value="details" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Transportation */}
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-700 bg-clip-text text-transparent mb-4">
                    Transportation Details
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Getting to Destination */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-3 mr-4">
                          <tour.transportation.toDestination.icon className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="text-lg font-bold text-blue-800">Getting to {tour.location}</h4>
                      </div>
                      <p className="text-gray-600 mb-4 text-sm">{tour.transportation.toDestination.description}</p>
                      <div className="space-y-2">
                        {tour.transportation.toDestination.details.map((detail, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" />
                            <span className="text-gray-700">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Local Transportation */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-xl p-6">
                      <h4 className="text-lg font-bold text-green-800 mb-4">Local Transportation</h4>
                      <p className="text-gray-600 mb-4 text-sm">{tour.transportation.localTransport.description}</p>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {tour.transportation.localTransport.vehicles.map((vehicle, index) => (
                          <div key={index} className="bg-white border border-green-200 rounded-lg p-3 text-center">
                            <vehicle.icon className="h-6 w-6 text-green-600 mx-auto mb-2" />
                            <div className="text-xs font-medium text-gray-900">{vehicle.type}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Restrictions */}
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-700 bg-clip-text text-transparent mb-4">
                    Important Restrictions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tour.restrictions.map((restriction, index) => (
                      <div key={index} className="bg-white border border-yellow-200 p-4 rounded-lg">
                        <div className="flex items-start">
                          <AlertTriangle className="h-4 w-4 mr-3 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">{restriction}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tour Operator */}
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent mb-4">
                    Tour Operator Details
                  </h3>
                  <div className="bg-white border border-indigo-200 rounded-xl p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: "Company", value: tour.tourOperator.name },
                        { label: "Rating", value: tour.tourOperator.rating, isRating: true },
                        { label: "Experience", value: tour.tourOperator.experience },
                        { label: "Founded", value: tour.tourOperator.founded },
                        { label: "Certification", value: "Certified", isBadge: true },
                        { label: "Languages", value: tour.tourOperator.languages.slice(0, 2).join(", ") },
                        { label: "Group Size", value: tour.tourOperator.groupSizes },
                        { label: "Total Tours", value: tour.tourOperator.totalTours },
                      ].map((item, index) => (
                        <div key={index} className="bg-gray-50 border border-gray-200 p-3 rounded-lg">
                          <div className="text-xs text-gray-600 mb-1">{item.label}</div>
                          {item.isRating ? (
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                              <span className="font-bold text-gray-900 text-sm">{item.value}</span>
                            </div>
                          ) : item.isBadge ? (
                            <Badge className="bg-green-100 text-green-800 border border-green-200 px-2 py-1 rounded-full text-xs">
                              <Award className="w-3 h-3 mr-1" />
                              {item.value}
                            </Badge>
                          ) : (
                            <div className="font-bold text-gray-900 text-sm">{item.value}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.section>

      {/* Reviews Section - Keep this separate */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 bg-gradient-to-br from-purple-50 to-pink-50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-700 bg-clip-text text-transparent mb-3">
              Traveler Reviews
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              See what our guests are saying about their incredible experiences
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tour.reviewsList.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white border border-gray-200 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mr-3">
                      <User className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{review.name}</div>
                      <div className="text-gray-500 text-sm">{review.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">{review.comment}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Sticky Bottom Booking Bar */}
      <AnimatePresence>
        {showStickyBooking && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t-2 border-green-200 z-50"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div>
                    <div className="text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                      ${tour.price}
                    </div>
                    <div className="text-sm text-gray-500">per person</div>
                  </div>
                  <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>{tour.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-green-500" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-green-500" />
                      <span>{tour.groupSize}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="border-2 border-green-500 text-green-600 hover:bg-green-50 rounded-full px-6 py-3 transition-all duration-300"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full px-8 py-3 transition-all duration-300">
                      Book Now
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
