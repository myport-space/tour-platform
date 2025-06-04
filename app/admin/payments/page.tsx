"use client"

import { useState } from "react"
import { RefreshCw, AlertCircle, CheckCircle, Clock, XCircle, Search, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import AdminLayout from "@/components/AdminLayout"

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [methodFilter, setMethodFilter] = useState("all")

  const payments = [
    {
      id: "PAY001",
      transactionId: "TXN123456789",
      customer: {
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      booking: {
        id: "BK001",
        tour: "Santorini Sunset Paradise",
      },
      amount: 2598,
      method: "Credit Card",
      status: "Completed",
      date: "2024-03-20",
      processingFee: 77.94,
      netAmount: 2520.06,
      currency: "USD",
      gateway: "Stripe",
    },
    {
      id: "PAY002",
      transactionId: "TXN123456790",
      customer: {
        name: "Michael Chen",
        email: "michael.chen@email.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      booking: {
        id: "BK002",
        tour: "Swiss Alps Adventure",
      },
      amount: 1798,
      method: "PayPal",
      status: "Pending",
      date: "2024-03-19",
      processingFee: 53.94,
      netAmount: 1744.06,
      currency: "USD",
      gateway: "PayPal",
    },
    {
      id: "PAY003",
      transactionId: "TXN123456791",
      customer: {
        name: "Emma Wilson",
        email: "emma.wilson@email.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      booking: {
        id: "BK003",
        tour: "Bali Cultural Journey",
      },
      amount: 799,
      method: "Bank Transfer",
      status: "Failed",
      date: "2024-03-18",
      processingFee: 0,
      netAmount: 0,
      currency: "USD",
      gateway: "Bank",
    },
    {
      id: "PAY004",
      transactionId: "TXN123456792",
      customer: {
        name: "David Rodriguez",
        email: "david.rodriguez@email.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      booking: {
        id: "BK004",
        tour: "Iceland Northern Lights",
      },
      amount: 2398,
      method: "Credit Card",
      status: "Refunded",
      date: "2024-03-17",
      processingFee: 71.94,
      netAmount: 2326.06,
      currency: "USD",
      gateway: "Stripe",
    },
    {
      id: "PAY005",
      transactionId: "TXN123456793",
      customer: {
        name: "Lisa Thompson",
        email: "lisa.thompson@email.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      booking: {
        id: "BK005",
        tour: "Tokyo Food & Culture",
      },
      amount: 1599,
      method: "Credit Card",
      status: "Completed",
      date: "2024-03-16",
      processingFee: 47.97,
      netAmount: 1551.03,
      currency: "USD",
      gateway: "Stripe",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Failed":
        return "bg-red-100 text-red-800 border-red-200"
      case "Refunded":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "Failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "Refunded":
        return <RefreshCw className="h-4 w-4 text-blue-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.booking.tour.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status.toLowerCase() === statusFilter
    const matchesMethod = methodFilter === "all" || payment.method.toLowerCase().includes(methodFilter.toLowerCase())

    return matchesSearch && matchesStatus && matchesMethod
  })

  const totalRevenue = payments.filter((p) => p.status === "Completed").reduce((sum, p) => sum + p.amount, 0)
  const totalFees = payments.filter((p) => p.status === "Completed").reduce((sum, p) => sum + p.processingFee, 0)
  const pendingAmount = payments.filter((p) => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0)

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
            <p className="text-gray-600">Manage and track all payment transactions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">Completed payments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Processing Fees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">${totalFees.toFixed(2)}</div>
              <p className="text-xs text-gray-500 mt-1">Total fees paid</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">${pendingAmount.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">Awaiting processing</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{payments.length}</div>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Transactions</CardTitle>
            <CardDescription>View and manage all payment transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search payments, customers, or tours..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
              <select
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Methods</option>
                <option value="credit">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>

            {/* Payments Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Payment ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Tour</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Method</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{payment.id}</div>
                          <div className="text-sm text-gray-500">{payment.transactionId}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={payment.customer.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {payment.customer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-gray-900">{payment.customer.name}</div>
                            <div className="text-sm text-gray-500">{payment.customer.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{payment.booking.tour}</div>
                          <div className="text-sm text-gray-500">Booking: {payment.booking.id}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">${payment.amount.toLocaleString()}</div>
                          {payment.status === "Completed" && (
                            <div className="text-sm text-gray-500">Fee: ${payment.processingFee}</div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{payment.method}</div>
                          <div className="text-sm text-gray-500">{payment.gateway}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={`${getStatusColor(payment.status)} flex items-center gap-1 w-fit`}>
                          {getStatusIcon(payment.status)}
                          {payment.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{payment.date}</td>
                      <td className="py-4 px-4">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredPayments.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No payments found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
