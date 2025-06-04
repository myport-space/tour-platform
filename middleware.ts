import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ["/auth/login", "/auth/signup", "/auth/forgot-password", "/", "/tour"]

  // Check if the current path is public
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // For protected routes, check authentication
  const token = request.cookies.get("token")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

  if (!token) {
    // Redirect to login if no token
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    // Check if user is trying to access admin routes
    if (pathname.startsWith("/admin") && decoded.role !== "OPERATOR") {
      return NextResponse.redirect(new URL("/", request.url))
    }

    // Add user info to headers for API routes
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-user-id", decoded.userId)
    requestHeaders.set("x-user-role", decoded.role)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error) {
    // Invalid token, redirect to login
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
