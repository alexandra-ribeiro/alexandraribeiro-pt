import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for static files, api routes, etc.
  if (pathname.startsWith("/_next") || pathname.includes(".") || pathname.startsWith("/api")) {
    return NextResponse.next()
  }

  // Special handling for admin routes
  if (pathname.startsWith("/admin")) {
    // Don't redirect admin routes through the language middleware
    return NextResponse.next()
  }

  // If the pathname doesn't start with /pt or /en, redirect to /pt (default language)
  if (!pathname.match(/^\/(pt|en)($|\/)/)) {
    return NextResponse.redirect(new URL("/pt" + pathname, request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
