import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Create admin user
  const hashedPassword = await bcrypt.hash("password", 12)

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: hashedPassword,
      name: "Admin User",
      phone: "+1234567890",
      role: "OPERATOR",
      status: "ACTIVE",
    },
  })

  // Create tour operator profile for admin
  await prisma.tourOperator.upsert({
    where: { userId: adminUser.id },
    update: {},
    create: {
      userId: adminUser.id,
      companyName: "Demo Tours Company",
      companyDescription: "A demo tour company for testing purposes",
      companyAddress: "123 Demo Street",
      companyCity: "Demo City",
      companyCountry: "United States",
      companyWebsite: "https://demo-tours.com",
      specializations: ["Adventure Tours", "Cultural Tours"],
      languages: ["English", "Spanish"],
      isVerified: true,
      rating: 4.8,
      totalReviews: 150,
    },
  })

  // Create some sample categories
  const categories = [
    { name: "Adventure Tours", description: "Thrilling outdoor adventures" },
    { name: "Cultural Tours", description: "Explore local culture and history" },
    { name: "Wildlife Safari", description: "Amazing wildlife experiences" },
    { name: "Beach & Island", description: "Relaxing beach destinations" },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    })
  }

  console.log("✅ Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
