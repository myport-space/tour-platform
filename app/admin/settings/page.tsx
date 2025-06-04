"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import AdminLayout from "@/components/AdminLayout"
import { Settings, User, Bell, Shield, CreditCard, Mail, Globe, Save, Upload, Trash2, Palette } from "lucide-react"

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general")

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "email", label: "Email", icon: Mail },
    { id: "integrations", label: "Integrations", icon: Globe },
    { id: "appearance", label: "Appearance", icon: Palette },
  ]

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

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
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
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "general" && (
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Company Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="companyName">Company Name</Label>
                            <Input id="companyName" defaultValue="EcoWander Adventures" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="website">Website</Label>
                            <Input id="website" defaultValue="www.ecowander.com" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Company Description</Label>
                          <Textarea
                            id="description"
                            defaultValue="Leading sustainable tour operator with over 15 years of experience..."
                            rows={3}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="timezone">Timezone</Label>
                            <Select defaultValue="pst">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pst">Pacific Standard Time</SelectItem>
                                <SelectItem value="est">Eastern Standard Time</SelectItem>
                                <SelectItem value="gmt">Greenwich Mean Time</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="currency">Default Currency</Label>
                            <Select defaultValue="usd">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="usd">USD - US Dollar</SelectItem>
                                <SelectItem value="eur">EUR - Euro</SelectItem>
                                <SelectItem value="gbp">GBP - British Pound</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "profile" && (
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-10 w-10 text-gray-400" />
                          </div>
                          <div>
                            <Button variant="outline">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Photo
                            </Button>
                            <p className="text-sm text-gray-500 mt-1">JPG, PNG up to 2MB</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" defaultValue="John" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" defaultValue="Doe" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" defaultValue="john@ecowander.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" defaultValue="+1 (555) 123-4567" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "notifications" && (
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Email Notifications</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {[
                          { label: "New Bookings", description: "Get notified when new bookings are made" },
                          { label: "Payment Updates", description: "Receive updates about payment status changes" },
                          { label: "Tour Updates", description: "Get notified about tour status changes" },
                          { label: "Customer Messages", description: "Receive notifications for customer inquiries" },
                          { label: "Weekly Reports", description: "Get weekly performance reports" },
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <div className="font-medium">{item.label}</div>
                              <div className="text-sm text-gray-600">{item.description}</div>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "security" && (
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Password & Security</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input id="currentPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input id="newPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input id="confirmPassword" type="password" />
                        </div>
                        <Button>Update Password</Button>
                        <Separator />
                        <div className="space-y-4">
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <div className="font-medium">SMS Authentication</div>
                              <div className="text-sm text-gray-600">Receive codes via SMS</div>
                            </div>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <div className="font-medium">App Authentication</div>
                              <div className="text-sm text-gray-600">Use authenticator app</div>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "billing" && (
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Billing Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-green-800">Premium Plan</div>
                              <div className="text-sm text-green-600">$99/month - Next billing: April 15, 2024</div>
                            </div>
                            <Button variant="outline">Manage Plan</Button>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-medium">Payment Methods</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center space-x-3">
                                <CreditCard className="h-5 w-5" />
                                <div>
                                  <div className="font-medium">•••• •••• •••• 4242</div>
                                  <div className="text-sm text-gray-600">Expires 12/25</div>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <Button variant="outline">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Add Payment Method
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "email" && (
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Email Configuration</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="smtpHost">SMTP Host</Label>
                            <Input id="smtpHost" defaultValue="smtp.gmail.com" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="smtpPort">SMTP Port</Label>
                            <Input id="smtpPort" defaultValue="587" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="fromEmail">From Email</Label>
                          <Input id="fromEmail" defaultValue="noreply@ecowander.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="fromName">From Name</Label>
                          <Input id="fromName" defaultValue="EcoWander Adventures" />
                        </div>
                        <Button>Test Email Configuration</Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "integrations" && (
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Third-Party Integrations</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {[
                          { name: "Stripe", description: "Payment processing", connected: true },
                          { name: "Mailchimp", description: "Email marketing", connected: false },
                          { name: "Google Analytics", description: "Website analytics", connected: true },
                          { name: "Zapier", description: "Workflow automation", connected: false },
                        ].map((integration, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <div className="font-medium">{integration.name}</div>
                              <div className="text-sm text-gray-600">{integration.description}</div>
                            </div>
                            <Button variant={integration.connected ? "outline" : "default"}>
                              {integration.connected ? "Disconnect" : "Connect"}
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === "appearance" && (
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Theme & Appearance</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Theme</Label>
                          <Select defaultValue="light">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="dark">Dark</SelectItem>
                              <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Language</Label>
                          <Select defaultValue="en">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Spanish</SelectItem>
                              <SelectItem value="fr">French</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Date Format</Label>
                          <Select defaultValue="mm/dd/yyyy">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                              <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                              <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
