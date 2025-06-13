"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  Building,
  Users,
  AwardIcon,
  Camera,
  Plus,
  Save,
  Eye,
  Upload,
  Globe,
  Phone,
  Star,
  Leaf,
  Trash2,
  Settings,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import AdminLayout from "@/components/AdminLayout"

interface ProfileData {
  id: string
  companyName: string
  tagline: string
  description: string
  founded: string
  headquarters: string
  employees: number
  operatingRegions: string[]
  website: string
  email: string
  phone: string
  address: string
  socialMedia: Record<string, string>
  businessHours: Record<string, any>
  timezone: string
  emergencyContact: string
  logo: string
  coverImage: string
  sustainabilityScore: number
  safetyRecord: number
  communityImpact: number
  customerSatisfaction: number
  teamMembers: TeamMember[]
  certifications: Certification[]
  gallery: GalleryItem[]
  partnerships: Partnership[]
  awards: AwardItem[]
  sustainabilityInitiatives: SustainabilityInitiative[]
  isPublic?: boolean
  allowSearchIndexing?: boolean
  allowContactForm?: boolean
}

interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  bio: string
  email: string
  phone: string
}

interface Certification {
  id: string
  name: string
  year: string
  organization: string
  certificateNumber: string
  certificateUrl: string
}

interface GalleryItem {
  id: string
  url: string
  caption: string
  category: string
}

interface Partnership {
  id: string
  name: string
  logo: string
  description: string
  website: string
  startDate: string
}

interface AwardItem {
  id: string
  name: string
  year: string
  organization: string
  description: string
}

interface SustainabilityInitiative {
  id: string
  title: string
  description: string
  icon: string
  startDate: string
  impact: string
}

export default function AdminProfile() {
  const [activeTab, setActiveTab] = useState("basic")
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newItemData, setNewItemData] = useState<any>({})
  const { toast } = useToast()

  const tabs = [
    { id: "basic", label: "Basic Info", icon: Building },
    { id: "contact", label: "Contact", icon: Phone },
    { id: "team", label: "Team", icon: Users },
    { id: "certifications", label: "Certifications", icon: AwardIcon },
    { id: "gallery", label: "Gallery", icon: Camera },
    { id: "partnerships", label: "Partnerships", icon: Globe },
    { id: "awards", label: "Awards", icon: Star },
    { id: "sustainability", label: "Sustainability", icon: Leaf },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  // Fetch profile data
  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        setProfileData(data)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch profile data",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
      toast({
        title: "Error",
        description: "Failed to fetch profile data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const saveProfile = async () => {
    if (!profileData) return

    setSaving(true)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/profile/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: profileData.companyName,
          tagline: profileData.tagline,
          description: profileData.description,
          founded: profileData.founded,
          headquarters: profileData.headquarters,
          employees: profileData.employees,
          operatingRegions: profileData.operatingRegions,
          website: profileData.website,
          email: profileData.email,
          phone: profileData.phone,
          address: profileData.address,
          socialMedia: profileData.socialMedia,
          businessHours: profileData.businessHours,
          timezone: profileData.timezone,
          emergencyContact: profileData.emergencyContact,
          sustainabilityScore: profileData.sustainabilityScore,
          safetyRecord: profileData.safetyRecord,
          communityImpact: profileData.communityImpact,
          customerSatisfaction: profileData.customerSatisfaction,
          isPublic: profileData.isPublic,
          allowSearchIndexing: profileData.allowSearchIndexing,
          allowContactForm: profileData.allowContactForm,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Profile updated successfully",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to update profile",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error saving profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const updateProfileField = (field: keyof ProfileData, value: any) => {
    if (!profileData) return
    setProfileData({ ...profileData, [field]: value })
  }

  const resetNewItemData = () => {
    setNewItemData({})
  }

  const handleAddItem = async () => {
    try {
      const token = localStorage.getItem("token")
      let endpoint = ""
      let payload = {}

      switch (activeTab) {
        case "team":
          endpoint = "/api/profile/team"
          payload = {
            name: newItemData.name || "",
            role: newItemData.role || "",
            image: newItemData.image || "",
            bio: newItemData.bio || "",
            email: newItemData.email || "",
            phone: newItemData.phone || "",
          }
          break
        case "certifications":
          endpoint = "/api/profile/certifications"
          payload = {
            name: newItemData.name || "",
            year: newItemData.year || new Date().getFullYear().toString(),
            organization: newItemData.organization || "",
            certificateNumber: newItemData.certificateNumber || "",
            certificateUrl: newItemData.certificateUrl || "",
          }
          break
        case "gallery":
          endpoint = "/api/profile/gallery"
          payload = {
            url: newItemData.url || "/placeholder.svg?height=300&width=400",
            caption: newItemData.caption || "",
            category: newItemData.category || "general",
          }
          break
        case "partnerships":
          endpoint = "/api/profile/partnerships"
          payload = {
            name: newItemData.name || "",
            logo: newItemData.logo || "",
            description: newItemData.description || "",
            website: newItemData.website || "",
            startDate: newItemData.startDate || new Date().toISOString().split("T")[0],
          }
          break
        case "awards":
          endpoint = "/api/profile/awards"
          payload = {
            name: newItemData.name || "",
            year: newItemData.year || new Date().getFullYear().toString(),
            organization: newItemData.organization || "",
            description: newItemData.description || "",
          }
          break
        case "sustainability":
          endpoint = "/api/profile/sustainability"
          payload = {
            title: newItemData.title || "",
            description: newItemData.description || "",
            icon: newItemData.icon || "Leaf",
            startDate: newItemData.startDate || new Date().toISOString().split("T")[0],
            impact: newItemData.impact || "",
          }
          break
        default:
          return
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        await fetchProfile() // Refresh data
        setShowAddDialog(false)
        resetNewItemData()
        toast({
          title: "Success",
          description: "Item added successfully",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to add item",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item",
        variant: "destructive",
      })
    }
  }

  const updateTeamMember = async (id: string, field: string, value: string) => {
    if (!profileData) return

    // Update local state immediately
    const updatedMembers = profileData.teamMembers.map((member) =>
      member.id === id ? { ...member, [field]: value } : member,
    )
    setProfileData({ ...profileData, teamMembers: updatedMembers })

    // Update on server
    try {
      const token = localStorage.getItem("token")
      const member = profileData.teamMembers.find((m) => m.id === id)
      if (!member) return

      await fetch(`/api/profile/team/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...member,
          [field]: value,
        }),
      })
    } catch (error) {
      console.error("Error updating team member:", error)
    }
  }

  const removeTeamMember = async (id: string) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/profile/team/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        await fetchProfile() // Refresh data
        toast({
          title: "Success",
          description: "Team member removed successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove team member",
        variant: "destructive",
      })
    }
  }

  // Certification functions
  const updateCertification = async (id: string, field: string, value: string) => {
    if (!profileData) return

    const updatedCertifications = profileData.certifications.map((cert) =>
      cert.id === id ? { ...cert, [field]: value } : cert,
    )
    setProfileData({ ...profileData, certifications: updatedCertifications })

    try {
      const token = localStorage.getItem("token")
      const cert = profileData.certifications.find((c) => c.id === id)
      if (!cert) return

      await fetch(`/api/profile/certifications/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...cert,
          [field]: value,
        }),
      })
    } catch (error) {
      console.error("Error updating certification:", error)
    }
  }

  const removeCertification = async (id: string) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/profile/certifications/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        await fetchProfile()
        toast({
          title: "Success",
          description: "Certification removed successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove certification",
        variant: "destructive",
      })
    }
  }

  // Gallery functions
  const updateGalleryItem = async (id: string, field: string, value: string) => {
    if (!profileData) return

    const updatedGallery = profileData.gallery.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    setProfileData({ ...profileData, gallery: updatedGallery })

    try {
      const token = localStorage.getItem("token")
      const item = profileData.gallery.find((g) => g.id === id)
      if (!item) return

      await fetch(`/api/profile/gallery/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...item,
          [field]: value,
        }),
      })
    } catch (error) {
      console.error("Error updating gallery item:", error)
    }
  }

  const removeGalleryItem = async (id: string) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/profile/gallery/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        await fetchProfile()
        toast({
          title: "Success",
          description: "Gallery item removed successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove gallery item",
        variant: "destructive",
      })
    }
  }

  // Partnership functions
  const updatePartnership = async (id: string, field: string, value: string) => {
    if (!profileData) return

    const updatedPartnerships = profileData.partnerships.map((partner) =>
      partner.id === id ? { ...partner, [field]: value } : partner,
    )
    setProfileData({ ...profileData, partnerships: updatedPartnerships })

    try {
      const token = localStorage.getItem("token")
      const partner = profileData.partnerships.find((p) => p.id === id)
      if (!partner) return

      await fetch(`/api/profile/partnerships/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...partner,
          [field]: value,
        }),
      })
    } catch (error) {
      console.error("Error updating partnership:", error)
    }
  }

  const removePartnership = async (id: string) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/profile/partnerships/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        await fetchProfile()
        toast({
          title: "Success",
          description: "Partnership removed successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove partnership",
        variant: "destructive",
      })
    }
  }

  // Award functions
  const updateAward = async (id: string, field: string, value: string) => {
    if (!profileData) return

    const updatedAwards = profileData.awards.map((award) => (award.id === id ? { ...award, [field]: value } : award))
    setProfileData({ ...profileData, awards: updatedAwards })

    try {
      const token = localStorage.getItem("token")
      const award = profileData.awards.find((a) => a.id === id)
      if (!award) return

      await fetch(`/api/profile/awards/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...award,
          [field]: value,
        }),
      })
    } catch (error) {
      console.error("Error updating award:", error)
    }
  }

  const removeAward = async (id: string) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/profile/awards/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        await fetchProfile()
        toast({
          title: "Success",
          description: "Award removed successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove award",
        variant: "destructive",
      })
    }
  }

  // Sustainability functions
  const updateSustainabilityInitiative = async (id: string, field: string, value: string) => {
    if (!profileData) return

    const updatedInitiatives = profileData.sustainabilityInitiatives.map((initiative) =>
      initiative.id === id ? { ...initiative, [field]: value } : initiative,
    )
    setProfileData({ ...profileData, sustainabilityInitiatives: updatedInitiatives })

    try {
      const token = localStorage.getItem("token")
      const initiative = profileData.sustainabilityInitiatives.find((s) => s.id === id)
      if (!initiative) return

      await fetch(`/api/profile/sustainability/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...initiative,
          [field]: value,
        }),
      })
    } catch (error) {
      console.error("Error updating sustainability initiative:", error)
    }
  }

  const removeSustainabilityInitiative = async (id: string) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/profile/sustainability/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        await fetchProfile()
        toast({
          title: "Success",
          description: "Sustainability initiative removed successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove sustainability initiative",
        variant: "destructive",
      })
    }
  }

  const renderAddDialog = () => {
    const getDialogTitle = () => {
      switch (activeTab) {
        case "team":
          return "Add Team Member"
        case "certifications":
          return "Add Certification"
        case "gallery":
          return "Add Photo"
        case "partnerships":
          return "Add Partnership"
        case "awards":
          return "Add Award"
        case "sustainability":
          return "Add Sustainability Initiative"
        default:
          return "Add Item"
      }
    }

    const renderDialogContent = () => {
      switch (activeTab) {
        case "team":
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    value={newItemData.name || ""}
                    onChange={(e) => setNewItemData({ ...newItemData, name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role/Position</Label>
                  <Input
                    value={newItemData.role || ""}
                    onChange={(e) => setNewItemData({ ...newItemData, role: e.target.value })}
                    placeholder="Tour Guide"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    value={newItemData.email || ""}
                    onChange={(e) => setNewItemData({ ...newItemData, email: e.target.value })}
                    placeholder="john@company.com"
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={newItemData.phone || ""}
                    onChange={(e) => setNewItemData({ ...newItemData, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea
                  value={newItemData.bio || ""}
                  onChange={(e) => setNewItemData({ ...newItemData, bio: e.target.value })}
                  placeholder="Brief description of experience and expertise..."
                  rows={3}
                />
              </div>
            </div>
          )

        case "certifications":
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Certification Name</Label>
                  <Input
                    value={newItemData.name || ""}
                    onChange={(e) => setNewItemData({ ...newItemData, name: e.target.value })}
                    placeholder="Eco Tourism Certification"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Year</Label>
                  <Input
                    value={newItemData.year || ""}
                    onChange={(e) => setNewItemData({ ...newItemData, year: e.target.value })}
                    placeholder="2023"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Organization</Label>
                  <Input
                    value={newItemData.organization || ""}
                    onChange={(e) => setNewItemData({ ...newItemData, organization: e.target.value })}
                    placeholder="Tourism Board"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Certificate Number</Label>
                  <Input
                    value={newItemData.certificateNumber || ""}
                    onChange={(e) => setNewItemData({ ...newItemData, certificateNumber: e.target.value })}
                    placeholder="CERT-2023-001"
                  />
                </div>
              </div>
            </div>
          )

        case "gallery":
          return (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Photo URL</Label>
                <Input
                  value={newItemData.url || ""}
                  onChange={(e) => setNewItemData({ ...newItemData, url: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label>Caption</Label>
                <Input
                  value={newItemData.caption || ""}
                  onChange={(e) => setNewItemData({ ...newItemData, caption: e.target.value })}
                  placeholder="Beautiful sunset at the mountain peak"
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={newItemData.category || "general"}
                  onValueChange={(value) => setNewItemData({ ...newItemData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="tours">Tours</SelectItem>
                    <SelectItem value="nature">Nature</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
                    <SelectItem value="facilities">Facilities</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )

        case "partnerships":
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Partner Name</Label>
                  <Input
                    value={newItemData.name || ""}
                    onChange={(e) => setNewItemData({ ...newItemData, name: e.target.value })}
                    placeholder="Local Wildlife Foundation"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input
                    value={newItemData.website || ""}
                    onChange={(e) => setNewItemData({ ...newItemData, website: e.target.value })}
                    placeholder="https://partner.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={newItemData.description || ""}
                  onChange={(e) => setNewItemData({ ...newItemData, description: e.target.value })}
                  placeholder="Partnership description and benefits..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  value={newItemData.startDate || ""}
                  onChange={(e) => setNewItemData({ ...newItemData, startDate: e.target.value })}
                  type="date"
                />
              </div>
            </div>
          )

        case "awards":
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Award Name</Label>
                  <Input
                    value={newItemData.name || ""}
                    onChange={(e) => setNewItemData({ ...newItemData, name: e.target.value })}
                    placeholder="Best Eco Tour Operator"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Year</Label>
                  <Input
                    value={newItemData.year || ""}
                    onChange={(e) => setNewItemData({ ...newItemData, year: e.target.value })}
                    placeholder="2023"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Organization</Label>
                <Input
                  value={newItemData.organization || ""}
                  onChange={(e) => setNewItemData({ ...newItemData, organization: e.target.value })}
                  placeholder="Tourism Excellence Awards"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={newItemData.description || ""}
                  onChange={(e) => setNewItemData({ ...newItemData, description: e.target.value })}
                  placeholder="Award description and significance..."
                  rows={3}
                />
              </div>
            </div>
          )

        case "sustainability":
          return (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Initiative Title</Label>
                <Input
                  value={newItemData.title || ""}
                  onChange={(e) => setNewItemData({ ...newItemData, title: e.target.value })}
                  placeholder="Carbon Neutral Tours"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={newItemData.description || ""}
                  onChange={(e) => setNewItemData({ ...newItemData, description: e.target.value })}
                  placeholder="Describe the sustainability initiative..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    value={newItemData.startDate || ""}
                    onChange={(e) => setNewItemData({ ...newItemData, startDate: e.target.value })}
                    type="date"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Icon</Label>
                  <Select
                    value={newItemData.icon || "Leaf"}
                    onValueChange={(value) => setNewItemData({ ...newItemData, icon: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select icon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Leaf">Leaf</SelectItem>
                      <SelectItem value="Globe">Globe</SelectItem>
                      <SelectItem value="Star">Star</SelectItem>
                      <SelectItem value="Heart">Heart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Impact</Label>
                <Textarea
                  value={newItemData.impact || ""}
                  onChange={(e) => setNewItemData({ ...newItemData, impact: e.target.value })}
                  placeholder="Describe the positive impact..."
                  rows={2}
                />
              </div>
            </div>
          )

        default:
          return <div>No form available for this section.</div>
      }
    }

    return (
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{getDialogTitle()}</DialogTitle>
          </DialogHeader>
          <div className="py-4">{renderDialogContent()}</div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddItem} className="bg-gradient-to-r from-green-500 to-emerald-600">
              Add Item
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
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

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    )
  }

  if (!profileData) {
    return (
      <AdminLayout>
        <div className="text-center py-8">
          <p>No profile data found. Please create an operator profile first.</p>
        </div>
      </AdminLayout>
    )
  }

  const renderBasicInfo = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <motion.div variants={itemVariants}>
        <Card className="border-2 border-gray-200 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm">
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  value={profileData.companyName || ""}
                  onChange={(e) => updateProfileField("companyName", e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline" className="text-sm">
                  Tagline
                </Label>
                <Input
                  id="tagline"
                  value={profileData.tagline || ""}
                  onChange={(e) => updateProfileField("tagline", e.target.value)}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm">
                Company Description
              </Label>
              <Textarea
                id="description"
                value={profileData.description || ""}
                onChange={(e) => updateProfileField("description", e.target.value)}
                className="rounded-xl min-h-32"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="founded" className="text-sm">
                  Founded Year
                </Label>
                <Input
                  id="founded"
                  value={profileData.founded || ""}
                  onChange={(e) => updateProfileField("founded", e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="headquarters" className="text-sm">
                  Headquarters
                </Label>
                <Input
                  id="headquarters"
                  value={profileData.headquarters || ""}
                  onChange={(e) => updateProfileField("headquarters", e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employees" className="text-sm">
                  Number of Employees
                </Label>
                <Input
                  id="employees"
                  value={profileData.employees || ""}
                  onChange={(e) => updateProfileField("employees", Number.parseInt(e.target.value) || 0)}
                  type="number"
                  className="rounded-xl"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-2 border-gray-200 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="sustainabilityScore" className="text-sm">
                  Sustainability Score (%)
                </Label>
                <Input
                  id="sustainabilityScore"
                  value={profileData.sustainabilityScore || ""}
                  onChange={(e) => updateProfileField("sustainabilityScore", Number.parseInt(e.target.value) || 0)}
                  type="number"
                  min="0"
                  max="100"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="safetyRecord" className="text-sm">
                  Safety Record (%)
                </Label>
                <Input
                  id="safetyRecord"
                  value={profileData.safetyRecord || ""}
                  onChange={(e) => updateProfileField("safetyRecord", Number.parseInt(e.target.value) || 0)}
                  type="number"
                  min="0"
                  max="100"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="communityImpact" className="text-sm">
                  Local Community Impact (%)
                </Label>
                <Input
                  id="communityImpact"
                  value={profileData.communityImpact || ""}
                  onChange={(e) => updateProfileField("communityImpact", Number.parseInt(e.target.value) || 0)}
                  type="number"
                  min="0"
                  max="100"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerSatisfaction" className="text-sm">
                  Customer Satisfaction (%)
                </Label>
                <Input
                  id="customerSatisfaction"
                  value={profileData.customerSatisfaction || ""}
                  onChange={(e) => updateProfileField("customerSatisfaction", Number.parseInt(e.target.value) || 0)}
                  type="number"
                  min="0"
                  max="100"
                  className="rounded-xl"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )

  const renderTeam = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
        <Button
          onClick={() => {
            resetNewItemData()
            setShowAddDialog(true)
          }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </motion.div>

      {profileData.teamMembers.map((member, index) => (
        <motion.div key={member.id} variants={itemVariants}>
          <Card className="border-2 border-gray-200 rounded-3xl">
            <CardHeader className="p-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base font-bold">{member.name || `Team Member ${index + 1}`}</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeTeamMember(member.id)}
                  className="rounded-full text-red-600 hover:text-red-700 text-sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Profile Photo</Label>
                  <div className="flex flex-col items-center space-y-2">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" className="rounded-xl text-sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-sm">Full Name</Label>
                      <Input
                        value={member.name}
                        onChange={(e) => updateTeamMember(member.id, "name", e.target.value)}
                        placeholder="John Doe"
                        className="rounded-xl text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm">Role/Position</Label>
                      <Input
                        value={member.role}
                        onChange={(e) => updateTeamMember(member.id, "role", e.target.value)}
                        placeholder="Tour Guide"
                        className="rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-sm">Email</Label>
                      <Input
                        value={member.email}
                        onChange={(e) => updateTeamMember(member.id, "email", e.target.value)}
                        placeholder="john@ecowander.com"
                        type="email"
                        className="rounded-xl text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm">Phone</Label>
                      <Input
                        value={member.phone}
                        onChange={(e) => updateTeamMember(member.id, "phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-sm">Bio</Label>
                    <Textarea
                      value={member.bio}
                      onChange={(e) => updateTeamMember(member.id, "bio", e.target.value)}
                      placeholder="Brief description of experience and expertise..."
                      className="rounded-xl text-sm"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )

  const renderContact = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <motion.div variants={itemVariants}>
        <Card className="border-2 border-gray-200 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">
                  Email Address
                </Label>
                <Input
                  id="email"
                  value={profileData?.email || ""}
                  onChange={(e) => updateProfileField("email", e.target.value)}
                  type="email"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={profileData?.phone || ""}
                  onChange={(e) => updateProfileField("phone", e.target.value)}
                  className="rounded-xl"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm">
                Address
              </Label>
              <Textarea
                id="address"
                value={profileData?.address || ""}
                onChange={(e) => updateProfileField("address", e.target.value)}
                className="rounded-xl"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="website" className="text-sm">
                  Website
                </Label>
                <Input
                  id="website"
                  value={profileData?.website || ""}
                  onChange={(e) => updateProfileField("website", e.target.value)}
                  type="url"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact" className="text-sm">
                  Emergency Contact
                </Label>
                <Input
                  id="emergencyContact"
                  value={profileData?.emergencyContact || ""}
                  onChange={(e) => updateProfileField("emergencyContact", e.target.value)}
                  className="rounded-xl"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )

  const renderCertifications = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Certifications</h2>
        <Button
          onClick={() => {
            resetNewItemData()
            setShowAddDialog(true)
          }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Certification
        </Button>
      </motion.div>

      {profileData?.certifications.map((cert, index) => (
        <motion.div key={cert.id} variants={itemVariants}>
          <Card className="border-2 border-gray-200 rounded-3xl">
            <CardHeader className="p-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base font-bold">{cert.name || `Certification ${index + 1}`}</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeCertification(cert.id)}
                  className="rounded-full text-red-600 hover:text-red-700 text-sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Certification Name</Label>
                  <Input
                    value={cert.name}
                    onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
                    placeholder="Certification Name"
                    className="rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Year</Label>
                  <Input
                    value={cert.year}
                    onChange={(e) => updateCertification(cert.id, "year", e.target.value)}
                    placeholder="2023"
                    className="rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Organization</Label>
                  <Input
                    value={cert.organization}
                    onChange={(e) => updateCertification(cert.id, "organization", e.target.value)}
                    placeholder="Certifying Organization"
                    className="rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Certificate Number</Label>
                  <Input
                    value={cert.certificateNumber}
                    onChange={(e) => updateCertification(cert.id, "certificateNumber", e.target.value)}
                    placeholder="Certificate Number"
                    className="rounded-xl text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )

  const renderGallery = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Photo Gallery</h2>
        <Button
          onClick={() => {
            resetNewItemData()
            setShowAddDialog(true)
          }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Photo
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profileData?.gallery.map((item) => (
          <motion.div key={item.id} variants={itemVariants}>
            <Card className="border-2 border-gray-200 rounded-3xl overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={item.url || "/placeholder.svg?height=200&width=300"}
                  alt={item.caption}
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeGalleryItem(item.id)}
                  className="absolute top-2 right-2 rounded-full text-red-600 hover:text-red-700 bg-white/80"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <CardContent className="p-4 space-y-2">
                <Input
                  value={item.caption}
                  onChange={(e) => updateGalleryItem(item.id, "caption", e.target.value)}
                  placeholder="Photo caption..."
                  className="rounded-xl text-sm"
                />
                <Input
                  value={item.category}
                  onChange={(e) => updateGalleryItem(item.id, "category", e.target.value)}
                  placeholder="Category"
                  className="rounded-xl text-sm"
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )

  const renderPartnerships = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Partnerships</h2>
        <Button
          onClick={() => {
            resetNewItemData()
            setShowAddDialog(true)
          }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Partnership
        </Button>
      </motion.div>

      {profileData?.partnerships.map((partner, index) => (
        <motion.div key={partner.id} variants={itemVariants}>
          <Card className="border-2 border-gray-200 rounded-3xl">
            <CardHeader className="p-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base font-bold">{partner.name || `Partnership ${index + 1}`}</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removePartnership(partner.id)}
                  className="rounded-full text-red-600 hover:text-red-700 text-sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Partner Name</Label>
                  <Input
                    value={partner.name}
                    onChange={(e) => updatePartnership(partner.id, "name", e.target.value)}
                    placeholder="Partner Name"
                    className="rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Website</Label>
                  <Input
                    value={partner.website}
                    onChange={(e) => updatePartnership(partner.id, "website", e.target.value)}
                    placeholder="https://partner.com"
                    className="rounded-xl text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Description</Label>
                <Textarea
                  value={partner.description}
                  onChange={(e) => updatePartnership(partner.id, "description", e.target.value)}
                  placeholder="Partnership description and benefits..."
                  className="rounded-xl text-sm"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )

  const renderAwards = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Awards & Recognition</h2>
        <Button
          onClick={() => {
            resetNewItemData()
            setShowAddDialog(true)
          }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Award
        </Button>
      </motion.div>

      {profileData?.awards.map((award, index) => (
        <motion.div key={award.id} variants={itemVariants}>
          <Card className="border-2 border-gray-200 rounded-3xl">
            <CardHeader className="p-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base font-bold">{award.name || `Award ${index + 1}`}</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeAward(award.id)}
                  className="rounded-full text-red-600 hover:text-red-700 text-sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Award Name</Label>
                  <Input
                    value={award.name}
                    onChange={(e) => updateAward(award.id, "name", e.target.value)}
                    placeholder="Award Name"
                    className="rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Year</Label>
                  <Input
                    value={award.year}
                    onChange={(e) => updateAward(award.id, "year", e.target.value)}
                    placeholder="2023"
                    className="rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Organization</Label>
                  <Input
                    value={award.organization}
                    onChange={(e) => updateAward(award.id, "organization", e.target.value)}
                    placeholder="Awarding Organization"
                    className="rounded-xl text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Description</Label>
                <Textarea
                  value={award.description}
                  onChange={(e) => updateAward(award.id, "description", e.target.value)}
                  placeholder="Award description..."
                  className="rounded-xl text-sm"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )

  const renderSustainability = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Sustainability Initiatives</h2>
        <Button
          onClick={() => {
            resetNewItemData()
            setShowAddDialog(true)
          }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Initiative
        </Button>
      </motion.div>

      {profileData?.sustainabilityInitiatives.map((initiative, index) => (
        <motion.div key={initiative.id} variants={itemVariants}>
          <Card className="border-2 border-gray-200 rounded-3xl">
            <CardHeader className="p-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base font-bold">{initiative.title || `Initiative ${index + 1}`}</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeSustainabilityInitiative(initiative.id)}
                  className="rounded-full text-red-600 hover:text-red-700 text-sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Initiative Title</Label>
                  <Input
                    value={initiative.title}
                    onChange={(e) => updateSustainabilityInitiative(initiative.id, "title", e.target.value)}
                    placeholder="Initiative Title"
                    className="rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Start Date</Label>
                  <Input
                    value={initiative.startDate}
                    onChange={(e) => updateSustainabilityInitiative(initiative.id, "startDate", e.target.value)}
                    type="date"
                    className="rounded-xl text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Description</Label>
                <Textarea
                  value={initiative.description}
                  onChange={(e) => updateSustainabilityInitiative(initiative.id, "description", e.target.value)}
                  placeholder="Initiative description..."
                  className="rounded-xl text-sm"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Impact</Label>
                <Textarea
                  value={initiative.impact}
                  onChange={(e) => updateSustainabilityInitiative(initiative.id, "impact", e.target.value)}
                  placeholder="Describe the impact..."
                  className="rounded-xl text-sm"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )

  const renderSettings = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <motion.div variants={itemVariants}>
        <Card className="border-2 border-gray-200 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Profile Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Public Profile</Label>
                  <p className="text-xs text-gray-500">Make your profile visible to customers</p>
                </div>
                <input
                  type="checkbox"
                  checked={profileData?.isPublic || false}
                  onChange={(e) => updateProfileField("isPublic", e.target.checked)}
                  className="rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Search Engine Indexing</Label>
                  <p className="text-xs text-gray-500">Allow search engines to index your profile</p>
                </div>
                <input
                  type="checkbox"
                  checked={profileData?.allowSearchIndexing || false}
                  onChange={(e) => updateProfileField("allowSearchIndexing", e.target.checked)}
                  className="rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Contact Form</Label>
                  <p className="text-xs text-gray-500">Allow customers to contact you through your profile</p>
                </div>
                <input
                  type="checkbox"
                  checked={profileData?.allowContactForm || false}
                  onChange={(e) => updateProfileField("allowContactForm", e.target.checked)}
                  className="rounded"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return renderBasicInfo()
      case "contact":
        return renderContact()
      case "team":
        return renderTeam()
      case "certifications":
        return renderCertifications()
      case "gallery":
        return renderGallery()
      case "partnerships":
        return renderPartnerships()
      case "awards":
        return renderAwards()
      case "sustainability":
        return renderSustainability()
      case "settings":
        return renderSettings()
      default:
        return renderBasicInfo()
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">Operator Profile</h1>
            <p className="mt-1 text-sm text-gray-500">Manage your company profile and public information.</p>
          </div>
          <div className="mt-4 flex space-x-3 md:ml-4 md:mt-0">
            <Link href="/operator/1">
              <Button variant="outline" className="rounded-lg">
                <Eye className="h-4 w-4 mr-2" />
                Preview Profile
              </Button>
            </Link>
            <Button
              onClick={saveProfile}
              disabled={saving}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg"
            >
              {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="space-y-1">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="font-medium text-sm">{tab.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Add Dialog */}
      {renderAddDialog()}
    </AdminLayout>
  )
}
