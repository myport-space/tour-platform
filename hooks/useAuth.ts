"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
  operator?: any
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user data exists in localStorage (set during login/signup)
    const userData = localStorage.getItem("user_data")
    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (e) {
        console.error("Failed to parse user data:", e)
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string, rememberMe = false) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, rememberMe }),
      credentials: "include", // Important for cookies
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Login failed")
    }

    // Store user data in localStorage for client-side access
    localStorage.setItem("user_data", JSON.stringify(data.user))
    setUser(data.user)

    // Redirect based on role
    if (data.user.role === "OPERATOR") {
      router.push("/admin")
    } else {
      router.push("/")
    }
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
    } catch (error) {
      console.error("Logout error:", error)
    }

    // Clear user data from localStorage
    localStorage.removeItem("user_data")
    setUser(null)
    router.push("/auth/login")
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
