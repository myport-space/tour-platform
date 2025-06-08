"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
  Eye,
  Edit,
  MoreHorizontal,
  UserPlus,
  TrendingUp,
  Loader2,
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

interface Customer {
  id: number
  name: string
  email: string
  phone: string
  avatar: string
  location: string
  joinDate: string
  totalBookings: number
  totalSpent: number
  lastBooking: string | null
  status: string
  rating: number
  preferredCategories: string[]
}

interface Stats {
  totalCustomers: number
  activeCustomers: number
  vipCustomers: number
  avgCustomerValue: number
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [stats, setStats] = useState<Stats>({
    totalCustomers: 0,
    activeCustomers: 0,
    vipCustomers: 0,
    avgCustomerValue: 0,
  })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewCustomerId, setViewCustomerId] = useState<number | null>(null)
  const [editCustomerId, setEditCustomerId] = useState<number | null>(null)
  const [addCustomerOpen, setAddCustomerOpen] = useState(false)

  // Fetch customers data
  const fetchCustomers = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchTerm) params.append("search", searchTerm)
      if (statusFilter !== "all") params.append("status", statusFilter)

      const response = await fetch(`/api/customers?${params.toString()}`, {
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch customers")
      }

      const data = await response.json()
      setCustomers(data.customers)
      setStats(data.stats)
    } catch (error) {
      console.error("Error fetching customers:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [searchTerm, statusFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200"
      case "VIP":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "New":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Inactive":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const exportCustomers = () => {
    const csvContent = [
      ["Name", "Email", "Phone", "Location", "Status", "Total Bookings", "Total Spent", "Join Date"],
      ...customers.map((customer) => [
        customer.name,
        customer.email,
        customer.phone,
        customer.location,
        customer.status,
        customer.totalBookings.toString(),
        customer.totalSpent.toString(),
        customer.joinDate,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "customers.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
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
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">Customer Management</h1>
            <p className="mt-1 text-sm text-gray-500">Manage customer relationships and track their journey.</p>
          </div>
          <div className="mt-4 flex space-x-3 md:ml-4 md:mt-0">
            <Button variant="outline" className="rounded-lg" onClick={exportCustomers}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg"
              onClick={() => setAddCustomerOpen(true)}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Total Customers",
              value: stats.totalCustomers,
              icon: Users,
              color: "from-blue-500 to-blue-600",
              change: "+12%",
            },
            {
              title: "Active Customers",
              value: stats.activeCustomers,
              icon: TrendingUp,
              color: "from-green-500 to-green-600",
              change: "+8%",
            },
            {
              title: "VIP Customers",
              value: stats.vipCustomers,
              icon: Star,
              color: "from-purple-500 to-purple-600",
              change: "+15%",
            },
            {
              title: "Avg. Customer Value",
              value: `$${stats.avgCustomerValue.toLocaleString()}`,
              icon: TrendingUp,
              color: "from-orange-500 to-orange-600",
              change: "+18%",
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
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-green-600 text-sm font-medium">{stat.change}</span>
                        <span className="text-gray-500 text-sm ml-1">vs last month</span>
                      </div>
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
                    placeholder="Search customers by name, email, or location..."
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
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="rounded-lg">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Customers List */}
        <div className="space-y-4">
          {customers.map((customer, index) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Customer Info */}
                    <div className="lg:col-span-4">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                          <AvatarFallback>
                            {customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                            <Badge
                              className={`${getStatusColor(customer.status)} border rounded-full px-2 py-1 text-xs`}
                            >
                              {customer.status}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2" />
                              {customer.email}
                            </div>
                            {customer.phone && (
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-2" />
                                {customer.phone}
                              </div>
                            )}
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              {customer.location}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="lg:col-span-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Total Bookings</p>
                          <p className="text-xl font-bold text-gray-900">{customer.totalBookings}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Total Spent</p>
                          <p className="text-xl font-bold text-green-600">${customer.totalSpent.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Rating</p>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="font-medium">{customer.rating.toFixed(1)}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Member Since</p>
                          <p className="font-medium">{new Date(customer.joinDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Preferences */}
                    <div className="lg:col-span-3">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Preferred Categories</p>
                          <div className="flex flex-wrap gap-2">
                            {customer.preferredCategories.length > 0 ? (
                              customer.preferredCategories.map((category, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {category}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-xs text-gray-400">No preferences yet</span>
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Last Booking</p>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm">
                              {customer.lastBooking
                                ? new Date(customer.lastBooking).toLocaleDateString()
                                : "No bookings yet"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="lg:col-span-1">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg"
                          onClick={() => setViewCustomerId(customer.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg"
                          onClick={() => setEditCustomerId(customer.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                       
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {customers.length === 0 && !loading && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No customers found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "No customers have booked tours yet."}
            </p>
          </div>
        )}
      </div>

      {/* View Customer Modal */}
      {viewCustomerId && (
        <Dialog open={!!viewCustomerId} onOpenChange={() => setViewCustomerId(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Customer Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {(() => {
                const customer = customers.find((c) => c.id === viewCustomerId)
                return customer ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                        <AvatarFallback>
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">{customer.name}</h3>
                        <Badge className={getStatusColor(customer.status)}>{customer.status}</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Email</Label>
                        <p className="text-sm text-gray-600">{customer.email}</p>
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <p className="text-sm text-gray-600">{customer.phone || "Not provided"}</p>
                      </div>
                      <div>
                        <Label>Location</Label>
                        <p className="text-sm text-gray-600">{customer.location}</p>
                      </div>
                      <div>
                        <Label>Total Bookings</Label>
                        <p className="text-sm text-gray-600">{customer.totalBookings}</p>
                      </div>
                      <div>
                        <Label>Total Spent</Label>
                        <p className="text-sm text-gray-600">${customer.totalSpent.toLocaleString()}</p>
                      </div>
                      <div>
                        <Label>Member Since</Label>
                        <p className="text-sm text-gray-600">{new Date(customer.joinDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ) : null
              })()}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Customer Modal */}
      {editCustomerId && (
        <Dialog open={!!editCustomerId} onOpenChange={() => setEditCustomerId(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Customer</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {(() => {
                const customer = customers.find((c) => c.id === editCustomerId)
                return customer ? (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-customer-name" className="text-right">
                        Name
                      </Label>
                      <Input id="edit-customer-name" defaultValue={customer.name} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-customer-email" className="text-right">
                        Email
                      </Label>
                      <Input id="edit-customer-email" defaultValue={customer.email} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-customer-phone" className="text-right">
                        Phone
                      </Label>
                      <Input id="edit-customer-phone" defaultValue={customer.phone} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="edit-customer-location" className="text-right">
                        Location
                      </Label>
                      <Input id="edit-customer-location" defaultValue={customer.location} className="col-span-3" />
                    </div>
                  </>
                ) : null
              })()}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditCustomerId(null)}>
                Cancel
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Customer Modal */}
      <Dialog open={addCustomerOpen} onOpenChange={setAddCustomerOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>Create a new customer profile.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-customer-name" className="text-right">
                Name
              </Label>
              <Input id="new-customer-name" placeholder="Customer name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-customer-email" className="text-right">
                Email
              </Label>
              <Input id="new-customer-email" type="email" placeholder="customer@email.com" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-customer-phone" className="text-right">
                Phone
              </Label>
              <Input id="new-customer-phone" placeholder="+1 (555) 123-4567" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-customer-location" className="text-right">
                Location
              </Label>
              <Input id="new-customer-location" placeholder="City, Country" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddCustomerOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">Add Customer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
