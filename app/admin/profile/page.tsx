"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Building,
  Users,
  Award,
  Camera,
  Plus,
  X,
  Save,
  Eye,
  Upload,
  Globe,
  Phone,
  Star,
  Leaf,
  Shield,
  Trash2,
  FileText,
  Settings,
  User,
  ImageIcon,
} from "lucide-react"
import Link from "next/link"
import AdminLayout from "@/components/AdminLayout"

export default function AdminProfile() {
  const [activeTab, setActiveTab] = useState("basic")
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=100&width=100",
      bio: "Former conservation biologist with a passion for sustainable travel",
      email: "sarah@ecowander.com",
      phone: "+1 (555) 123-4567",
    },
  ])
  const [certifications, setCertifications] = useState([
    {
      id: 1,
      name: "Certified Sustainable Tourism",
      year: "2012",
      organization: "Global Sustainable Tourism Council",
      certificateNumber: "CST-2012-001",
    },
  ])
  const [gallery, setGallery] = useState([
    {
      id: 1,
      url: "https://res.cloudinary.com/dnsc6ccwp/image/upload/v1748534256/backpacker-772991_qtegir.jpg",
      caption: "Guided hike through the Swiss Alps",
      category: "Adventure",
    },
  ])
  const [partnerships, setPartnerships] = useState([
    {
      id: 1,
      name: "World Wildlife Fund",
      logo: "/placeholder.svg?height=60&width=60",
      description: "Conservation partnership to protect endangered species",
      website: "https://www.worldwildlife.org",
      startDate: "2018",
    },
  ])
  const [awards, setAwards] = useState([
    {
      id: 1,
      name: "Sustainable Tourism Excellence Award",
      year: "2023",
      organization: "World Travel Association",
      description: "Recognized for outstanding commitment to sustainable travel practices",
    },
  ])
  const [sustainabilityInitiatives, setSustainabilityInitiatives] = useState([
    {
      id: 1,
      title: "Carbon Offset Program",
      description: "We offset 150% of the carbon emissions from all our tours through verified reforestation projects.",
      icon: "Leaf",
      startDate: "2019",
      impact: "15,000 tons CO2 offset annually",
    },
  ])

  const tabs = [
    { id: "basic", label: "Basic Info", icon: Building },
    { id: "contact", label: "Contact", icon: Phone },
    { id: "team", label: "Team", icon: Users },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "gallery", label: "Gallery", icon: Camera },
    { id: "partnerships", label: "Partnerships", icon: Globe },
    { id: "awards", label: "Awards", icon: Star },
    { id: "sustainability", label: "Sustainability", icon: Leaf },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const addTeamMember = () => {
    const newMember = {
      id: Date.now(),
      name: "",
      role: "",
      image: "",
      bio: "",
      email: "",
      phone: "",
    }
    setTeamMembers([...teamMembers, newMember])
  }

  const updateTeamMember = (id: number, field: string, value: string) => {
    setTeamMembers(teamMembers.map((member) => (member.id === id ? { ...member, [field]: value } : member)))
  }

  const removeTeamMember = (id: number) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id))
  }

  const addCertification = () => {
    const newCert = {
      id: Date.now(),
      name: "",
      year: "",
      organization: "",
      certificateNumber: "",
    }
    setCertifications([...certifications, newCert])
  }

  const updateCertification = (id: number, field: string, value: string) => {
    setCertifications(certifications.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert)))
  }

  const removeCertification = (id: number) => {
    setCertifications(certifications.filter((cert) => cert.id !== id))
  }

  const addGalleryItem = () => {
    const newItem = {
      id: Date.now(),
      url: "",
      caption: "",
      category: "",
    }
    setGallery([...gallery, newItem])
  }

  const updateGalleryItem = (id: number, field: string, value: string) => {
    setGallery(gallery.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const removeGalleryItem = (id: number) => {
    setGallery(gallery.filter((item) => item.id !== id))
  }

  const addPartnership = () => {
    const newPartnership = {
      id: Date.now(),
      name: "",
      logo: "",
      description: "",
      website: "",
      startDate: "",
    }
    setPartnerships([...partnerships, newPartnership])
  }

  const updatePartnership = (id: number, field: string, value: string) => {
    setPartnerships(partnerships.map((partner) => (partner.id === id ? { ...partner, [field]: value } : partner)))
  }

  const removePartnership = (id: number) => {
    setPartnerships(partnerships.filter((partner) => partner.id !== id))
  }

  const addAward = () => {
    const newAward = {
      id: Date.now(),
      name: "",
      year: "",
      organization: "",
      description: "",
    }
    setAwards([...awards, newAward])
  }

  const updateAward = (id: number, field: string, value: string) => {
    setAwards(awards.map((award) => (award.id === id ? { ...award, [field]: value } : award)))
  }

  const removeAward = (id: number) => {
    setAwards(awards.filter((award) => award.id !== id))
  }

  const addSustainabilityInitiative = () => {
    const newInitiative = {
      id: Date.now(),
      title: "",
      description: "",
      icon: "Leaf",
      startDate: "",
      impact: "",
    }
    setSustainabilityInitiatives([...sustainabilityInitiatives, newInitiative])
  }

  const updateSustainabilityInitiative = (id: number, field: string, value: string) => {
    setSustainabilityInitiatives(
      sustainabilityInitiatives.map((initiative) =>
        initiative.id === id ? { ...initiative, [field]: value } : initiative,
      ),
    )
  }

  const removeSustainabilityInitiative = (id: number) => {
    setSustainabilityInitiatives(sustainabilityInitiatives.filter((initiative) => initiative.id !== id))
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
                <Input id="companyName" defaultValue="EcoWander Adventures" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline" className="text-sm">
                  Tagline
                </Label>
                <Input
                  id="tagline"
                  defaultValue="Sustainable Adventures for Conscious Travelers"
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
                defaultValue="EcoWander Adventures is a leading sustainable tour operator with over 15 years of experience creating unforgettable eco-friendly journeys..."
                className="rounded-xl min-h-32"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="founded" className="text-sm">
                  Founded Year
                </Label>
                <Input id="founded" defaultValue="2010" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="headquarters" className="text-sm">
                  Headquarters
                </Label>
                <Input id="headquarters" defaultValue="Vancouver, Canada" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employees" className="text-sm">
                  Number of Employees
                </Label>
                <Input id="employees" defaultValue="45" type="number" className="rounded-xl" />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-sm">Operating Regions</Label>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Europe", "Asia", "South America", "Oceania", "Africa"].map((region, index) => (
                  <Badge
                    key={index}
                    className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full cursor-pointer hover:bg-blue-100 text-sm"
                  >
                    {region}
                    <X className="w-3 h-3 ml-2" />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input placeholder="Add new region" className="rounded-xl text-sm" />
                <Button className="rounded-xl text-sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-2 border-gray-200 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Branding & Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Label className="text-sm">Company Logo</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-4 text-center hover:border-green-400 transition-colors">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-xl flex items-center justify-center">
                    <ImageIcon className="h-10 w-10 text-gray-400" />
                  </div>
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">Recommended: 200x200px, PNG or JPG</p>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm">Cover Image</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-4 text-center hover:border-green-400 transition-colors">
                  <div className="w-full h-24 mx-auto mb-4 bg-gray-100 rounded-xl flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  </div>
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Cover
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">Recommended: 1920x600px, JPG</p>
                </div>
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
                  defaultValue="92"
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
                <Input id="safetyRecord" defaultValue="98" type="number" min="0" max="100" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="communityImpact" className="text-sm">
                  Local Community Impact (%)
                </Label>
                <Input id="communityImpact" defaultValue="87" type="number" min="0" max="100" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerSatisfaction" className="text-sm">
                  Customer Satisfaction (%)
                </Label>
                <Input
                  id="customerSatisfaction"
                  defaultValue="96"
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
                <Input id="email" defaultValue="hello@ecowander.com" type="email" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm">
                  Phone Number
                </Label>
                <Input id="phone" defaultValue="+1 (555) 123-4567" className="rounded-xl" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm">
                Business Address
              </Label>
              <Textarea
                id="address"
                defaultValue="123 Nature Ave, Vancouver, BC, Canada"
                className="rounded-xl"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="text-sm">
                Website URL
              </Label>
              <Input id="website" defaultValue="www.ecowander.com" className="rounded-xl" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-2 border-gray-200 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Social Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="facebook" className="text-sm">
                  Facebook URL
                </Label>
                <Input id="facebook" defaultValue="facebook.com/ecowander" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram" className="text-sm">
                  Instagram URL
                </Label>
                <Input id="instagram" defaultValue="instagram.com/ecowander" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter" className="text-sm">
                  Twitter URL
                </Label>
                <Input id="twitter" defaultValue="twitter.com/ecowander" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin" className="text-sm">
                  LinkedIn URL
                </Label>
                <Input id="linkedin" placeholder="linkedin.com/company/ecowander" className="rounded-xl" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-2 border-gray-200 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Business Hours</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="timezone" className="text-sm">
                  Timezone
                </Label>
                <Select>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                    <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                    <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                    <SelectItem value="cet">Central European Time (CET)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact" className="text-sm">
                  24/7 Emergency Contact
                </Label>
                <Input id="emergencyContact" placeholder="+1 (555) 999-0000" className="rounded-xl" />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-sm">Operating Hours</Label>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                <div key={day} className="flex items-center space-x-4">
                  <div className="w-24 font-medium text-sm">{day}</div>
                  <Input placeholder="09:00" className="w-24 rounded-xl text-sm" />
                  <span>to</span>
                  <Input placeholder="17:00" className="w-24 rounded-xl text-sm" />
                  <Button variant="outline" size="sm" className="rounded-xl text-sm">
                    Closed
                  </Button>
                </div>
              ))}
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
        <Button onClick={addTeamMember} className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </motion.div>

      {teamMembers.map((member, index) => (
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

  const renderCertifications = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Certifications & Credentials</h2>
        <Button
          onClick={addCertification}
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Certification
        </Button>
      </motion.div>

      {certifications.map((cert, index) => (
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
                <div className="space-y-1">
                  <Label className="text-sm">Certification Name</Label>
                  <Input
                    value={cert.name}
                    onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
                    placeholder="e.g., Certified Sustainable Tourism"
                    className="rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-sm">Year Obtained</Label>
                  <Input
                    value={cert.year}
                    onChange={(e) => updateCertification(cert.id, "year", e.target.value)}
                    placeholder="2023"
                    className="rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-sm">Issuing Organization</Label>
                  <Input
                    value={cert.organization}
                    onChange={(e) => updateCertification(cert.id, "organization", e.target.value)}
                    placeholder="e.g., Global Sustainable Tourism Council"
                    className="rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-sm">Certificate Number</Label>
                  <Input
                    value={cert.certificateNumber}
                    onChange={(e) => updateCertification(cert.id, "certificateNumber", e.target.value)}
                    placeholder="CST-2023-001"
                    className="rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Certificate Document</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-4 text-center hover:border-green-400 transition-colors">
                  <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Certificate
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">PDF, JPG, or PNG format</p>
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
        <Button onClick={addGalleryItem} className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Photo
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-2 border-gray-200 rounded-3xl">
          <CardHeader className="p-4">
            <CardTitle className="text-base font-bold">Bulk Upload</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-green-400 transition-colors">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Multiple Photos</h3>
              <p className="text-gray-600 text-sm mb-4">Drag and drop your images here, or click to browse</p>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-sm">
                <Upload className="h-4 w-4 mr-2" />
                Choose Images
              </Button>
              <p className="text-xs text-gray-500 mt-2">Supported formats: JPG, PNG, WebP. Max size: 10MB per image</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gallery.map((item, index) => (
          <motion.div key={item.id} variants={itemVariants}>
            <Card className="border-2 border-gray-200 rounded-3xl">
              <CardHeader className="p-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-bold">Photo {index + 1}</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeGalleryItem(item.id)}
                    className="rounded-full text-red-600 hover:text-red-700 text-sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 p-4">
                <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden">
                  {item.url ? (
                    <img
                      src={item.url || "/placeholder.svg"}
                      alt={item.caption}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="space-y-1">
                    <Label className="text-sm">Image URL or Upload</Label>
                    <div className="flex gap-2">
                      <Input
                        value={item.url}
                        onChange={(e) => updateGalleryItem(item.id, "url", e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="rounded-xl text-sm"
                      />
                      <Button variant="outline" className="rounded-xl text-sm">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-sm">Caption</Label>
                    <Input
                      value={item.caption}
                      onChange={(e) => updateGalleryItem(item.id, "caption", e.target.value)}
                      placeholder="Describe this photo..."
                      className="rounded-xl text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-sm">Category</Label>
                    <Select
                      value={item.category}
                      onValueChange={(value) => updateGalleryItem(item.id, "category", value)}
                    >
                      <SelectTrigger className="rounded-xl text-sm">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="adventure">Adventure</SelectItem>
                        <SelectItem value="culture">Culture</SelectItem>
                        <SelectItem value="nature">Nature</SelectItem>
                        <SelectItem value="accommodation">Accommodation</SelectItem>
                        <SelectItem value="food">Food & Dining</SelectItem>
                        <SelectItem value="team">Team</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
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
        <h2 className="text-2xl font-bold text-gray-900">Partnerships & Collaborations</h2>
        <Button onClick={addPartnership} className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Partnership
        </Button>
      </motion.div>

      {partnerships.map((partner, index) => (
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Partner Logo</Label>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                      {partner.logo ? (
                        <img
                          src={partner.logo || "/placeholder.svg"}
                          alt={partner.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="h-10 w-10 text-gray-400" />
                      )}
                    </div>
                    <Button variant="outline" className="rounded-xl text-sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Logo
                    </Button>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-sm">Organization Name</Label>
                      <Input
                        value={partner.name}
                        onChange={(e) => updatePartnership(partner.id, "name", e.target.value)}
                        placeholder="World Wildlife Fund"
                        className="rounded-xl text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm">Partnership Start Date</Label>
                      <Input
                        value={partner.startDate}
                        onChange={(e) => updatePartnership(partner.id, "startDate", e.target.value)}
                        placeholder="2018"
                        className="rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-sm">Website</Label>
                    <Input
                      value={partner.website}
                      onChange={(e) => updatePartnership(partner.id, "website", e.target.value)}
                      placeholder="https://www.partner.org"
                      className="rounded-xl text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-sm">Partnership Description</Label>
                    <Textarea
                      value={partner.description}
                      onChange={(e) => updatePartnership(partner.id, "description", e.target.value)}
                      placeholder="Describe the nature of this partnership..."
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

  const renderAwards = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Awards & Recognition</h2>
        <Button onClick={addAward} className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Award
        </Button>
      </motion.div>

      {awards.map((award, index) => (
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
                <div className="space-y-1">
                  <Label className="text-sm">Award Name</Label>
                  <Input
                    value={award.name}
                    onChange={(e) => updateAward(award.id, "name", e.target.value)}
                    placeholder="Sustainable Tourism Excellence Award"
                    className="rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-sm">Year Received</Label>
                  <Input
                    value={award.year}
                    onChange={(e) => updateAward(award.id, "year", e.target.value)}
                    placeholder="2023"
                    className="rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-sm">Awarding Organization</Label>
                <Input
                  value={award.organization}
                  onChange={(e) => updateAward(award.id, "organization", e.target.value)}
                  placeholder="World Travel Association"
                  className="rounded-xl text-sm"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-sm">Description</Label>
                <Textarea
                  value={award.description}
                  onChange={(e) => updateAward(award.id, "description", e.target.value)}
                  placeholder="Describe what this award recognizes..."
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
          onClick={addSustainabilityInitiative}
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Initiative
        </Button>
      </motion.div>

      {sustainabilityInitiatives.map((initiative, index) => (
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
                <div className="space-y-1">
                  <Label className="text-sm">Initiative Title</Label>
                  <Input
                    value={initiative.title}
                    onChange={(e) => updateSustainabilityInitiative(initiative.id, "title", e.target.value)}
                    placeholder="Carbon Offset Program"
                    className="rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-sm">Start Date</Label>
                  <Input
                    value={initiative.startDate}
                    onChange={(e) => updateSustainabilityInitiative(initiative.id, "startDate", e.target.value)}
                    placeholder="2019"
                    className="rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-sm">Description</Label>
                <Textarea
                  value={initiative.description}
                  onChange={(e) => updateSustainabilityInitiative(initiative.id, "description", e.target.value)}
                  placeholder="Describe this sustainability initiative..."
                  className="rounded-xl text-sm"
                  rows={2}
                />
              </div>

              <div className="space-y-1">
                <Label className="text-sm">Impact/Results</Label>
                <Input
                  value={initiative.impact}
                  onChange={(e) => updateSustainabilityInitiative(initiative.id, "impact", e.target.value)}
                  placeholder="15,000 tons CO2 offset annually"
                  className="rounded-xl text-sm"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-sm">Icon</Label>
                <Select
                  value={initiative.icon}
                  onValueChange={(value) => updateSustainabilityInitiative(initiative.id, "icon", value)}
                >
                  <SelectTrigger className="rounded-xl text-sm">
                    <SelectValue placeholder="Select icon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Leaf">🌿 Leaf (Environmental)</SelectItem>
                    <SelectItem value="Globe">🌍 Globe (Global Impact)</SelectItem>
                    <SelectItem value="Users">👥 Users (Community)</SelectItem>
                    <SelectItem value="Heart">❤️ Heart (Care)</SelectItem>
                    <SelectItem value="Shield">🛡️ Shield (Protection)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      <motion.div variants={itemVariants}>
        <Card className="border-2 border-green-200 rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="p-4">
            <CardTitle className="text-base font-bold text-green-800">Sustainability Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <p className="text-gray-600 text-sm">
              Upload your annual sustainability report to showcase your environmental and social impact.
            </p>
            <div className="border-2 border-dashed border-green-300 rounded-2xl p-4 text-center hover:border-green-400 transition-colors">
              <FileText className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload Report
              </Button>
              <p className="text-xs text-gray-500 mt-2">PDF format, max 50MB</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )

  const renderSettings = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <motion.div variants={itemVariants}>
        <Card className="border-2 border-gray-200 rounded-3xl">
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-semibold">Profile Visibility</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <div className="font-medium text-gray-900 text-sm">Public Profile</div>
                <div className="text-sm text-gray-600">Make your profile visible to potential customers</div>
              </div>
              <Button variant="outline" className="rounded-xl text-sm">
                Enabled
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <div className="font-medium text-gray-900 text-sm">Search Engine Indexing</div>
                <div className="text-sm text-gray-600">Allow search engines to index your profile</div>
              </div>
              <Button variant="outline" className="rounded-xl text-sm">
                Enabled
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <div className="font-medium text-gray-900 text-sm">Contact Form</div>
                <div className="text-sm text-gray-600">Allow visitors to contact you through your profile</div>
              </div>
              <Button variant="outline" className="rounded-xl text-sm">
                Enabled
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-2 border-gray-200 rounded-3xl">
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-semibold">Verification Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="bg-green-500 rounded-full p-2">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-green-800 text-sm">Business Verified</div>
                  <div className="text-sm text-green-600">Your business documents are verified</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="bg-green-500 rounded-full p-2">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-green-800 text-sm">Identity Verified</div>
                  <div className="text-sm text-green-600">Your identity has been confirmed</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <div className="bg-yellow-500 rounded-full p-2">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-yellow-800 text-sm">Insurance Pending</div>
                  <div className="text-sm text-yellow-600">Upload insurance documents</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="bg-blue-500 rounded-full p-2">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-blue-800 text-sm">Premium Member</div>
                  <div className="text-sm text-blue-600">Access to premium features</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-2 border-gray-200 rounded-3xl">
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-semibold">Account Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
              <div>
                <div className="font-medium text-gray-900 text-sm">Export Profile Data</div>
                <div className="text-sm text-gray-600">Download all your profile information</div>
              </div>
              <Button variant="outline" className="rounded-xl text-sm">
                <FileText className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
              <div>
                <div className="font-medium text-gray-900 text-sm">Profile Backup</div>
                <div className="text-sm text-gray-600">Create a backup of your profile</div>
              </div>
              <Button variant="outline" className="rounded-xl text-sm">
                <Save className="h-4 w-4 mr-2" />
                Backup
              </Button>
            </div>

            <Separator />

            <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl border border-red-200">
              <div>
                <div className="font-medium text-red-800 text-sm">Delete Profile</div>
                <div className="text-sm text-red-600">Permanently delete your operator profile</div>
              </div>
              <Button variant="outline" className="rounded-xl text-red-600 border-red-300 hover:bg-red-100 text-sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
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
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg">
              <Save className="h-4 w-4 mr-2" />
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
    </AdminLayout>
  )
}
