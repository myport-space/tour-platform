// Conditional Prisma client for deployment
let PrismaClient: any
let prisma: any

if (process.env.NODE_ENV === "production" || process.env.DATABASE_URL) {
  try {
    // Try to import Prisma client
    const PrismaModule = require("@prisma/client")
    PrismaClient = PrismaModule.PrismaClient

    // Create singleton instance
    const globalForPrisma = globalThis as unknown as {
      prisma: any | undefined
    }

    prisma =
      globalForPrisma.prisma ??
      new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
      })

    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = prisma
    }
  } catch (error) {
    console.warn("Prisma client not available:", error.message)
    prisma = null
  }
} else {
  // Development fallback
  try {
    const { PrismaClient } = require("@prisma/client")
    prisma = new PrismaClient()
  } catch (error) {
    console.warn("Prisma client not available in development:", error.message)
    prisma = null
  }
}

export { prisma }
export default prisma
