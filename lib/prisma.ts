// Import necessary modules and initialize Prisma client
import { PrismaClient } from "@prisma/client"

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

// Mock Prisma client for deployment
// This is a temporary solution until we properly set up Prisma

prisma.user = {
  findUnique: async () => null,
  findFirst: async () => null,
  create: async () => ({ id: "mock-id", name: "Mock User" }),
  update: async () => ({ id: "mock-id", name: "Mock User" }),
}

prisma.tour = {
  findMany: async () => [],
  findUnique: async () => null,
  create: async () => ({ id: "mock-id", title: "Mock Tour" }),
  update: async () => ({ id: "mock-id", title: "Mock Tour" }),
}

prisma.booking = {
  findMany: async () => [],
  findUnique: async () => null,
  create: async () => ({ id: "mock-id" }),
  update: async () => ({ id: "mock-id" }),
}

prisma.spot = {
  findMany: async () => [],
  create: async () => ({ id: "mock-id" }),
}

// Add other mock models as needed
