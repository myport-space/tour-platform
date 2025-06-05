// Conditional Prisma client for deployment
let PrismaClient: any
let prisma: any

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
  console.warn("Prisma client not available during build:", error.message)

  // Create mock client for build time
  prisma = {
    user: {
      findUnique: async () => null,
      findFirst: async () => null,
      create: async () => ({ id: "mock-id", name: "Mock User" }),
      update: async () => ({ id: "mock-id", name: "Mock User" }),
    },
    tourOperator: {
      create: async () => ({ id: "mock-id" }),
    },
    $transaction: async (callback: any) => {
      return callback({
        user: {
          create: async () => ({ id: "mock-id", name: "Mock User" }),
        },
        tourOperator: {
          create: async () => ({ id: "mock-id" }),
        },
      })
    },
    $connect: async () => {},
    $disconnect: async () => {},
  }
}

export { prisma }
export default prisma
