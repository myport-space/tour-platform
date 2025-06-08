// Conditional Prisma client for deployment
import { PrismaClient } from "@prisma/client"

let prisma: PrismaClient

const globalForPrisma = global as unknown as { prisma: PrismaClient }

if (process.env.NODE_ENV === "production" || process.env.DATABASE_URL) {
  try {
    // Create singleton instance
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
    prisma = new PrismaClient()
  } catch (error) {
    console.warn("Prisma client not available in development:", error.message)
    prisma = null
  }
}

export { prisma }
export default prisma
