import { verifyToken } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }
    
    const body = await request.json()
    let { name,departureDate,returnDate,maxSeats,price} = body

    await prisma.spot.create({
        data: {
            name,
            departureDate:new Date(departureDate),
            maxSeats:Number(maxSeats),
            returnDate:new Date(returnDate),
            price:Number(price),
            tour: {
                connect: { id: params.id }
            }
        }
    })

    return NextResponse.json({message:"Spot addedd success!"},{status:200})
    }
    catch(e){
        console.log(e);
        
        return NextResponse.json({message:"Error occured while adding spot"},{status:500})
    }
}