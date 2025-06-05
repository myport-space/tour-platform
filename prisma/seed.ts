import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash("password", 12)

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: hashedPassword,
      name: "Admin User",
      phone: "+1234567890",
      role: "OPERATOR",
      status: "ACTIVE",
      operator: {
        create: {
          companyName: "Demo Tours",
          companyDescription: "A demo tour company for testing purposes",
          companyAddress: "123 Demo Street",
          companyCity: "Demo City",
          companyCountry: "US",
          companyWebsite: "https://demo-tours.com",
          specializations: ["Adventure Tours", "Cultural Tours"],
          languages: ["English", "Spanish"],
        },
      },
    },
  })

  // Create tour categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: "Adventure" },
      update: {},
      create: {
        name: "Adventure",
        description: "Exciting outdoor activities and thrilling experiences",
        color: "#10B981", // Green
        icon: "mountain",
      },
    }),
    prisma.category.upsert({
      where: { name: "Cultural" },
      update: {},
      create: {
        name: "Cultural",
        description: "Immersive experiences in local traditions and heritage",
        color: "#8B5CF6", // Purple
        icon: "landmark",
      },
    }),
    prisma.category.upsert({
      where: { name: "Beach" },
      update: {},
      create: {
        name: "Beach",
        description: "Relaxing coastal getaways and island adventures",
        color: "#3B82F6", // Blue
        icon: "umbrella-beach",
      },
    }),
  ])

  // Create a sample tour
  const tour = await prisma.tour.upsert({
    where: { id: "demo-tour-1" },
    update: {},
    create: {
      id: "demo-tour-1",
      title: "Amazing Adventure Tour",
      description: "Experience the thrill of adventure in the heart of nature",
      shortDescription: "A thrilling 7-day adventure tour",
      location: "Mountain Range, USA",
      duration: "7 days",
      price: 1299.99,
      originalPrice: 1499.99,
      maxGroupSize: 12,
      minAge: 16,
      difficulty: "Moderate",
      highlights: ["Scenic mountain hikes", "Wildlife spotting", "Camping under the stars", "Professional guides"],
      inclusions: ["All meals", "Equipment", "Transportation", "Accommodation"],
      exclusions: ["Flights", "Travel insurance", "Personal expenses"],
      requirements: ["Good physical condition", "Proper hiking boots"],
      restrictions: ["Not suitable for people with mobility issues"],
      images: ["/images/tour1-1.jpg", "/images/tour1-2.jpg", "/images/tour1-3.jpg"],
      status: "ACTIVE",
      isPublished: true,
      isFeatured: true,
      categoryId: categories[0].id,
      operatorId: admin.operator!.id,
    },
  })

  // Create a spot for the tour
  const spot = await prisma.spot.upsert({
    where: { id: "demo-spot-1" },
    update: {},
    create: {
      id: "demo-spot-1",
      name: "Summer Adventure 2023",
      description: "Join our summer adventure tour",
      departureDate: new Date("2023-07-15"),
      returnDate: new Date("2023-07-22"),
      maxSeats: 12,
      bookedSeats: 5,
      price: 1299.99,
      status: "ACTIVE",
      tourId: tour.id,
    },
  })

  // Create itinerary for the tour
  const itinerary = await Promise.all(
    Array.from({ length: 7 }, (_, i) =>
      prisma.itinerary.create({
        data: {
          day: i + 1,
          title: `Day ${i + 1}: ${i === 0 ? "Arrival" : i === 6 ? "Departure" : `Adventure Day ${i}`}`,
          description: `Detailed description for day ${i + 1} of the tour.`,
          activities: [
            `Morning: ${i === 0 ? "Arrival and check-in" : "Hiking"}`,
            `Afternoon: ${i === 6 ? "Departure" : "Exploration"}`,
            `Evening: ${i === 0 ? "Welcome dinner" : i === 6 ? "Farewell dinner" : "Campfire"}`,
          ],
          meals: i === 0 ? ["DINNER"] : i === 6 ? ["BREAKFAST"] : ["BREAKFAST", "LUNCH", "DINNER"],
          tourId: tour.id,
        },
      }),
    ),
  )

  console.log({ admin, categories, tour, spot, itinerary })
  console.log("Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
