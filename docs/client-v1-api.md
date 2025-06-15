# Correct Api Response 

1.`/api/client/tours`- Get all tours

#### Response structure
```
{
  "success": true,
  "data": {
    "tours": [
      {
        "id": "tour_id",
        "title": "Amazing City Tour",
        "description": "Full tour description...",
        "shortDescription": "Brief description",
        "location": "Paris, France",
        "duration": "8 hours",
        "stayNights": 2,
        "tourType": "IN_COUNTRY",
        "originCountry": "France",
        "destinationCountry": "France",
        "price": 299.99,
        "originalPrice": 399.99,
        "currency": "USD",
        "maxGroupSize": 15,
        "minAge": 12,
        "maxAge": 65,
        "difficulty": "Easy",
        "highlights": ["Eiffel Tower", "Louvre Museum"],
        "inclusions": ["Guide", "Transport", "Entry tickets"],
        "exclusions": ["Meals", "Personal expenses"],
        "requirements": ["Valid ID", "Comfortable shoes"],
        "restrictions": ["No pets", "Weather dependent"],
        "images": ["image1.jpg", "image2.jpg"],
        "videoUrl": "https://youtube.com/watch?v=...",
        "status": "ACTIVE",
        "isPublished": true,
        "isFeatured": true,
        "rating": 4.7,
        "totalReviews": 32,
        "totalBookings": 45,
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z",
        "category": {
          "id": "cat_id",
          "name": "City Tours",
          "description": "Urban exploration tours",
          "color": "#3B82F6",
          "icon": "MapPin"
        },
        "operator": {
          "id": "op_id",
          "companyName": "Amazing Tours Co",
          "tagline": "Best tours in the city",
          "logo": "logo.jpg",
          "sustainabilityScore": 85,
          "safetyRecord": 95,
          "customerSatisfaction": 90,
          "isPublic": true
        },
        "spots": [
          {
            "id": "spot_id",
            "name": "Morning Tour",
            "description": "9 AM departure",
            "departureDate": "2024-02-15T09:00:00Z",
            "returnDate": "2024-02-15T17:00:00Z",
            "maxSeats": 20,
            "bookedSeats": 12,
            "price": 299.99,
            "status": "ACTIVE"
          }
        ],
        "stats": {
          "totalBookings": 45,
          "totalReviews": 32,
          "averageRating": 4.7
        }
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 60,
      "itemsPerPage": 12,
      "hasNextPage": true,
      "hasPreviousPage": false
    },
    "filters": {
      "categories": [
        {
          "id": "cat_id",
          "name": "City Tours",
          "description": "Urban exploration",
          "color": "#3B82F6",
          "icon": "MapPin"
        }
      ],
      "locations": ["Paris", "London", "Rome"],
      "tourTypes": ["IN_COUNTRY", "GLOBAL"],
      "difficulties": ["Easy", "Moderate", "Challenging", "Extreme"],
      "priceRange": {
        "min": 50,
        "max": 1000
      }
    }
  }
}
```


2.`/api/client/tours/[id]`- Get tour details

#### Response structure

```
{
  "success": true,
  "data": {
    "tour": {
      // All fields from tours list above +
      "itinerary": [
        {
          "id": "itinerary_id",
          "day": 1,
          "title": "Day 1: City Center",
          "description": "Explore the historic center",
          "activities": ["Walking tour", "Museum visit"],
          "meals": ["BREAKFAST", "LUNCH"]
        }
      ],
      "accommodations": [
        {
          "id": "acc_id",
          "name": "Grand Hotel",
          "type": "HOTEL",
          "roomType": "DOUBLE",
          "description": "Luxury accommodation",
          "address": "123 Main St",
          "checkIn": "2024-02-15T15:00:00Z",
          "checkOut": "2024-02-17T11:00:00Z",
          "nights": 2,
          "amenities": ["WiFi", "Pool", "Spa"],
          "images": ["hotel1.jpg", "hotel2.jpg"]
        }
      ],
      "transportation": [
        {
          "id": "trans_id",
          "type": "BUS",
          "description": "Comfortable coach",
          "departure": "Hotel lobby",
          "arrival": "Tour destination",
          "duration": "30 minutes",
          "details": "Air-conditioned bus"
        }
      ],
      "reviews": [
        {
          "id": "review_id",
          "rating": 5,
          "title": "Amazing experience!",
          "comment": "Best tour ever...",
          "isVerified": true,
          "isRecommended": true,
          "helpfulVotes": 12,
          "operatorResponse": "Thank you for the review!",
          "createdAt": "2024-01-01T00:00:00Z",
          "reviewer": {
            "id": "customer_id",
            "name": "John Doe",
            "avatar": "avatar.jpg"
          }
        }
      ],
      "stats": {
        "totalBookings": 45,
        "totalReviews": 32,
        "averageRating": 4.7,
        "ratingDistribution": {
          "5": 20,
          "4": 8,
          "3": 3,
          "2": 1,
          "1": 0
        },
        "activeBookings": 12,
        "completionRate": 95
      }
    }
  }
}
```

3.`/api/client/operators/[id]` - Get Operator details

#### Response structure

```
{
  "success": true,
  "data": {
    "operator": {
      "id": "op_id",
      "companyName": "Amazing Tours Co",
      "tagline": "Best tours in the city",
      "description": "Professional tour operator...",
      "founded": "2010",
      "headquarters": "Paris, France",
      "employees": 25,
      "operatingRegions": ["France", "Italy", "Spain"],
      "website": "https://tours.com",
      "email": "contact@tours.com",
      "phone": "+33123456789",
      "address": "123 Tour Street, Paris",
      "socialMedia": {
        "facebook": "facebook_url",
        "instagram": "instagram_url",
        "twitter": "twitter_url"
      },
      "businessHours": {
        "monday": "9:00-18:00",
        "tuesday": "9:00-18:00"
      },
      "timezone": "Europe/Paris",
      "emergencyContact": "+33987654321",
      "logo": "logo.jpg",
      "coverImage": "cover.jpg",
      "sustainabilityScore": 85,
      "safetyRecord": 95,
      "communityImpact": 80,
      "customerSatisfaction": 90,
      "licenseNumber": "LIC123456",
      "createdAt": "2020-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z",
      "user": {
        "id": "user_id",
        "name": "John Smith",
        "email": "john@tours.com",
        "avatar": "avatar.jpg",
        "createdAt": "2020-01-01T00:00:00Z"
      },
      "tours": [
        {
          "id": "tour_id",
          "title": "City Walking Tour",
          "shortDescription": "Explore the city on foot",
          "price": 299.99,
          "originalPrice": 399.99,
          "currency": "USD",
          "duration": "8 hours",
          "location": "Paris",
          "images": ["tour1.jpg"],
          "rating": 4.6,
          "totalReviews": 18,
          "totalBookings": 25,
          "isFeatured": true,
          "category": {
            "name": "City Tours",
            "color": "#3B82F6"
          }
        }
      ],
      "teamMembers": [
        {
          "id": "member_id",
          "name": "Jane Doe",
          "role": "Lead Guide",
          "image": "jane.jpg",
          "bio": "Expert guide with 5 years experience"
        }
      ],
      "certifications": [
        {
          "id": "cert_id",
          "name": "Tourism License",
          "year": "2020",
          "organization": "Tourism Board",
          "certificateUrl": "cert.pdf"
        }
      ],
      "gallery": [
        {
          "id": "gallery_id",
          "url": "photo1.jpg",
          "caption": "Our team in action",
          "category": "Team"
        }
      ],
      "partnerships": [
        {
          "id": "partner_id",
          "name": "Hotel Partner",
          "logo": "partner_logo.jpg",
          "description": "Accommodation partner",
          "website": "https://partner.com"
        }
      ],
      "awards": [
        {
          "id": "award_id",
          "name": "Best Tour Operator 2023",
          "year": "2023",
          "organization": "Tourism Awards",
          "description": "Excellence in service"
        }
      ],
      "sustainabilityInitiatives": [
        {
          "id": "initiative_id",
          "title": "Eco-Friendly Tours",
          "description": "Carbon neutral operations",
          "icon": "Leaf",
          "impact": "50% carbon reduction"
        }
      ],
      "stats": {
        "totalTours": 5,
        "activeTours": 4,
        "totalReviews": 150,
        "totalBookings": 300,
        "averageRating": 4.8,
        "joinedDate": "2020-01-01T00:00:00Z"
      }
    }
  }
}
```


4.`/api/client/categories`- Get categories

#### Response structure

```
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "cat_id",
        "name": "City Tours",
        "description": "Urban exploration tours",
        "color": "#3B82F6",
        "icon": "MapPin",
        "isActive": true,
        "createdAt": "2024-01-01T00:00:00Z",
        "toursCount": 25,
        "tours": [
          {
            "id": "tour_id",
            "title": "Paris Walking Tour",
            "shortDescription": "Explore Paris on foot",
            "price": 299.99,
            "originalPrice": 399.99,
            "currency": "USD",
            "duration": "8 hours",
            "location": "Paris, France",
            "images": ["tour1.jpg"],
            "rating": 4.7,
            "totalReviews": 32,
            "totalBookings": 45,
            "isFeatured": true,
            "operator": {
              "companyName": "Amazing Tours Co",
              "logo": "logo.jpg"
            }
          }
        ]
      }
    ]
  }
}
```

