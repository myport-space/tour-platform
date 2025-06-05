import bcrypt from "bcryptjs"

// Mock database for deployment
interface MockUser {
  id: string
  email: string
  password: string
  name: string
  phone?: string
  role: string
  status: string
  createdAt: Date
  operator?: {
    companyName: string
    companyDescription: string
    companyAddress: string
    companyCity: string
    companyCountry: string
    companyWebsite?: string
    specializations: string[]
    languages: string[]
  }
}

// In-memory storage (will reset on deployment)
const users: MockUser[] = []

// Add default admin user
const initializeDefaultUsers = async () => {
  if (users.length === 0) {
    const hashedPassword = await bcrypt.hash("password", 12)
    users.push({
      id: "admin_1",
      email: "admin@example.com",
      password: hashedPassword,
      name: "Admin User",
      phone: "+1234567890",
      role: "OPERATOR",
      status: "ACTIVE",
      createdAt: new Date(),
      operator: {
        companyName: "Demo Tours",
        companyDescription: "Demo tour company for testing",
        companyAddress: "123 Demo Street",
        companyCity: "Demo City",
        companyCountry: "United States",
        companyWebsite: "https://demo-tours.com",
        specializations: ["Adventure Tours", "Cultural Tours"],
        languages: ["English", "Spanish"],
      },
    })
  }
}

export const mockDb = {
  user: {
    findUnique: async ({ where }: { where: { email?: string; id?: string } }) => {
      await initializeDefaultUsers()
      if (where.email) {
        return users.find((user) => user.email === where.email) || null
      }
      if (where.id) {
        return users.find((user) => user.id === where.id) || null
      }
      return null
    },

    create: async ({ data }: { data: any }) => {
      await initializeDefaultUsers()
      const newUser: MockUser = {
        id: `user_${Date.now()}`,
        email: data.email,
        password: data.password,
        name: data.name,
        phone: data.phone,
        role: data.role || "CUSTOMER",
        status: data.status || "ACTIVE",
        createdAt: new Date(),
        operator: data.operator
          ? {
              companyName: data.operator.create.companyName,
              companyDescription: data.operator.create.companyDescription,
              companyAddress: data.operator.create.companyAddress,
              companyCity: data.operator.create.companyCity,
              companyCountry: data.operator.create.companyCountry,
              companyWebsite: data.operator.create.companyWebsite,
              specializations: data.operator.create.specializations,
              languages: data.operator.create.languages,
            }
          : undefined,
      }
      users.push(newUser)
      return newUser
    },

    update: async ({ where, data }: { where: { id: string }; data: any }) => {
      await initializeDefaultUsers()
      const userIndex = users.findIndex((user) => user.id === where.id)
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...data }
        return users[userIndex]
      }
      return null
    },
  },
}
