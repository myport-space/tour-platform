import { PrismaClient } from "@prisma/client"

// Create a singleton instance of PrismaClient
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Initialize Prisma client with proper error handling
let prisma: PrismaClient

try {
  prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    })

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma
  }
} catch (error) {
  console.error("Failed to initialize Prisma client:", error)
  // Create a fallback client for build time
  prisma = {} as PrismaClient
}

export { prisma }
export default prisma
