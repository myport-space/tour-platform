import { prisma } from "./prisma"

// Check if we're in build mode
const isBuildTime = process.env.NODE_ENV === "production" && !process.env.DATABASE_URL

// Database service with build-time handling
export class DatabaseService {
  private static instance: DatabaseService
  private isConnected = false
  private isMockMode = isBuildTime

  private constructor() {}

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService()
    }
    return DatabaseService.instance
  }

  async checkConnection(): Promise<boolean> {
    if (this.isMockMode) {
      return true
    }

    try {
      await prisma.$connect()
      this.isConnected = true
      return true
    } catch (error) {
      console.error("Database connection failed:", error)
      this.isConnected = false
      return false
    }
  }

  async createUser(data: any) {
    if (this.isMockMode) {
      return {
        id: "mock-user-id",
        ...data,
        password: "hashed-password",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }

    try {
      if (!this.isConnected) {
        await this.checkConnection()
      }

      return await prisma.user.create({
        data,
        include: {
          operator: true,
        },
      })
    } catch (error) {
      console.error("Failed to create user:", error)
      throw new Error("Failed to create user")
    }
  }

  async findUserByEmail(email: string) {
    if (this.isMockMode) {
      // Return default admin user for build
      if (email === "admin@example.com") {
        return {
          id: "admin-id",
          email: "admin@example.com",
          password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO.G", // "password"
          name: "Admin User",
          role: "OPERATOR",
          status: "ACTIVE",
          operator: null,
        }
      }
      return null
    }

    try {
      if (!this.isConnected) {
        await this.checkConnection()
      }

      return await prisma.user.findUnique({
        where: { email },
        include: {
          operator: true,
        },
      })
    } catch (error) {
      console.error("Failed to find user:", error)
      return null
    }
  }

  async updateUser(id: string, data: any) {
    if (this.isMockMode) {
      return {
        id,
        ...data,
        updatedAt: new Date(),
      }
    }

    try {
      if (!this.isConnected) {
        await this.checkConnection()
      }

      return await prisma.user.update({
        where: { id },
        data,
      })
    } catch (error) {
      console.error("Failed to update user:", error)
      throw new Error("Failed to update user")
    }
  }

  async createUserWithOperator(userData: any, operatorData: any) {
    if (this.isMockMode) {
      const user = {
        id: "mock-user-id",
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      const operator = {
        id: "mock-operator-id",
        userId: user.id,
        ...operatorData,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      return { user, operator }
    }

    try {
      if (!this.isConnected) {
        await this.checkConnection()
      }

      return await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: userData,
        })

        const operator = await tx.tourOperator.create({
          data: {
            ...operatorData,
            userId: user.id,
          },
        })

        return { user, operator }
      })
    } catch (error) {
      console.error("Failed to create user with operator:", error)
      throw new Error("Failed to create user with operator")
    }
  }
}

export const db = DatabaseService.getInstance()
