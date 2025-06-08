import { verifyToken } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

    // Just for testing
    let booking = await prisma.booking.create({
         data:{
            bookingNumber:"BK01PK",
            seats:4,
            totalAmount:996,
            currency:"USD",
            customerId:"cmbkoy1s60000ir0vy3valjl5",
            paidAmount:550,
            payments:{
                create:{
                    amount:550,
                    method:"CREDIT_CARD",
                    customerId:"cmbkoy1s60000ir0vy3valjl5",
                }
            },
            tourId:"cmbkp22i10005ir0vqp0lrs8k",
            specialRequests:"Need priasd",
            spotId:"cmbkp24b00009ir0vf2doc9nf",
            travelers:{
                createMany:{
                    data:[
                         {
                         firstName:"Muhammad",
                    lastName:"Afnan",
                    dateOfBirth:new Date(),
                    email:"afnanahhad@gmail.com",
                    emergencyContact:"+92304564562",
                    medicalConditions:"Pass",
                    nationality:"Pakistani",
                    passportNumber:"PK90283092809809",
                    phone:"+923189813615"

                    },
                         {
                         firstName:"Muhammad",
                    lastName:"Afnan",
                    dateOfBirth:new Date(),
                    email:"afnanahhad@gmail.com",
                    emergencyContact:"+92304564562",
                    medicalConditions:"Pass",
                    nationality:"Pakistani",
                    passportNumber:"PK90283092809809",
                    phone:"+923189813615"

                    },
                         {
                         firstName:"Muhammad",
                    lastName:"Afnan",
                    dateOfBirth:new Date(),
                    email:"afnanahhad@gmail.com",
                    emergencyContact:"+92304564562",
                    medicalConditions:"Pass",
                    nationality:"Pakistani",
                    passportNumber:"PK90283092809809",
                    phone:"+923189813615"

                    },
                     {
                         firstName:"Kamran",
                    lastName:"Bangash",
                    dateOfBirth:new Date(),
                    email:"km092890@gmail.com",
                    emergencyContact:"+923051767579",
                    medicalConditions:"Pass",
                    nationality:"Pakistani",
                    passportNumber:"PK902830998723987",
                    phone:"+923189813615"

                    }
                    ]
                }
            }
        },
    })

    return NextResponse.json({data:booking,message:"Booking created success"},{status:201})
    
    }catch(err){
        console.log(err)
        return NextResponse.json({message:"Error occured"},{status:500})
    }
}