"use client"

import { useState } from "react"
import { ArrowLeft, Mail, Settings, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

interface TourHeaderProps {
  tour: {
    id: string
    title: string
    status: string 
  }
  onStatusChange: (status: string) => void
  onSendEmail: () => void
}

export function TourHeader({ tour, onStatusChange, onSendEmail }: TourHeaderProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  // Add null checks to prevent errors
  const {
    id = "",
    title = "Tour Details",
    status = "Draft", 
  } = tour || {}

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onStatusChange(newStatus)
    setIsUpdating(false)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white  px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
        
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-500">Tour ID: {id}</p>
          </div>

          <Badge className={getStatusColor(status)}>{status}</Badge>
        </div>

     

          <Select onValueChange={handleStatusChange} defaultValue={status.toLowerCase()} disabled={isUpdating}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Update Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={onSendEmail} className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Send Email
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Tour Settings
              </DropdownMenuItem>
              <DropdownMenuItem>Export Data</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete Tour</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
    </div> 
  )
}
