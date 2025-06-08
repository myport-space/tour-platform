import { prisma } from "./prisma"

// Database service with error handling
export class DatabaseService {
  private static instance: DatabaseService
  private isConnected = false

  private constructor() {}

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService()
    }
    return DatabaseService.instance
  }

  async checkConnection(): Promise<boolean> {
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
