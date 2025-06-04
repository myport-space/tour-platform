"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface AddSpotModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  tourId: string
  onSpotAdded: () => void
}

export default function AddSpotModal({ open, onOpenChange, tourId, onSpotAdded }: AddSpotModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    departureDate: "",
    returnDate: "",
    maxSeats: "",
    price: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/spots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tourId,
        }),
      })

      if (response.ok) {
        toast.success("Spot created successfully")
        onSpotAdded()
        onOpenChange(false)
        setFormData({
          name: "",
          departureDate: "",
          returnDate: "",
          maxSeats: "",
          price: "",
        })
      } else {
        toast.error("Failed to create spot")
      }
    } catch (error) {
      toast.error("Error creating spot")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Spot</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Spot Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., April Departure"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="departureDate">Departure Date</Label>
              <Input
                id="departureDate"
                type="date"
                value={formData.departureDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, departureDate: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="returnDate">Return Date</Label>
              <Input
                id="returnDate"
                type="date"
                value={formData.returnDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, returnDate: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="maxSeats">Max Seats</Label>
              <Input
                id="maxSeats"
                type="number"
                value={formData.maxSeats}
                onChange={(e) => setFormData((prev) => ({ ...prev, maxSeats: e.target.value }))}
                placeholder="12"
                min="1"
                required
              />
            </div>
            <div>
              <Label htmlFor="price">Price (Optional)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                placeholder="Leave empty to use tour price"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Spot"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
