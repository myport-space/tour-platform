import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seed...")

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: "Adventure Tours" },
      update: {},
      create: {
        name: "Adventure Tours",
        description: "Thrilling outdoor adventures and extreme sports",
        color: "#EF4444",
        icon: "🏔️",
      },
    }),
    prisma.category.upsert({
      where: { name: "Cultural Tours" },
      update: {},
      create: {
        name: "Cultural Tours",
        description: "Explore local culture, history, and traditions",
        color: "#8B5CF6",
        icon: "🏛️",
      },
    }),
    prisma.category.upsert({
      where: { name: "Beach & Island" },
      update: {},
      create: {
        name: "Beach & Island",
        description: "Relaxing beach destinations and tropical islands",
        color: "#06B6D4",
        icon: "🏖️",
      },
    }),
    prisma.category.upsert({
      where: { name: "City Tours" },
      update: {},
      create: {
        name: "City Tours",
        description: "Urban exploration and city sightseeing",
        color: "#10B981",
        icon: "🏙️",
      },
    }),
  ])

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 12)
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: hashedPassword,
      name: "Admin User",
      phone: "+1234567890",
      role: "ADMIN",
      status: "ACTIVE",
    },
  })

  // Create tour operator user
  const operatorPassword = await bcrypt.hash("operator123", 12)
  const operatorUser = await prisma.user.upsert({
    where: { email: "operator@example.com" },
    update: {},
    create: {
      email: "operator@example.com",
      password: operatorPassword,
      name: "John Smith",
      phone: "+1987654321",
      role: "OPERATOR",
      status: "ACTIVE",
    },
  })

  // Create tour operator profile
  const tourOperator = await prisma.tourOperator.upsert({
    where: { userId: operatorUser.id },
    update: {},
    create: {
      userId: operatorUser.id,
      companyName: "Adventure Tours Co.",
      companyDescription: "We specialize in creating unforgettable adventure experiences around the world.",
      companyAddress: "123 Adventure Street",
      companyCity: "San Francisco",
      companyCountry: "United States",
      companyWebsite: "https://adventuretours.com",
      businessLicense: "BL123456789",
      taxId: "TAX987654321",
      experience: "10+",
      specializations: ["Adventure Tours", "Mountain Trekking", "Wildlife Safari"],
      languages: ["English", "Spanish", "French"],
      rating: 4.8,
      totalReviews: 156,
      isVerified: true,
    },
  })

  // Create sample tours
  const tour1 = await prisma.tour.create({
    data: {
      title: "Santorini Sunset Paradise",
      description:
        "Experience the magical sunsets of Santorini with luxury accommodations and breathtaking views. This 7-day tour includes visits to iconic blue-domed churches, wine tastings, and sunset cruises.",
      shortDescription: "7-day luxury tour of Santorini with sunset cruises and wine tastings",
      location: "Santorini, Greece",
      duration: "7 days",
      price: 1299,
      originalPrice: 1599,
      maxGroupSize: 12,
      minAge: 18,
      difficulty: "Easy",
      highlights: [
        "Sunset cruise around the caldera",
        "Wine tasting at local vineyards",
        "Visit to Oia village",
        "Traditional Greek cooking class",
        "Private beach access",
      ],
      inclusions: [
        "Luxury accommodation",
        "Daily breakfast",
        "Airport transfers",
        "Professional guide",
        "All entrance fees",
      ],
      exclusions: ["International flights", "Lunch and dinner", "Personal expenses", "Travel insurance"],
      requirements: ["Valid passport", "Travel insurance recommended", "Moderate fitness level"],
      restrictions: ["Not suitable for wheelchair users", "Minimum age 18 years"],
      images: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      status: "ACTIVE",
      isPublished: true,
      isFeatured: true,
      rating: 4.9,
      totalReviews: 87,
      totalBookings: 156,
      categoryId: categories[2].id, // Beach & Island
      operatorId: tourOperator.id,
    },
  })

  // Create spots for the tour
  await prisma.spot.createMany({
    data: [
      {
        name: "Spring Departure",
        description: "Perfect weather for sightseeing",
        departureDate: new Date("2024-04-15"),
        returnDate: new Date("2024-04-22"),
        maxSeats: 12,
        bookedSeats: 8,
        price: 1299,
        tourId: tour1.id,
      },
      {
        name: "Summer Departure",
        description: "Peak season with warm weather",
        departureDate: new Date("2024-07-10"),
        returnDate: new Date("2024-07-17"),
        maxSeats: 12,
        bookedSeats: 12,
        price: 1599,
        tourId: tour1.id,
      },
    ],
  })

  // Create itinerary
  await prisma.itinerary.createMany({
    data: [
      {
        day: 1,
        title: "Arrival in Santorini",
        description:
          "Arrive at Santorini airport and transfer to your luxury hotel. Evening welcome dinner with stunning caldera views.",
        activities: ["Airport transfer", "Hotel check-in", "Welcome dinner"],
        meals: ["DINNER"],
        tourId: tour1.id,
      },
      {
        day: 2,
        title: "Oia Village & Sunset Cruise",
        description:
          "Explore the famous Oia village with its blue-domed churches and narrow streets. Evening sunset cruise around the caldera.",
        activities: ["Oia village tour", "Photography session", "Sunset cruise"],
        meals: ["BREAKFAST"],
        tourId: tour1.id,
      },
    ],
  })

  console.log("✅ Database seeded successfully!")
  console.log(`📊 Created:`)
  console.log(`   - ${categories.length} categories`)
  console.log(`   - 2 users (admin & operator)`)
  console.log(`   - 1 tour operator profile`)
  console.log(`   - 1 sample tour with spots and itinerary`)
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
