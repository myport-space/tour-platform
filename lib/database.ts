// Simple in-memory database for when Prisma is not available
const users: any[] = []
const operators: any[] = []

// Database interface that works with or without Prisma
export const db = {
  // User operations
  async findUserByEmail(email: string) {
    if (typeof window !== "undefined") return null

    try {
      const { prisma } = await import("./prisma")
      if (prisma && prisma.user) {
        return await prisma.user.findUnique({
          where: { email },
          include: { operator: true },
        })
      }
    } catch (error) {
      console.warn("Prisma not available, using fallback")
    }

    // Fallback to in-memory
    return users.find((user) => user.email === email) || null
  },

  async createUser(userData: any) {
    if (typeof window !== "undefined") return null

    try {
      const { prisma } = await import("./prisma")
      if (prisma && prisma.user) {
        return await prisma.user.create({
          data: userData,
          include: { operator: true },
        })
      }
    } catch (error) {
      console.warn("Prisma not available, using fallback")
    }

    // Fallback to in-memory
    const newUser = { id: Date.now().toString(), ...userData }
    users.push(newUser)
    return newUser
  },

  async updateUser(id: string, data: any) {
    if (typeof window !== "undefined") return null

    try {
      const { prisma } = await import("./prisma")
      if (prisma && prisma.user) {
        return await prisma.user.update({
          where: { id },
          data,
          include: { operator: true },
        })
      }
    } catch (error) {
      console.warn("Prisma not available, using fallback")
    }

    // Fallback to in-memory
    const userIndex = users.findIndex((user) => user.id === id)
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...data }
      return users[userIndex]
    }
    return null
  },

  async createOperator(operatorData: any) {
    if (typeof window !== "undefined") return null

    try {
      const { prisma } = await import("./prisma")
      if (prisma && prisma.tourOperator) {
        return await prisma.tourOperator.create({
          data: operatorData,
        })
      }
    } catch (error) {
      console.warn("Prisma not available, using fallback")
    }

    // Fallback to in-memory
    const newOperator = { id: Date.now().toString(), ...operatorData }
    operators.push(newOperator)
    return newOperator
  },

  async transaction(callback: any) {
    if (typeof window !== "undefined") return null

    try {
      const { prisma } = await import("./prisma")
      if (prisma && prisma.$transaction) {
        return await prisma.$transaction(callback)
      }
    } catch (error) {
      console.warn("Prisma transaction not available, using fallback")
    }

    // Fallback - execute callback with mock transaction
    return await callback({
      user: { create: this.createUser.bind(this) },
      tourOperator: { create: this.createOperator.bind(this) },
    })
  },
}
