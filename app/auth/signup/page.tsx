"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, Check, User, Building, Mail, Phone, Lock, Globe, MapPin } from "lucide-react"

const STEPS = [
  { id: 1, title: "Personal Information", icon: User },
  { id: 2, title: "Company Details", icon: Building },
  { id: 3, title: "Review & Complete", icon: Check },
]

const SPECIALIZATIONS = [
  "Adventure Tours",
  "Cultural Tours",
  "Wildlife Safari",
  "Beach & Island",
  "Mountain Trekking",
  "City Tours",
  "Food & Wine",
  "Photography Tours",
]

const LANGUAGES = ["English", "Spanish", "French", "German", "Italian", "Portuguese", "Japanese", "Mandarin"]

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    // Company Information
    companyName: "",
    description: "",
    website: "",
    address: "",
    city: "",
    country: "",
    companyPhone: "",
    businessLicense: "",
    specializations: [] as string[],
    languages: [] as string[],

    // Terms
    agreeToTerms: false,
    rememberMe: true, // Default to remember me for signup
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleMultiSelectChange = (name: string, value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked
        ? [...(prev[name as keyof typeof prev] as string[]), value]
        : (prev[name as keyof typeof prev] as string[]).filter((item) => item !== value),
    }))
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.phone && formData.password && formData.confirmPassword
      case 2:
        return formData.companyName && formData.description && formData.address && formData.city && formData.country
      case 3:
        return formData.agreeToTerms
      default:
        return false
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 1 && formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        return
      }
      setError("")
      setCurrentStep((prev) => Math.min(prev + 1, 3))
    } else {
      setError("Please fill in all required fields")
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    setError("")
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) {
      setError("Please agree to the terms and conditions")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Important for cookies
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      console.log("Registration successful, token received:", !!data.token)

      // Store user data in localStorage for client-side access
      localStorage.setItem("user_data", JSON.stringify(data.user))

      // Force a page reload to ensure middleware picks up the cookie
      window.location.href = "/admin"
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="companyName"
                  name="companyName"
                  placeholder="Enter your company name"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Company Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your tour company and services"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="website"
                  name="website"
                  type="url"
                  placeholder="https://yourcompany.com"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="address"
                    name="address"
                    placeholder="Street address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Select onValueChange={(value) => handleSelectChange("country", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="es">Spain</SelectItem>
                  <SelectItem value="it">Italy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Specializations</Label>
              <div className="grid grid-cols-2 gap-2">
                {SPECIALIZATIONS.map((spec) => (
                  <div key={spec} className="flex items-center space-x-2">
                    <Checkbox
                      id={spec}
                      checked={formData.specializations.includes(spec)}
                      onCheckedChange={(checked) =>
                        handleMultiSelectChange("specializations", spec, checked as boolean)
                      }
                      className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <Label htmlFor={spec} className="text-sm">
                      {spec}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Languages</Label>
              <div className="grid grid-cols-2 gap-2">
                {LANGUAGES.map((lang) => (
                  <div key={lang} className="flex items-center space-x-2">
                    <Checkbox
                      id={lang}
                      checked={formData.languages.includes(lang)}
                      onCheckedChange={(checked) => handleMultiSelectChange("languages", lang, checked as boolean)}
                      className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <Label htmlFor={lang} className="text-sm">
                      {lang}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Review Your Information</h3>
              <p className="text-gray-600">Please review your details before creating your account</p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Personal Information</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Name:</strong> {formData.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {formData.phone}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Company Information</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Company:</strong> {formData.companyName}
                  </p>
                  <p>
                    <strong>Description:</strong> {formData.description}
                  </p>
                  <p>
                    <strong>Location:</strong> {formData.city}, {formData.country}
                  </p>
                  {formData.specializations.length > 0 && (
                    <p>
                      <strong>Specializations:</strong> {formData.specializations.join(", ")}
                    </p>
                  )}
                  {formData.languages.length > 0 && (
                    <p>
                      <strong>Languages:</strong> {formData.languages.join(", ")}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))}
                className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
              />
              <Label htmlFor="agreeToTerms" className="text-sm">
                I agree to the{" "}
                <Link href="/terms" className="text-green-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-green-600 hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
          <p className="text-gray-600">Join our platform as a tour operator</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id ? "bg-green-600 border-green-600 text-white" : "border-gray-300 text-gray-400"
                }`}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <div className="ml-2 mr-4">
                <p className={`text-sm font-medium ${currentStep >= step.id ? "text-green-600" : "text-gray-400"}`}>
                  {step.title}
                </p>
              </div>
              {index < STEPS.length - 1 && (
                <div className={`w-12 h-0.5 ${currentStep > step.id ? "bg-green-600" : "bg-gray-300"}`} />
              )}
            </div>
          ))}
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>
              Step {currentStep} of {STEPS.length}
            </CardTitle>
            <CardDescription>{STEPS[currentStep - 1].title}</CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">{error}</div>
            )}

            {renderStepContent()}
          </CardContent>

          <div className="flex justify-between p-6">
            <Button type="button" variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < 3 ? (
              <Button type="button" onClick={handleNext} className="bg-green-500 hover:bg-green-600">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-green-500 hover:bg-green-600"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            )}
          </div>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-green-600 hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
