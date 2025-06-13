"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Star,
  Search,
  Filter,
  Download,
  Eye,
  Reply,
  Flag,
  ThumbsUp,
  MessageSquare,
  Calendar,
  MapPin,
} from "lucide-react"
import AdminLayout from "@/components/AdminLayout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { useEffect } from "react"

// At the top of the file, add API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const [viewReviewId, setViewReviewId] = useState<number | null>(null)
  const [replyReviewId, setReplyReviewId] = useState<number | null>(null)
  const [flagReviewId, setFlagReviewId] = useState<number | null>(null)

  type Review = {
    id: number
    customer: {
      name: string
      avatar: string
    }
    tour: {
      title: string
      location: string
    }
    rating: number
    title: string
    content: string
    date: string
    status: string
    helpful: number
    hasResponse: boolean
    response?: string
    verified: boolean
  }

  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  // Update the fetchReviews function
  const fetchReviews = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchTerm) params.append("search", searchTerm)
      if (ratingFilter !== "all") params.append("rating", ratingFilter)
      if (statusFilter !== "all") params.append("status", statusFilter)

      // Get auth token from localStorage or your auth context
      const token = localStorage.getItem("access_token")

      const response = await fetch(`/api/reviews?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()
      
      if (response.ok) {
        setReviews(data.data) // FastAPI returns data directly, not wrapped in {success, data}
      } else {
        console.error("Failed to fetch reviews:", data.detail)
      }
    } catch (error) {
      console.error("Error fetching reviews:", error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    // Since we're using mock data for now, let's just set the reviews directly
    fetchReviews()
    setLoading(false)
  }, [])


  // Update the handleReplySubmit function
  const handleReplySubmit = async (reviewId: number, replyMessage: string) => {
    try {
     
 
      // Show success toast
      alert("Reply sent successfully!")
    } catch (error) {
      console.error("Error sending reply:", error)
      alert("Failed to send reply. Please try again.")
    }
  }

  const reviews_old = [
    {
      id: 1,
      customer: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      tour: {
        title: "Santorini Sunset Paradise",
        location: "Santorini, Greece",
      },
      rating: 5,
      title: "Absolutely magical experience!",
      content:
        "This tour exceeded all my expectations. The sunset views were breathtaking, the accommodation was luxurious, and our guide was incredibly knowledgeable. Every detail was perfectly planned. I would definitely book with EcoWander again!",
      date: "2024-03-20",
      status: "Published",
      helpful: 12,
      hasResponse: true,
      response:
        "Thank you so much for your wonderful review, Sarah! We're thrilled that you had such a magical experience in Santorini. We look forward to welcoming you on another adventure soon!",
      verified: true,
    },
    {
      id: 2,
      customer: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      tour: {
        title: "Swiss Alps Adventure",
        location: "Interlaken, Switzerland",
      },
      rating: 4,
      title: "Great adventure, minor issues",
      content:
        "Overall a fantastic trip! The hiking trails were amazing and the scenery was spectacular. The only downside was that one of the planned activities was cancelled due to weather, but the team did their best to provide alternatives.",
      date: "2024-03-18",
      status: "Published",
      helpful: 8,
      hasResponse: false,
      verified: true,
    },
    {
      id: 3,
      customer: {
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      tour: {
        title: "Bali Cultural Journey",
        location: "Ubud, Bali",
      },
      rating: 5,
      title: "Life-changing cultural immersion",
      content:
        "This wasn't just a tour, it was a transformative experience. Learning about Balinese traditions, participating in local ceremonies, and staying with host families gave me such deep insights into the culture. Highly recommended!",
      date: "2024-03-15",
      status: "Pending",
      helpful: 15,
      hasResponse: false,
      verified: true,
    },
    {
      id: 4,
      customer: {
        name: "David Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      tour: {
        title: "Iceland Northern Lights",
        location: "Reykjavik, Iceland",
      },
      rating: 3,
      title: "Good but not great",
      content:
        "The Northern Lights were incredible when we finally saw them on the last night. However, the accommodation was not as described and the food options were limited. The guide was friendly but seemed inexperienced.",
      date: "2024-03-12",
      status: "Flagged",
      helpful: 3,
      hasResponse: true,
      response:
        "Thank you for your feedback, David. We apologize for the issues with accommodation and will address this with our local partners. We're glad you were able to see the Northern Lights and appreciate your honest review.",
      verified: true,
    },
    {
      id: 5,
      customer: {
        name: "Lisa Thompson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      tour: {
        title: "Tokyo Food & Culture",
        location: "Tokyo, Japan",
      },
      rating: 5,
      title: "Foodie paradise!",
      content:
        "As a food enthusiast, this tour was perfect for me. We visited hidden local restaurants, learned to make sushi, and explored traditional markets. The cultural sites were beautiful too. Worth every penny!",
      date: "2024-03-10",
      status: "Published",
      helpful: 20,
      hasResponse: true,
      response:
        "We're so happy you enjoyed the culinary journey through Tokyo, Lisa! Our local food experts love sharing their passion for Japanese cuisine with fellow food enthusiasts.",
      verified: true,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800 border-green-200"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Flagged":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const filteredReviews = reviews

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">Reviews Management</h1>
            <p className="mt-1 text-sm text-gray-500">Monitor and respond to customer reviews and feedback.</p>
          </div>
          <div className="mt-4 flex space-x-3 md:ml-4 md:mt-0">
            <Button variant="outline" className="rounded-lg">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Total Reviews",
              value: reviews.length,
              icon: MessageSquare,
              color: "from-blue-500 to-blue-600",
            },
            {
              title: "Average Rating",
              value: averageRating.toFixed(1),
              icon: Star,
              color: "from-yellow-500 to-yellow-600",
            },
            {
              title: "Response Rate",
              value: `${Math.round((reviews.filter((r) => r.hasResponse).length / reviews.length) * 100)}%`,
              icon: Reply,
              color: "from-green-500 to-green-600",
            },
            {
              title: "Pending Reviews",
              value: reviews.filter((r) => r.status === "Pending").length,
              icon: Calendar,
              color: "from-orange-500 to-orange-600",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border-2 border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`bg-gradient-to-r ${stat.color} rounded-full p-3`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <Card className="border-2 border-gray-200">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search reviews by customer, tour, or content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="rounded-lg">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-500">Loading reviews...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="border-2 border-gray-200 hover:border-gray-300 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Review Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={review.customer.avatar || "/placeholder.svg"}
                              alt={review.customer.name}
                            />
                            <AvatarFallback>
                              {review.customer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-gray-900">{review.customer.name}</h3>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  Verified
                                </Badge>
                              )}
                              <Badge
                                className={`${getStatusColor(review.status)} border rounded-full px-2 py-1 text-xs`}
                              >
                                {review.status}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="flex items-center">{renderStars(review.rating)}</div>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-500">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-4 w-4 mr-1" />
                              {review.tour.title} - {review.tour.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-lg"
                            onClick={() => setViewReviewId(review.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-lg"
                            onClick={() => setFlagReviewId(review.id)}
                          >
                            <Flag className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Review Content */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                        <p className="text-gray-700 leading-relaxed">{review.content}</p>
                      </div>

                      {/* Review Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {review.helpful} helpful
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!review.hasResponse && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-lg"
                              onClick={() => setReplyReviewId(review.id)}
                            >
                              <Reply className="h-4 w-4 mr-2" />
                              Reply
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Admin Response */}
                      {review.hasResponse && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                          <div className="flex items-start space-x-3">
                            <div className="bg-blue-500 rounded-full p-1">
                              <Reply className="h-3 w-3 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium text-blue-900">EcoWander Team</span>
                                <span className="text-xs text-blue-600">Admin Response</span>
                              </div>
                              <p className="text-blue-800 text-sm">{review.response}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No reviews found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* View Review Modal */}
        <Dialog open={viewReviewId !== null} onOpenChange={(open) => !open && setViewReviewId(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Review Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {(() => {
                const review = reviews.find((r) => r.id === viewReviewId)
                return review ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={review.customer.avatar || "/placeholder.svg"} alt={review.customer.name} />
                        <AvatarFallback>
                          {review.customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{review.customer.name}</h3>
                        <div className="flex items-center">{renderStars(review.rating)}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">{review.title}</h4>
                      <p className="text-gray-700">{review.content}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      <p>Tour: {review.tour.title}</p>
                      <p>Date: {new Date(review.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ) : null
              })()}
            </div>
          </DialogContent>
        </Dialog>

        {/* Reply to Review Modal */}
        <Dialog open={replyReviewId !== null} onOpenChange={(open) => !open && setReplyReviewId(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Reply to Review</DialogTitle>
              <DialogDescription>Respond to this customer review.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="reply-message">Your Reply</Label>
                <Textarea id="reply-message" placeholder="Thank you for your review..." className="mt-2" rows={4} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setReplyReviewId(null)}>
                Cancel
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  const textarea = document.getElementById("reply-message") as HTMLTextAreaElement
                  if (textarea && replyReviewId) {
                    handleReplySubmit(replyReviewId, textarea.value)
                  }
                }}
              >
                Send Reply
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Flag Review Modal */}
        <Dialog open={flagReviewId !== null} onOpenChange={(open) => !open && setFlagReviewId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Flag Review</DialogTitle>
              <DialogDescription>Why are you flagging this review?</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="flag-reason">Reason</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inappropriate">Inappropriate Content</SelectItem>
                    <SelectItem value="spam">Spam</SelectItem>
                    <SelectItem value="fake">Fake Review</SelectItem>
                    <SelectItem value="offensive">Offensive Language</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="flag-notes">Additional Notes</Label>
                <Textarea id="flag-notes" placeholder="Optional additional information..." className="mt-2" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setFlagReviewId(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setFlagReviewId(null)
                  alert("Review flagged successfully!")
                }}
              >
                Flag Review
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
