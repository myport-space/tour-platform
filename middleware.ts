import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

export async function middleware(request: NextRequest,response: NextResponse) {
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
  const token = request.cookies.get("auth-token")?.value || request.headers.get("authorization")?.replace("Bearer ", "")
      
 
  if (!token) {
    console.log("No token found, redirecting to login")
    // Redirect to login if no token
    console.log("No token");
    
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  try {
    // Verify the token using jose (Edge-compatible)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    const { payload } = await jwtVerify(token, secret)
    // Verify the token

    if (!payload) {
      console.log("Invalid token payload")
      throw new Error("Invalid token")
    }

    console.log("Token verified for user:", payload.email, "Role:", payload.role)

    // Check if user is trying to access admin routes
    if (pathname.startsWith("/admin") && payload.role !== "OPERATOR") {
      console.log("User not authorized for admin routes")
      return NextResponse.redirect(new URL("/", request.url))
    }

    // Add user info to headers for API routes
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-user-id", String(payload.userId))
    requestHeaders.set("x-user-role", String(payload.role))
    requestHeaders.set("x-user-email", String(payload.email))

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })

  } catch (error) {
    console.error("Middleware auth error:", error)
    // Invalid token, redirect to login
    console.log(error);
    
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
