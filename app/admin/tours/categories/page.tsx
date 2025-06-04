"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Search, Tag, TrendingUp, Eye } from "lucide-react"
import AdminLayout from "@/components/AdminLayout"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null)
  const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null)

  const categories = [
    {
      id: 1,
      name: "Adventure",
      description: "Thrilling outdoor activities and extreme sports",
      color: "#F59E0B",
      tourCount: 24,
      totalBookings: 156,
      revenue: 89500,
      isActive: true,
    },
    {
      id: 2,
      name: "Luxury",
      description: "Premium experiences with high-end accommodations",
      color: "#8B5CF6",
      tourCount: 12,
      totalBookings: 89,
      revenue: 145000,
      isActive: true,
    },
    {
      id: 3,
      name: "Cultural",
      description: "Immersive cultural experiences and heritage tours",
      color: "#EF4444",
      tourCount: 18,
      totalBookings: 134,
      revenue: 67800,
      isActive: true,
    },
    {
      id: 4,
      name: "Nature",
      description: "Wildlife and natural landscape exploration",
      color: "#10B981",
      tourCount: 15,
      totalBookings: 98,
      revenue: 78900,
      isActive: true,
    },
    {
      id: 5,
      name: "Food & Culture",
      description: "Culinary adventures and local food experiences",
      color: "#F97316",
      tourCount: 8,
      totalBookings: 45,
      revenue: 34500,
      isActive: true,
    },
    {
      id: 6,
      name: "Wellness",
      description: "Relaxation and wellness-focused retreats",
      color: "#06B6D4",
      tourCount: 6,
      totalBookings: 32,
      revenue: 28900,
      isActive: false,
    },
  ]

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">Tour Categories</h1>
            <p className="mt-1 text-sm text-gray-500">Organize your tours into categories for better management.</p>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Category</DialogTitle>
                  <DialogDescription>Add a new category to organize your tours better.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" placeholder="Category name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea id="description" placeholder="Category description" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="color" className="text-right">
                      Color
                    </Label>
                    <Input id="color" type="color" defaultValue="#10B981" className="col-span-3 h-10" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Create Category
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search */}
        <Card className="border-2 border-gray-200">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </div>
                    <Badge variant={category.isActive ? "default" : "secondary"} className="rounded-full">
                      {category.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{category.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{category.tourCount}</div>
                      <div className="text-xs text-gray-500">Tours</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{category.totalBookings}</div>
                      <div className="text-xs text-gray-500">Bookings</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">${(category.revenue / 1000).toFixed(0)}k</div>
                      <div className="text-xs text-gray-500">Revenue</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="flex-1 rounded-lg">
                      <Eye className="h-4 w-4 mr-2" />
                      View Tours
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-lg"
                      onClick={() => setEditCategoryId(category.id)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 rounded-lg"
                      onClick={() => setDeleteCategoryId(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card className="border-2 border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Categories</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{categories.length}</p>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full p-3">
                  <Tag className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Active Categories</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{categories.filter((c) => c.isActive).length}</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-full p-3">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Tours</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {categories.reduce((sum, cat) => sum + cat.tourCount, 0)}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-full p-3">
                  <Tag className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    ${(categories.reduce((sum, cat) => sum + cat.revenue, 0) / 1000).toFixed(0)}k
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-full p-3">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Edit Category Modal */}
        {editCategoryId && (
          <Dialog open={!!editCategoryId} onOpenChange={() => setEditCategoryId(null)}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Category</DialogTitle>
                <DialogDescription>Update category information.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="edit-name"
                    defaultValue={categories.find((c) => c.id === editCategoryId)?.name}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="edit-description"
                    defaultValue={categories.find((c) => c.id === editCategoryId)?.description}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-color" className="text-right">
                    Color
                  </Label>
                  <Input
                    id="edit-color"
                    type="color"
                    defaultValue={categories.find((c) => c.id === editCategoryId)?.color}
                    className="col-span-3 h-10"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditCategoryId(null)}>
                  Cancel
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Delete Category Modal */}
        {deleteCategoryId && (
          <Dialog open={!!deleteCategoryId} onOpenChange={() => setDeleteCategoryId(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Category</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete "{categories.find((c) => c.id === deleteCategoryId)?.name}"? This will
                  affect all tours in this category.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteCategoryId(null)}>
                  Cancel
                </Button>
                <Button variant="destructive">Delete Category</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AdminLayout>
  )
}
