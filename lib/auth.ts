import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

export interface AuthUser {
  id: string
  email: string
  role: string
}

export async function verifyAuth(request: NextRequest): Promise<AuthUser | null> {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    return decoded
  } catch (error) {
    return null
  }
}

export function requireAuth(handler: Function) {
  return async (request: NextRequest, context: any) => {
    const user = await verifyAuth(request)

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    return handler(request, context, user)
  }
}

export function requireRole(roles: string[]) {
  return (handler: Function) => {
    return async (request: NextRequest, context: any) => {
      const user = await verifyAuth(request)

      if (!user || !roles.includes(user.role)) {
        return Response.json({ error: "Forbidden" }, { status: 403 })
      }

      return handler(request, context, user)
    }
  }
}
