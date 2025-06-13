"use client"

import { useState, useEffect } from "react"
import { RefreshCw, AlertCircle, CheckCircle, Clock, XCircle, Search, Download, Eye, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import AdminLayout from "@/components/AdminLayout"
import { useToast } from "@/hooks/use-toast"

interface Payment {
  id: string
  transactionId: string
  customer: {
    name: string
    email: string
    avatar: string
  }
  booking: {
    id: string
    tour: string
  }
  amount: number
  method: string
  status: string
  date: string
  processingFee: number
  netAmount: number
  currency: string
  gateway: string
}

interface PaymentStats {
  totalRevenue: number
  totalFees: number
  pendingAmount: number
  totalTransactions: number
}

export default function PaymentsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [methodFilter, setMethodFilter] = useState("all")
  const [payments, setPayments] = useState<Payment[]>([])
  const [stats, setStats] = useState<PaymentStats>({
    totalRevenue: 0,
    totalFees: 0,
    pendingAmount: 0,
    totalTransactions: 0,
  })
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [limit] = useState(10)

  // Fetch payments data
  const fetchPayments = async () => {
    setLoading(true)
    try {
      // Build query parameters
      const params = new URLSearchParams()
      if (searchTerm) params.append("search", searchTerm)
      if (statusFilter !== "all") params.append("status", statusFilter.toLowerCase())
      if (methodFilter !== "all") params.append("method", methodFilter.toLowerCase())
      params.append("page", page.toString())
      params.append("limit", limit.toString())

      const response = await fetch(`/api/payments?${params.toString()}`)

      if (!response.ok) {
        throw new Error("Failed to fetch payments")
      }

      const data = await response.json()
      setPayments(data.payments)
      setStats(data.stats)
      setTotalPages(data.pagination.totalPages)
    } catch (error) {
      console.error("Error fetching payments:", error)
      toast({
        title: "Error",
        description: "Failed to load payments data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Initial data fetch
  useEffect(() => {
    fetchPayments()
  }, [page, limit])

  // Handle search and filter changes
  const handleSearch = () => {
    setPage(1) // Reset to first page when searching
    fetchPayments()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800 border-green-200"
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "FAILED":
        return "bg-red-100 text-red-800 border-red-200"
      case "REFUND":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "PENDING":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "FAILED":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "REFUNDED":
        return <RefreshCw className="h-4 w-4 text-blue-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  // Handle export
  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your payment data is being exported to CSV.",
    })
    // Implement actual export functionality here
  }

  // View payment details
  const viewPaymentDetails = (paymentId: string) => {
    // Implement view payment details functionality
    // Could navigate to a details page or open a modal
    location.href = `/admin/payments/${paymentId}`
  }

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
            <Button variant="outline" size="sm" onClick={handleExport}>
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
              <div className="text-2xl font-bold text-green-600">
                ${loading ? "..." : stats.totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 mt-1">Completed payments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Processing Fees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">${loading ? "..." : stats?.totalFees?.toFixed(2)}</div>
              <p className="text-xs text-gray-500 mt-1">Total fees paid</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                ${loading ? "..." : stats.pendingAmount.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 mt-1">Awaiting processing</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{loading ? "..." : stats.totalTransactions}</div>
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
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value)
                  setPage(1)
                  setTimeout(() => fetchPayments(), 0)
                }}
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
                onChange={(e) => {
                  setMethodFilter(e.target.value)
                  setPage(1)
                  setTimeout(() => fetchPayments(), 0)
                }}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Methods</option>
                <option value="credit">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank">Bank Transfer</option>
              </select>
              <Button onClick={handleSearch}>Search</Button>
            </div>

            {/* Payments Table */}
            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                  <span className="ml-2 text-gray-600">Loading payments...</span>
                </div>
              ) : (
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
                    {payments.map((payment) => (
                      <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{payment.id}</div>
                            <div className="text-sm text-gray-500">{payment.transactionId}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-900">{payment.customer.name}</div>
                          <div className="text-sm text-gray-500">{payment.customer.email}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{payment.booking.tour}</div>
                            <div className="text-sm text-gray-500 truncate w-48">BID: {payment.booking.id}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-gray-900">${payment.amount.toLocaleString()}</div>
                            {payment.status === "COMPLETED" && (
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
                          <Button variant="ghost" size="sm" onClick={() => viewPaymentDetails(payment.id)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {!loading && payments.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No payments found matching your criteria.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-500">
                  Page {page} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (page > 1) {
                        setPage(page - 1)
                      }
                    }}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (page < totalPages) {
                        setPage(page + 1)
                      }
                    }}
                    disabled={page === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
