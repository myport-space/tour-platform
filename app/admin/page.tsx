"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Calendar, Users, MapPin, TrendingUp, DollarSign, Plane, Star, Plus, Eye, Edit, Trash2, Search, Download, Loader2 } from 'lucide-react'
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AdminLayout from "@/components/AdminLayout"
import { useToast } from "@/hooks/use-toast"

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("30")
  const [loading, setLoading] = useState(true)
  type TourStatusDataItem = {
    name: string
    value: number
    color: string
  }

  const [dashboardData, setDashboardData] = useState<{
    stats: {
      totalTours: number
      activeTours: number
      upcomingTours: number
      completedTours: number
      totalRevenue: number
      totalTravelers: number
      averageRating: number
      monthlyGrowth: number
    }
    monthlyData: any[]
    tourStatusData: TourStatusDataItem[]
    recentTours: any[]
  }>({
    stats: {
      totalTours: 0,
      activeTours: 0,
      upcomingTours: 0,
      completedTours: 0,
      totalRevenue: 0,
      totalTravelers: 0,
      averageRating: 0,
      monthlyGrowth: 0,
    },
    monthlyData: [],
    tourStatusData: [],
    recentTours: [],
  })
  const { toast } = useToast()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/dashboard")
        
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data")
        }
        
        const data = await response.json()
        setDashboardData(data)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [toast])

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800 border-green-200"
      case "UPCOMING":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "COMPLETED":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 text-green-500 animate-spin mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Loading dashboard data...</h2>
          <p className="text-gray-500 mt-2">Please wait while we fetch the latest information</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">Dashboard Overview</h1>
            <p className="mt-1 text-sm text-gray-500">Welcome back! Here's what's happening with your tours today.</p>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <Link href="/admin/launch-tour">
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg">
                <Plus className="h-4 w-4 mr-2" />
                Launch New Tour
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              title: "Total Tours",
              value: dashboardData.stats.totalTours,
              icon: MapPin,
              color: "from-blue-500 to-blue-600",
              change: `+${Math.round(dashboardData.stats.monthlyGrowth)}%`,
            },
            {
              title: "Active Tours",
              value: dashboardData.stats.activeTours,
              icon: Plane,
              color: "from-green-500 to-green-600",
              change: `+${Math.round(dashboardData.stats.monthlyGrowth)}%`,
            },
            {
              title: "Total Revenue",
              value: `$${(dashboardData.stats.totalRevenue / 1000).toFixed(1)}K`,
              icon: DollarSign,
              color: "from-purple-500 to-purple-600",
              change: `+${Math.round(dashboardData.stats.monthlyGrowth)}%`,
            },
            {
              title: "Total Travelers",
              value: dashboardData.stats.totalTravelers.toLocaleString(),
              icon: Users,
              color: "from-orange-500 to-orange-600",
              change: `+${Math.round(dashboardData.stats.monthlyGrowth)}%`,
            },
          ].map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                      <p className="text-xl font-bold text-gray-900 mt-2">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-green-600 text-sm font-medium">{stat.change}</span>
                        <span className="text-gray-500 text-sm ml-1">vs last month</span>
                      </div>
                    </div>
                    <div className={`bg-gradient-to-r ${stat.color} rounded-full p-3`}>
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dashboardData.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={{ fill: "#10B981", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tour Status Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Tour Status</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dashboardData.tourStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {dashboardData.tourStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {dashboardData.tourStatusData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-gray-600">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Tours Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Recent Tours</CardTitle>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-gray-400" />
                    <Input placeholder="Search tours..." className="w-64" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="rounded-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 font-semibold text-gray-900 text-sm">Tour</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900 text-sm">Status</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900 text-sm">Travelers</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900 text-sm">Departure</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900 text-sm">Revenue</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900 text-sm">Rating</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.recentTours.length > 0 ? (
                      dashboardData.recentTours.map((tour, index) => (
                        <motion.tr
                          key={tour.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-2 px-2">
                            <div>
                              <div className="font-semibold text-gray-900 text-sm">{tour.title}</div>
                              <div className="text-sm text-gray-500 flex items-center mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                {tour.location}
                              </div>
                            </div>
                          </td>
                          <td className="py-2 px-2">
                            <Badge className={`${getStatusColor(tour.status)} border rounded-full px-3 py-1 text-sm`}>
                              {tour.status}
                            </Badge>
                          </td>
                          <td className="py-2 px-2">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-gray-400" />
                              <span className="font-medium text-sm">{tour.travelers}</span>
                            </div>
                          </td>
                          <td className="py-2 px-2">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                              <span className="text-sm">
                                {tour.departure ? new Date(tour.departure).toLocaleDateString() : "N/A"}
                              </span>
                            </div>
                          </td>
                          <td className="py-2 px-2">
                            <span className="font-bold text-green-600 text-sm">${tour.revenue.toLocaleString()}</span>
                          </td>
                          <td className="py-2 px-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                              <span className="font-medium text-sm">{tour.rating}</span>
                            </div>
                          </td>
                          <td className="py-2 px-2">
                            <div className="flex items-center space-x-2">
                              <Link href={`/admin/tours/${tour.id}`}>
                                <Button variant="outline" size="sm" className="rounded-full">
                                  <Eye className="h-3 w-3" />
                                </Button>
                              </Link>
                              <Link href={`/admin/tours/${tour.id}/edit`}>
                                <Button variant="outline" size="sm" className="rounded-full">
                                  <Edit className="h-3 w-3" />
                                </Button>
                              </Link>
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-full text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-gray-500">
                          No tours found. Create your first tour to get started.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  )
}
