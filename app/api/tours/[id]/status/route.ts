import { verifyToken } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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
    let { status} = body
    
    status = status.toUpperCase()
    switch (status) {
      case "COMPLETED":
        return NextResponse.json({ error: "Cannot update status of the completed tour" }, { status: 400 })
      
      case "CANCELLED":
        return NextResponse.json({error:"Cannot update stuatus of Cancelled tour"},{status:400})
      default:
        break;
    }
    await prisma.tour.update({
        where:{
            id:params.id,
        },
        data:{
            status
        }
    })

    return NextResponse.json({success:true,message:"Status updated success",},{status:200})

  }
  catch(err){
    console.error("Error updating category:", err)
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
        
  }
}