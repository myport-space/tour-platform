"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import Header from "@/components/Header"
import Link from "next/link"
import {
  Star,
  MapPin,
  Users,
  Calendar,
  ArrowRight,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Shield,
  Award,
  Globe,
  Heart,
  Leaf,
  MessageCircle,
  Briefcase,
  Compass,
  Camera,
  UserCheck,
  FileText,
  Share2,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Verified,
} from "lucide-react"

interface OperatorProfileProps {
  params: {
    id: string
  }
}

export default function OperatorProfile({ params }: OperatorProfileProps) {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("about")

  // Sample operator data
  const operator = {
    id: params.id,
    name: "EcoWander Adventures",
    logo: "/placeholder.svg?height=100&width=100",
    coverImage: "https://res.cloudinary.com/dnsc6ccwp/image/upload/v1748534256/backpacker-772991_qtegir.jpg",
    tagline: "Sustainable Adventures for Conscious Travelers",
    description:
      "EcoWander Adventures is a leading sustainable tour operator with over 15 years of experience creating unforgettable eco-friendly journeys. We specialize in small group tours that minimize environmental impact while maximizing authentic cultural experiences. Our expert local guides and commitment to conservation have earned us recognition as one of the top sustainable tourism companies worldwide.",
    founded: 2010,
    headquarters: "Vancouver, Canada",
    operatingRegions: ["Europe", "Asia", "South America", "Oceania", "Africa"],
    employees: 45,
    rating: 4.8,
    reviewCount: 1245,
    tourCount: 156,
    travelersCount: 12450,
    certifications: [
      {
        name: "Certified Sustainable Tourism",
        icon: Leaf,
        year: 2012,
      },
      {
        name: "Green Tourism Gold Award",
        icon: Award,
        year: 2018,
      },
      {
        name: "Responsible Travel Partner",
        icon: Globe,
        year: 2015,
      },
      {
        name: "Carbon Neutral Certified",
        icon: Shield,
        year: 2019,
      },
    ],
    team: [
      {
        name: "Sarah Johnson",
        role: "Founder & CEO",
        image: "/placeholder.svg?height=100&width=100",
        bio: "Former conservation biologist with a passion for sustainable travel",
      },
      {
        name: "Miguel Rodriguez",
        role: "Head Guide",
        image: "/placeholder.svg?height=100&width=100",
        bio: "20+ years experience leading tours across South America",
      },
      {
        name: "Aisha Patel",
        role: "Sustainability Director",
        image: "/placeholder.svg?height=100&width=100",
        bio: "Environmental scientist specializing in eco-tourism development",
      },
      {
        name: "Thomas Berg",
        role: "Operations Manager",
        image: "/placeholder.svg?height=100&width=100",
        bio: "Logistics expert ensuring smooth and safe travel experiences",
      },
    ],
    stats: {
      sustainabilityScore: 92,
      safetyRecord: 98,
      localCommunityImpact: 87,
      customerSatisfaction: 96,
    },
    contact: {
      email: "hello@ecowander.com",
      phone: "+1 (555) 123-4567",
      address: "123 Nature Ave, Vancouver, BC, Canada",
      website: "www.ecowander.com",
      social: {
        facebook: "facebook.com/ecowander",
        instagram: "instagram.com/ecowander",
        twitter: "twitter.com/ecowander",
      },
    },
    gallery: [
      {
        url: "https://res.cloudinary.com/dnsc6ccwp/image/upload/v1748534256/backpacker-772991_qtegir.jpg",
        caption: "Guided hike through the Swiss Alps",
      },
      {
        url: "https://res.cloudinary.com/dnsc6ccwp/image/upload/v1748534253/hallstatt-3609863_mpb94y.jpg",
        caption: "Cultural immersion in traditional villages",
      },
      {
        url: "https://res.cloudinary.com/dnsc6ccwp/image/upload/v1748534259/mountain-5092625_t0lga6.jpg",
        caption: "Wildlife conservation activities",
      },
      {
        url: "https://res.cloudinary.com/dnsc6ccwp/image/upload/v1748534258/lake-1681485_xtuz3o.jpg",
        caption: "Sustainable camping in pristine locations",
      },
      {
        url: "https://res.cloudinary.com/dnsc6ccwp/image/upload/v1748534261/man-1834849_p8nojm.jpg",
        caption: "Local cooking classes with organic ingredients",
      },
    ],
    testimonials: [
      {
        name: "Jennifer L.",
        location: "United States",
        image: "/placeholder.svg?height=60&width=60",
        rating: 5,
        text: "Our trip with EcoWander was life-changing. The guides were incredibly knowledgeable, and we felt good knowing our tourism dollars were supporting local communities. The attention to detail and commitment to sustainability was evident throughout the journey.",
        tour: "Santorini Sunset Paradise",
        date: "March 2024",
      },
      {
        name: "Marcus T.",
        location: "United Kingdom",
        image: "/placeholder.svg?height=60&width=60",
        rating: 5,
        text: "As someone deeply concerned about my carbon footprint, I was impressed by EcoWander's genuine commitment to sustainable practices. The experience was luxurious yet responsible, and the local guides provided insights I couldn't have gotten elsewhere.",
        tour: "Swiss Alps Adventure",
        date: "February 2024",
      },
      {
        name: "Sophia K.",
        location: "Australia",
        image: "/placeholder.svg?height=60&width=60",
        rating: 4,
        text: "EcoWander created a perfect balance of adventure and relaxation. Their attention to sustainability didn't compromise the quality of the experience at all - in fact, it enhanced it. I've already booked my next trip with them!",
        tour: "Bali Cultural Journey",
        date: "January 2024",
      },
    ],
    featuredTours: [
      {
        id: 1,
        title: "Santorini Sunset Paradise",
        location: "Santorini, Greece",
        duration: "7 Days",
        price: 1299,
        rating: 4.9,
        reviews: 234,
        image: "https://res.cloudinary.com/dnsc6ccwp/image/upload/v1748534256/backpacker-772991_qtegir.jpg",
        featured: true,
      },
      {
        id: 2,
        title: "Swiss Alps Adventure",
        location: "Interlaken, Switzerland",
        duration: "5 Days",
        price: 1899,
        rating: 4.8,
        reviews: 189,
        image: "https://res.cloudinary.com/dnsc6ccwp/image/upload/v1748534253/hallstatt-3609863_mpb94y.jpg",
        featured: true,
      },
      {
        id: 3,
        title: "Bali Cultural Journey",
        location: "Ubud, Bali",
        duration: "6 Days",
        price: 899,
        rating: 4.7,
        reviews: 312,
        image: "https://res.cloudinary.com/dnsc6ccwp/image/upload/v1748534259/mountain-5092625_t0lga6.jpg",
        featured: false,
      },
    ],
    upcomingTours: [
      {
        id: 4,
        title: "Iceland Northern Lights",
        location: "Reykjavik, Iceland",
        startDate: "2024-04-15",
        duration: "4 Days",
        spotsLeft: 4,
        price: 1599,
      },
      {
        id: 5,
        title: "Tokyo Cherry Blossom",
        location: "Tokyo, Japan",
        startDate: "2024-04-22",
        duration: "8 Days",
        spotsLeft: 2,
        price: 2299,
      },
      {
        id: 6,
        title: "Machu Picchu Trek",
        location: "Cusco, Peru",
        startDate: "2024-05-10",
        duration: "5 Days",
        spotsLeft: 6,
        price: 1199,
      },
    ],
    completedTours: [
      {
        year: 2023,
        count: 42,
        travelers: 504,
        satisfaction: 96,
      },
      {
        year: 2022,
        count: 38,
        travelers: 456,
        satisfaction: 94,
      },
      {
        year: 2021,
        count: 28,
        travelers: 336,
        satisfaction: 93,
      },
      {
        year: 2020,
        count: 18,
        travelers: 216,
        satisfaction: 92,
      },
    ],
    awards: [
      {
        name: "Sustainable Tourism Excellence Award",
        year: 2023,
        organization: "World Travel Association",
      },
      {
        name: "Best Eco-Tour Operator",
        year: 2022,
        organization: "Green Travel Awards",
      },
      {
        name: "Community Impact Award",
        year: 2021,
        organization: "Responsible Tourism Network",
      },
    ],
    partnerships: [
      {
        name: "World Wildlife Fund",
        logo: "/placeholder.svg?height=60&width=60",
        description: "Conservation partnership to protect endangered species",
      },
      {
        name: "Rainforest Alliance",
        logo: "/placeholder.svg?height=60&width=60",
        description: "Sustainable accommodation certification",
      },
      {
        name: "Local Communities Coalition",
        logo: "/placeholder.svg?height=60&width=60",
        description: "Supporting indigenous communities through tourism",
      },
    ],
    sustainabilityInitiatives: [
      {
        title: "Carbon Offset Program",
        description:
          "We offset 150% of the carbon emissions from all our tours through verified reforestation projects.",
        icon: Leaf,
      },
      {
        title: "Plastic-Free Travel",
        description: "Eliminated single-use plastics from all tours and provided travelers with reusable alternatives.",
        icon: Globe,
      },
      {
        title: "Local Employment",
        description: "Over 90% of our guides and staff are hired from local communities in tour destinations.",
        icon: Users,
      },
      {
        title: "Wildlife Protection",
        description: "5% of all profits are donated to wildlife conservation efforts in the regions where we operate.",
        icon: Heart,
      },
    ],
  }

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % operator.testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + operator.testimonials.length) % operator.testimonials.length)
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

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative">
        {/* Cover Image */}
        <div className="h-80 md:h-96 w-full relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />
          <img
            src={operator.coverImage || "/placeholder.svg"}
            alt={operator.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent h-32" />
        </div>

        {/* Operator Info Overlay */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row md:items-end absolute bottom-8 left-4 right-4 md:left-8 md:right-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-4 shadow-xl -mb-20 md:-mb-12 flex items-center space-x-6 max-w-3xl"
            >
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={operator.logo || "/placeholder.svg"}
                    alt={operator.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1 border-2 border-white">
                  <Verified className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900">{operator.name}</h1>
                  <Badge className="bg-green-100 text-green-800 border border-green-200">Verified</Badge>
                </div>
                <p className="text-gray-600 mt-1">{operator.tagline}</p>
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-bold">{operator.rating}</span>
                    <span className="text-gray-500 ml-1">({operator.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-gray-600">{operator.headquarters}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-gray-600">Since {operator.founded}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex-1" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-24 md:mt-0 flex space-x-3"
            >
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl">
                View All Tours
              </Button>
              <Button variant="outline" className="rounded-xl border-2">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-24 md:pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs Navigation */}
          <Tabs defaultValue="about" className="w-full" onValueChange={setActiveTab}>
            <div className="border-b border-gray-200">
              <TabsList className="bg-transparent h-auto p-0 mb-0">
                {[
                  { id: "about", label: "About" },
                  { id: "tours", label: "Tours" },
                  { id: "reviews", label: "Reviews" },
                  { id: "team", label: "Team" },
                  { id: "gallery", label: "Gallery" },
                  { id: "sustainability", label: "Sustainability" },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className={`px-6 py-3 text-base font-medium border-b-2 border-transparent data-[state=active]:border-green-500 data-[state=active]:text-green-600 rounded-none transition-all`}
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* About Tab */}
            <TabsContent value="about">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8"
              >
                {/* Main Content */}
                <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
                  <Card className="border-2 border-gray-200 rounded-3xl">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">About {operator.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 p-4">
                      <p className="text-sm leading-relaxed">{operator.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="font-bold text-gray-900 text-lg">Operating Regions</h3>
                          <div className="flex flex-wrap gap-2">
                            {operator.operatingRegions.map((region, index) => (
                              <Badge
                                key={index}
                                className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full"
                              >
                                <Globe className="w-3 h-3 mr-1" />
                                {region}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="font-bold text-gray-900 text-lg">Company Facts</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Founded</span>
                              <span className="font-medium">{operator.founded}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Headquarters</span>
                              <span className="font-medium">{operator.headquarters}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Team Members</span>
                              <span className="font-medium">{operator.employees}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Tours Operated</span>
                              <span className="font-medium">{operator.tourCount}+</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Travelers Guided</span>
                              <span className="font-medium">{operator.travelersCount.toLocaleString()}+</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-gray-200 rounded-3xl">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">Awards & Recognition</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {operator.awards.map((award, index) => (
                          <div
                            key={index}
                            className="bg-gradient-to-br from-amber-50 to-yellow-100 border-2 border-amber-200 rounded-2xl p-4 text-center"
                          >
                            <Award className="h-10 w-10 text-amber-500 mx-auto mb-3" />
                            <h3 className="font-bold text-gray-900 mb-2">{award.name}</h3>
                            <div className="text-amber-700 font-medium">{award.year}</div>
                            <div className="text-sm text-gray-600 mt-2">{award.organization}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-gray-200 rounded-3xl">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">Partnerships</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {operator.partnerships.map((partner, index) => (
                          <div
                            key={index}
                            className="bg-white border-2 border-gray-200 rounded-2xl p-4 text-center hover:border-blue-300 transition-all duration-300"
                          >
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gray-200">
                              <img
                                src={partner.logo || "/placeholder.svg"}
                                alt={partner.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">{partner.name}</h3>
                            <p className="text-sm text-gray-600">{partner.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-gray-200 rounded-3xl">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">Tour History</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-4 px-2 font-semibold text-gray-900">Year</th>
                              <th className="text-left py-4 px-2 font-semibold text-gray-900">Tours Completed</th>
                              <th className="text-left py-4 px-2 font-semibold text-gray-900">Travelers</th>
                              <th className="text-left py-4 px-2 font-semibold text-gray-900">Satisfaction</th>
                            </tr>
                          </thead>
                          <tbody>
                            {operator.completedTours.map((year, index) => (
                              <tr key={index} className="border-b border-gray-100">
                                <td className="py-4 px-2 font-medium">{year.year}</td>
                                <td className="py-4 px-2">{year.count}</td>
                                <td className="py-4 px-2">{year.travelers}</td>
                                <td className="py-4 px-2">
                                  <div className="flex items-center">
                                    <span className="font-medium text-green-600 mr-2">{year.satisfaction}%</span>
                                    <Progress value={year.satisfaction} className="h-2 w-24" />
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Sidebar */}
                <motion.div variants={itemVariants} className="space-y-8">
                  {/* Certifications */}
                  <Card className="border-2 border-gray-200 rounded-3xl">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">Certifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-4">
                      {operator.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50">
                          <div className="bg-green-100 p-3 rounded-full">
                            <cert.icon className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{cert.name}</div>
                            <div className="text-sm text-gray-500">Since {cert.year}</div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Performance Metrics */}
                  <Card className="border-2 border-gray-200 rounded-3xl">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 p-4">
                      {[
                        {
                          label: "Sustainability Score",
                          value: operator.stats.sustainabilityScore,
                          color: "bg-green-500",
                        },
                        { label: "Safety Record", value: operator.stats.safetyRecord, color: "bg-blue-500" },
                        {
                          label: "Local Community Impact",
                          value: operator.stats.localCommunityImpact,
                          color: "bg-purple-500",
                        },
                        {
                          label: "Customer Satisfaction",
                          value: operator.stats.customerSatisfaction,
                          color: "bg-amber-500",
                        },
                      ].map((metric, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">{metric.label}</span>
                            <span className="font-bold">{metric.value}%</span>
                          </div>
                          <Progress value={metric.value} className={`h-2 ${metric.color}`} />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Contact Information */}
                  <Card className="border-2 border-gray-200 rounded-3xl">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Mail className="h-5 w-5 text-blue-600" />
                        </div>
                        <a href={`mailto:${operator.contact.email}`} className="text-blue-600 hover:underline">
                          {operator.contact.email}
                        </a>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <Phone className="h-5 w-5 text-green-600" />
                        </div>
                        <a href={`tel:${operator.contact.phone}`} className="text-gray-900">
                          {operator.contact.phone}
                        </a>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="bg-purple-100 p-2 rounded-full">
                          <MapPin className="h-5 w-5 text-purple-600" />
                        </div>
                        <span className="text-gray-600">{operator.contact.address}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="bg-amber-100 p-2 rounded-full">
                          <Globe className="h-5 w-5 text-amber-600" />
                        </div>
                        <a
                          href={`https://${operator.contact.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          {operator.contact.website}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>

                      <div className="flex items-center space-x-4 mt-4">
                        <a
                          href={`https://${operator.contact.social.facebook}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-100 hover:bg-blue-100 p-3 rounded-full transition-colors"
                        >
                          <Facebook className="h-5 w-5 text-gray-600 hover:text-blue-600" />
                        </a>
                        <a
                          href={`https://${operator.contact.social.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-100 hover:bg-pink-100 p-3 rounded-full transition-colors"
                        >
                          <Instagram className="h-5 w-5 text-gray-600 hover:text-pink-600" />
                        </a>
                        <a
                          href={`https://${operator.contact.social.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-100 hover:bg-blue-100 p-3 rounded-full transition-colors"
                        >
                          <Twitter className="h-5 w-5 text-gray-600 hover:text-blue-400" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            {/* Tours Tab */}
            <TabsContent value="tours">
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12 mt-8">
                {/* Featured Tours */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-xl font-semibold text-gray-900 mb-8">Featured Tours</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {operator.featuredTours.map((tour) => (
                      <Link key={tour.id} href={`/tour/${tour.id}`}>
                        <Card className="group bg-white border-2 border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer h-full">
                          <div className="relative overflow-hidden">
                            <img
                              src={tour.image || "/placeholder.svg"}
                              alt={tour.title}
                              className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            {tour.featured && (
                              <div className="absolute top-4 left-4">
                                <Badge className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white border-0 shadow-lg px-3 py-1 text-sm rounded-full">
                                  Featured
                                </Badge>
                              </div>
                            )}
                            <div className="absolute bottom-4 left-4 right-4">
                              <h3 className="font-bold text-xl text-white mb-2">{tour.title}</h3>
                              <div className="flex items-center text-gray-200">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span className="text-sm">{tour.location}</span>
                              </div>
                            </div>
                          </div>

                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <span className="font-bold text-gray-900">{tour.rating}</span>
                                <span className="text-sm text-gray-500">({tour.reviews})</span>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                                  ${tour.price}
                                </div>
                                <div className="text-sm text-gray-500">{tour.duration}</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </motion.div>

                {/* Upcoming Departures */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-xl font-semibold text-gray-900 mb-8">Upcoming Departures</h2>
                  <Card className="border-2 border-gray-200 rounded-3xl">
                    <CardContent className="p-4">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-4 px-4 font-semibold text-gray-900">Tour</th>
                              <th className="text-left py-4 px-4 font-semibold text-gray-900">Location</th>
                              <th className="text-left py-4 px-4 font-semibold text-gray-900">Departure Date</th>
                              <th className="text-left py-4 px-4 font-semibold text-gray-900">Duration</th>
                              <th className="text-left py-4 px-4 font-semibold text-gray-900">Spots Left</th>
                              <th className="text-left py-4 px-4 font-semibold text-gray-900">Price</th>
                              <th className="text-left py-4 px-4 font-semibold text-gray-900">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {operator.upcomingTours.map((tour) => (
                              <tr key={tour.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="py-4 px-4 font-medium text-gray-900">{tour.title}</td>
                                <td className="py-4 px-4 text-gray-600">{tour.location}</td>
                                <td className="py-4 px-4 text-gray-600">
                                  {new Date(tour.startDate).toLocaleDateString()}
                                </td>
                                <td className="py-4 px-4 text-gray-600">{tour.duration}</td>
                                <td className="py-4 px-4">
                                  <Badge
                                    className={`${
                                      tour.spotsLeft <= 2
                                        ? "bg-red-100 text-red-800 border-red-200"
                                        : "bg-green-100 text-green-800 border-green-200"
                                    } rounded-full px-2 py-1`}
                                  >
                                    {tour.spotsLeft} left
                                  </Badge>
                                </td>
                                <td className="py-4 px-4 font-bold text-green-600">${tour.price}</td>
                                <td className="py-4 px-4">
                                  <Link href={`/book-tour/${tour.id}`}>
                                    <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-full text-sm">
                                      Book Now
                                    </Button>
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* View All Tours CTA */}
                <motion.div variants={itemVariants} className="text-center">
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl px-8 py-6 text-lg">
                    View All Tours
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </motion.div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 mt-8">
                {/* Reviews Summary */}
                <motion.div variants={itemVariants}>
                  <Card className="border-2 border-gray-200 rounded-3xl">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                          <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{operator.rating}</div>
                          <div className="flex justify-center mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-6 w-6 ${
                                  star <= Math.round(operator.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-gray-600">Based on {operator.reviewCount} reviews</div>
                        </div>

                        <div className="space-y-3">
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center space-x-4">
                              <div className="flex items-center w-12">
                                <span className="font-medium">{rating}</span>
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
                              </div>
                              <Progress
                                value={rating === 5 ? 78 : rating === 4 ? 15 : rating === 3 ? 5 : rating === 2 ? 1 : 1}
                                className="h-2 flex-1"
                              />
                              <div className="w-12 text-right text-gray-600">
                                {rating === 5
                                  ? "78%"
                                  : rating === 4
                                    ? "15%"
                                    : rating === 3
                                      ? "5%"
                                      : rating === 2
                                        ? "1%"
                                        : "1%"}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-4">
                          <h3 className="font-bold text-gray-900 text-lg">Review Highlights</h3>
                          <div className="flex flex-wrap gap-2">
                            {[
                              "Knowledgeable guides",
                              "Sustainable practices",
                              "Well organized",
                              "Authentic experiences",
                              "Great value",
                              "Safety focused",
                            ].map((tag, index) => (
                              <Badge
                                key={index}
                                className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Featured Testimonials */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-xl font-semibold text-gray-900 mb-8">Featured Testimonials</h2>
                  <div className="relative">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentTestimonialIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Card className="border-2 border-gray-200 rounded-3xl">
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row gap-8">
                              <div className="md:w-1/4 flex flex-col items-center text-center">
                                <Avatar className="w-20 h-20 mb-4">
                                  <AvatarImage
                                    src={operator.testimonials[currentTestimonialIndex].image || "/placeholder.svg"}
                                    alt={operator.testimonials[currentTestimonialIndex].name}
                                  />
                                  <AvatarFallback>
                                    {operator.testimonials[currentTestimonialIndex].name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="font-bold text-gray-900 text-lg">
                                  {operator.testimonials[currentTestimonialIndex].name}
                                </div>
                                <div className="text-gray-600 mb-2">
                                  {operator.testimonials[currentTestimonialIndex].location}
                                </div>
                                <div className="flex items-center justify-center">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`h-5 w-5 ${
                                        star <= operator.testimonials[currentTestimonialIndex].rating
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <div className="md:w-3/4">
                                <div className="bg-gray-50 rounded-3xl p-4 relative">
                                  <div className="absolute top-6 left-6 text-6xl text-gray-200 font-serif">"</div>
                                  <div className="relative z-10">
                                    <p className="text-sm text-gray-700 leading-relaxed italic">
                                      {operator.testimonials[currentTestimonialIndex].text}
                                    </p>
                                    <div className="mt-6 text-gray-600">
                                      <div className="font-medium">
                                        Tour: {operator.testimonials[currentTestimonialIndex].tour}
                                      </div>
                                      <div className="text-sm">
                                        {operator.testimonials[currentTestimonialIndex].date}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </AnimatePresence>

                    <div className="absolute top-1/2 -left-4 transform -translate-y-1/2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-white shadow-lg border-2"
                        onClick={prevTestimonial}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-white shadow-lg border-2"
                        onClick={nextTestimonial}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>

                {/* Review Indicators */}
                <motion.div variants={itemVariants} className="flex justify-center space-x-2 mt-4">
                  {operator.testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        index === currentTestimonialIndex ? "bg-green-500" : "bg-gray-300"
                      }`}
                      onClick={() => setCurrentTestimonialIndex(index)}
                    />
                  ))}
                </motion.div>

                {/* All Reviews CTA */}
                <motion.div variants={itemVariants} className="text-center mt-8">
                  <Button
                    variant="outline"
                    className="border-2 border-green-500 text-green-600 hover:bg-green-50 rounded-xl px-8 py-3"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Read All {operator.reviewCount} Reviews
                  </Button>
                </motion.div>
              </motion.div>
            </TabsContent>

            {/* Team Tab */}
            <TabsContent value="team">
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 mt-8">
                <motion.div variants={itemVariants}>
                  <h2 className="text-xl font-semibold text-gray-900 mb-8">Meet Our Team</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {operator.team.map((member, index) => (
                      <Card
                        key={index}
                        className="border-2 border-gray-200 rounded-3xl overflow-hidden hover:border-green-300 transition-all duration-300"
                      >
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <CardContent className="p-4 text-center">
                          <h3 className="font-bold text-lg text-gray-900 mb-1">{member.name}</h3>
                          <div className="text-green-600 font-medium mb-4">{member.role}</div>
                          <p className="text-gray-600">{member.bio}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="border-2 border-gray-200 rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardContent className="p-4 text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Join Our Team</h3>
                      <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                        We're always looking for passionate individuals who share our commitment to sustainable travel
                        and exceptional customer experiences. Check out our current openings or send us your resume.
                      </p>
                      <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl">
                        <Briefcase className="mr-2 h-5 w-5" />
                        View Career Opportunities
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery">
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 mt-8">
                <motion.div variants={itemVariants}>
                  <h2 className="text-xl font-semibold text-gray-900 mb-8">Photo Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {operator.gallery.map((image, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.03 }}
                        className="aspect-square rounded-3xl overflow-hidden cursor-pointer relative group"
                      >
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.caption}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <div>
                            <div className="text-white font-bold text-lg">{image.caption}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="text-center">
                  <Button
                    variant="outline"
                    className="border-2 border-green-500 text-green-600 hover:bg-green-50 rounded-xl px-8 py-3"
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    View Full Gallery
                  </Button>
                </motion.div>
              </motion.div>
            </TabsContent>

            {/* Sustainability Tab */}
            <TabsContent value="sustainability">
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12 mt-8">
                {/* Sustainability Commitment */}
                <motion.div variants={itemVariants}>
                  <Card className="border-2 border-green-200 rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="md:w-1/3">
                          <Leaf className="h-32 w-32 text-green-500 mx-auto" />
                        </div>
                        <div className="md:w-2/3">
                          <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Sustainability Commitment</h2>
                          <p className="text-sm leading-relaxed text-gray-700 mb-6">
                            At {operator.name}, sustainability isn't just a buzzword—it's at the core of everything we
                            do. We believe that travel can be a force for good, supporting local communities and
                            protecting the natural environments we visit. Our commitment goes beyond words; we implement
                            concrete actions to ensure our tours leave a positive impact on the planet and its people.
                          </p>
                          <div className="flex items-center space-x-4">
                            <div className="bg-white rounded-full p-3 shadow-md">
                              <Shield className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">Carbon Neutral Since 2019</div>
                              <div className="text-gray-600">
                                All tours are 150% carbon offset through verified projects
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Sustainability Initiatives */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-xl font-semibold text-gray-900 mb-8">Our Initiatives</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {operator.sustainabilityInitiatives.map((initiative, index) => (
                      <Card
                        key={index}
                        className="border-2 border-gray-200 rounded-3xl hover:border-green-300 transition-all duration-300"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-4">
                            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-4 mt-1">
                              <initiative.icon className="h-8 w-8 text-green-600" />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-gray-900 mb-2">{initiative.title}</h3>
                              <p className="text-gray-600 leading-relaxed">{initiative.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>

                {/* Sustainability Report */}
                <motion.div variants={itemVariants}>
                  <Card className="border-2 border-blue-200 rounded-3xl">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="md:w-2/3">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Annual Sustainability Report</h3>
                          <p className="text-sm leading-relaxed text-gray-600 mb-6">
                            We believe in transparency and accountability. Each year, we publish a comprehensive
                            sustainability report detailing our environmental impact, community initiatives, and
                            progress toward our sustainability goals. Download our latest report to see how we're making
                            a difference.
                          </p>
                          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl">
                            <FileText className="mr-2 h-5 w-5" />
                            Download 2023 Report
                          </Button>
                        </div>
                        <div className="md:w-1/3 flex justify-center">
                          <div className="bg-blue-100 rounded-full p-8">
                            <FileText className="h-24 w-24 text-blue-600" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Sustainability Partners */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-xl font-semibold text-gray-900 mb-8">Our Sustainability Partners</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                      "World Wildlife Fund",
                      "Rainforest Alliance",
                      "Global Sustainable Tourism Council",
                      "Carbon Neutral Certification",
                    ].map((partner, index) => (
                      <div
                        key={index}
                        className="bg-white border-2 border-gray-200 rounded-2xl p-4 text-center hover:border-green-300 transition-all duration-300"
                      >
                        <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                          <img src="/placeholder.svg?height=60&width=60" alt={partner} className="w-12 h-12" />
                        </div>
                        <div className="font-medium text-gray-900">{partner}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-700">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Ready to Explore with {operator.name}?</h2>
            <p className="text-base mb-10 text-green-100 leading-relaxed font-medium max-w-3xl mx-auto">
              Join our community of eco-conscious travelers and discover the world in a sustainable, authentic way.
              Let's create unforgettable memories while protecting the planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-50 text-xl px-6 py-3 rounded-3xl shadow-2xl border-0 font-bold"
              >
                <Compass className="mr-4 h-6 w-6" />
                Browse Tours
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 text-xl px-6 py-3 rounded-3xl shadow-2xl"
              >
                <UserCheck className="mr-4 h-6 w-6" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
