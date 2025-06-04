import { Button } from "@/components/ui/button"
import Header from "@/components/Header"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import {
  Star,
  MapPin,
  Clock,
  Users,
  Camera,
  Mountain,
  Plane,
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
  Compass,
  CheckCircle,
  Sparkles,
  Leaf,
  TreePine,
  Sun,
  Search,
  Zap,
  Headphones,
  ThumbsUp,
  Wallet,
} from "lucide-react"

export default function HomePage() {
  const featuredTours = [
    {
      id: 1,
      title: "Santorini Sunset Paradise",
      location: "Santorini, Greece",
      duration: "7 Days",
      groupSize: "12 People",
      price: 1299,
      originalPrice: 1599,
      rating: 4.9,
      reviews: 234,
      image: "/placeholder.svg?height=300&width=400",
      highlights: ["Blue Dome Churches", "Wine Tasting", "Sunset Cruise", "Traditional Villages"],
      description:
        "Experience the magic of Santorini with breathtaking sunsets, pristine beaches, and authentic Greek culture in this unforgettable Mediterranean adventure.",
    },
    {
      id: 2,
      title: "Swiss Alps Adventure",
      location: "Interlaken, Switzerland",
      duration: "5 Days",
      groupSize: "8 People",
      price: 1899,
      originalPrice: 2199,
      rating: 4.8,
      reviews: 189,
      image: "/placeholder.svg?height=300&width=400",
      highlights: ["Jungfraujoch", "Paragliding", "Mountain Railways", "Alpine Lakes"],
      description:
        "Discover the stunning Swiss Alps with thrilling adventures, panoramic mountain views, and pristine alpine landscapes that will take your breath away.",
    },
    {
      id: 3,
      title: "Bali Cultural Journey",
      location: "Ubud, Bali",
      duration: "6 Days",
      groupSize: "10 People",
      price: 899,
      originalPrice: 1199,
      rating: 4.7,
      reviews: 312,
      image: "/placeholder.svg?height=300&width=400",
      highlights: ["Rice Terraces", "Temple Tours", "Cooking Classes", "Spa Treatments"],
      description:
        "Immerse yourself in Balinese culture with ancient temple visits, traditional cuisine experiences, and serene landscapes in this spiritual journey.",
    },
  ]

  const mostVisitedTours = [
    {
      id: 4,
      title: "Iceland Northern Lights",
      location: "Reykjavik, Iceland",
      duration: "4 Days",
      price: 1599,
      rating: 4.9,
      reviews: 456,
      image: "/placeholder.svg?height=250&width=350",
      badge: "Most Popular",
    },
    {
      id: 5,
      title: "Tokyo Cherry Blossom",
      location: "Tokyo, Japan",
      duration: "8 Days",
      price: 2299,
      rating: 4.8,
      reviews: 378,
      image: "/placeholder.svg?height=250&width=350",
      badge: "Seasonal",
    },
    {
      id: 6,
      title: "Machu Picchu Trek",
      location: "Cusco, Peru",
      duration: "5 Days",
      price: 1199,
      rating: 4.9,
      reviews: 523,
      image: "/placeholder.svg?height=250&width=350",
      badge: "Adventure",
    },
    {
      id: 7,
      title: "Safari Kenya Experience",
      location: "Masai Mara, Kenya",
      duration: "6 Days",
      price: 1799,
      rating: 4.7,
      reviews: 267,
      image: "/placeholder.svg?height=250&width=350",
      badge: "Wildlife",
    },
  ]

  const platformFeatures = [
    {
      icon: Shield,
      title: "100% Secure Booking",
      description: "Your payments and personal data are protected with bank-level security encryption.",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: Award,
      title: "Expert Local Guides",
      description: "Professional guides with deep local knowledge and years of experience in each destination.",
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: Globe,
      title: "50+ Destinations",
      description: "Carefully curated destinations across 6 continents, from hidden gems to iconic landmarks.",
      color: "from-purple-400 to-violet-500",
    },
    {
      icon: Heart,
      title: "24/7 Support",
      description: "Round-the-clock customer support before, during, and after your journey.",
      color: "from-pink-400 to-rose-500",
    },
  ]

  const serviceFeatures = [
    {
      icon: Leaf,
      title: "Eco-Friendly Travel",
      description:
        "All our tours are designed with sustainability in mind. We offset carbon emissions, support local conservation efforts, and partner with eco-conscious accommodations.",
    },
    {
      icon: Zap,
      title: "Seamless Experience",
      description:
        "From booking to return, we handle all the details. Our digital itineraries, real-time updates, and on-ground support ensure a hassle-free journey.",
    },
    {
      icon: Headphones,
      title: "Personalized Support",
      description:
        "Our travel experts are available 24/7 to assist with any questions or changes. We provide emergency support and local assistance throughout your trip.",
    },
    {
      icon: ThumbsUp,
      title: "Quality Guarantee",
      description:
        "We personally vet all accommodations, activities, and guides. If any aspect of your tour doesn't meet our standards, we'll make it right.",
    },
    {
      icon: Wallet,
      title: "Flexible Payment",
      description:
        "Reserve your spot with a small deposit and pay the rest in installments. We offer free cancellation up to 30 days before departure on most tours.",
    },
    {
      icon: Users,
      title: "Small Groups",
      description:
        "Our tours maintain small group sizes (typically 8-12 people) to ensure personalized attention, authentic experiences, and minimal environmental impact.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 bg-gradient-to-br from-green-50 via-white to-emerald-50">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <TreePine className="h-32 w-32 text-green-500" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <Leaf className="h-24 w-24 text-green-400" />
        </div>
        <div className="absolute top-40 right-20 opacity-10">
          <Sun className="h-40 w-40 text-yellow-400" />
        </div>

        <div className="relative z-10 text-center max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <Badge className="bg-green-100 text-green-800 border border-green-200 mb-6 px-6 py-3 text-lg rounded-full">
              <Sparkles className="w-5 h-5 mr-2" />
              Trusted by 10,000+ Nature Lovers
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight text-gray-900">
            Discover Nature's
            <span className="block bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Hidden Wonders
            </span>
          </h1>

          <p className="text-lg md:text-xl mb-16 text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
            Embark on eco-friendly adventures to breathtaking destinations. Experience authentic cultures, pristine
            landscapes, and create sustainable memories that last a lifetime.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-20">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-base px-8 py-4 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
            >
              <Plane className="mr-4 h-7 w-7" />
              Explore Adventures
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-green-500 text-green-600 hover:bg-green-50 text-base px-8 py-4 rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Camera className="mr-4 h-7 w-7" />
              View Gallery
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { number: "50+", label: "Eco Destinations", icon: Globe },
              { number: "10K+", label: "Happy Travelers", icon: Heart },
              { number: "4.9", label: "Average Rating", icon: Star },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-100 rounded-3xl p-8 text-center transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-4 w-16 h-16 mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl mt-12">
            <video
              loop
              autoPlay
              src="https://res.cloudinary.com/dnsc6ccwp/video/upload/v1748533744/175361-853243452_small_uifonh.mp4"
            />
          </div>
        </div>
      </section>

      {/* Tour Search Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-10 shadow-2xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Find Your Perfect Adventure</h2>
              <p className="text-base text-gray-50">
                Search our eco-friendly tours based on your preferences and discover your next sustainable journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Destination</label>
                <Input
                  placeholder="Where do you want to go?"
                  className="bg-white/90 backdrop-blur-sm border-0 rounded-xl h-14 text-gray-800 placeholder:text-gray-400"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Group Size</label>
                <Select>
                  <SelectTrigger className="bg-white/90 backdrop-blur-sm border-0 rounded-xl h-14 text-gray-800">
                    <SelectValue placeholder="Number of travelers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Person</SelectItem>
                    <SelectItem value="2">2 People</SelectItem>
                    <SelectItem value="3-5">3-5 People</SelectItem>
                    <SelectItem value="6-10">6-10 People</SelectItem>
                    <SelectItem value="10+">10+ People</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Duration</label>
                <Select>
                  <SelectTrigger className="bg-white/90 backdrop-blur-sm border-0 rounded-xl h-14 text-gray-800">
                    <SelectValue placeholder="Trip duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-3">1-3 Days</SelectItem>
                    <SelectItem value="4-7">4-7 Days</SelectItem>
                    <SelectItem value="8-14">8-14 Days</SelectItem>
                    <SelectItem value="15+">15+ Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-white text-green-600 hover:bg-green-50 rounded-xl h-14 text-lg font-bold">
                  <Search className="mr-2 h-5 w-5" />
                  Search Tours
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
              How We Make Your Travel
              <span className="block bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                Extraordinary
              </span>
            </h2>
            <p className="text-base text-gray-600 max-w-4xl mx-auto leading-relaxed">
              At EcoWander, we're committed to providing exceptional travel experiences that respect both local
              communities and the environment. Our comprehensive services ensure your journey is seamless, sustainable,
              and unforgettable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {serviceFeatures.map((service, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-4 w-16 h-16 mb-6 flex items-center justify-center">
                  <service.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm px-6 py-3 rounded-2xl shadow-lg"
            >
              Learn More About Our Approach
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                EcoWander?
              </span>
            </h2>
            <p className="text-base text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              We're not just a travel company - we're your gateway to sustainable adventures. Our platform combines
              eco-consciousness with unforgettable experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {platformFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-100 rounded-3xl p-8 text-center transform hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
              >
                <div
                  className={`bg-gradient-to-br ${feature.color} rounded-2xl p-4 w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <feature.icon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section id="tours" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8">
              Featured{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                Adventures
              </span>
            </h2>
            <p className="text-base text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              Handpicked eco-friendly destinations offering the perfect blend of adventure, culture, and sustainability.
              Each tour is crafted to minimize environmental impact while maximizing your experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredTours.map((tour, index) => (
              <Link key={tour.id} href={`/tour/${tour.id}`}>
                <Card className="group bg-white border-2 border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img
                      src={tour.image || "/placeholder.svg"}
                      alt={tour.title}
                      className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <div className="absolute top-6 left-6">
                      <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white border-0 shadow-lg px-4 py-2 text-sm rounded-full">
                        Save ${tour.originalPrice - tour.price}
                      </Badge>
                    </div>
                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full p-3 border border-white/50">
                      <div className="flex items-center space-x-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold text-gray-900">{tour.rating}</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {tour.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-5 w-5 mr-2 text-green-500" />
                      <span className="text-sm">{tour.location}</span>
                    </div>

                    <div className="flex justify-between text-gray-600 mb-6">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-green-500" />
                        <span className="font-medium">{tour.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 mr-2 text-green-500" />
                        <span className="font-medium">{tour.groupSize}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed mb-6">{tour.description}</p>

                    <div className="space-y-4 mb-8">
                      <h4 className="font-bold text-lg text-green-600">Tour Highlights:</h4>
                      <div className="flex flex-wrap gap-2">
                        {tour.highlights.map((highlight, idx) => (
                          <Badge
                            key={idx}
                            className="bg-green-50 text-green-700 border border-green-200 text-sm px-3 py-1 rounded-full"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                      <div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                          ${tour.price}
                        </span>
                        <span className="text-sm text-gray-400 line-through ml-3">${tour.originalPrice}</span>
                        <div className="text-sm text-gray-500 mt-1">{tour.reviews} reviews</div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-8 pt-0">
                    <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-0 rounded-2xl shadow-lg text-sm py-3 group-hover:shadow-2xl transition-all duration-300">
                      View Details
                      <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Most Visited Tours */}
      <section className="py-24 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8">
              Traveler{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                Favorites
              </span>
            </h2>
            <p className="text-base text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              Join thousands of eco-conscious travelers who have chosen these incredible sustainable experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mostVisitedTours.map((tour, index) => (
              <Link key={tour.id} href={`/tour/${tour.id}`}>
                <Card className="group bg-white border-2 border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img
                      src={tour.image || "/placeholder.svg"}
                      alt={tour.title}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg rounded-full px-3 py-1">
                        {tour.badge}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-bold text-xl text-white mb-2">{tour.title}</h3>
                      <div className="flex items-center text-gray-200">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{tour.location}</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
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

          <div className="text-center mt-16">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-green-500 text-green-600 hover:bg-green-50 rounded-2xl px-10 py-6 text-xl"
            >
              <Compass className="mr-3 h-6 w-6" />
              Explore All Destinations
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-green-600 to-emerald-700">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-16 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8">Ready for Your Next Eco-Adventure?</h2>
            <p className="text-base mb-12 text-green-100 leading-relaxed font-medium">
              Join over 10,000 eco-conscious travelers and create sustainable memories that protect our planet for
              future generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-50 text-xl px-12 py-8 rounded-3xl shadow-2xl border-0 font-bold"
              >
                <Calendar className="mr-4 h-7 w-7" />
                Plan My Adventure
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 text-xl px-12 py-8 rounded-3xl shadow-2xl"
              >
                <Phone className="mr-4 h-7 w-7" />
                Speak to Expert
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                  <Mountain className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  EcoWander
                </span>
              </div>
              <p className="text-sm text-gray-300 mb-8 max-w-md leading-relaxed">
                Creating sustainable travel experiences since 2010. We specialize in eco-friendly tours that showcase
                the world's most beautiful destinations while protecting our planet.
              </p>
              <div className="flex space-x-4">
                <div className="p-4 bg-gray-800 hover:bg-green-600 rounded-2xl transition-colors cursor-pointer">
                  <Facebook className="h-6 w-6 text-gray-300 hover:text-white" />
                </div>
                <div className="p-4 bg-gray-800 hover:bg-green-600 rounded-2xl transition-colors cursor-pointer">
                  <Instagram className="h-6 w-6 text-gray-300 hover:text-white" />
                </div>
                <div className="p-4 bg-gray-800 hover:bg-green-600 rounded-2xl transition-colors cursor-pointer">
                  <Twitter className="h-6 w-6 text-gray-300 hover:text-white" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-8 text-white">Quick Links</h3>
              <ul className="space-y-4 text-gray-300">
                {["About Us", "Our Tours", "Sustainability", "Reviews", "Blog"].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-green-400 transition-colors flex items-center text-sm">
                      <ArrowRight className="h-4 w-4 mr-3 opacity-50" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-8 text-white">Contact Info</h3>
              <div className="space-y-6 text-gray-300">
                <div className="flex items-center">
                  <div className="p-3 bg-gray-800 rounded-xl mr-4">
                    <Phone className="h-5 w-5 text-green-400" />
                  </div>
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <div className="p-3 bg-gray-800 rounded-xl mr-4">
                    <Mail className="h-5 w-5 text-green-400" />
                  </div>
                  <span className="text-sm">hello@ecowander.com</span>
                </div>
                <div className="flex items-center">
                  <div className="p-3 bg-gray-800 rounded-xl mr-4">
                    <MapPin className="h-5 w-5 text-green-400" />
                  </div>
                  <span className="text-sm">123 Nature Ave, Green City</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
            <p className="text-sm">
              &copy; 2024 EcoWander Tours. All rights reserved. Protecting nature, one adventure at a time. 🌱
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
