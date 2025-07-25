import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname

    // Skip middleware for static files and API routes
    if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api") ||
      pathname.startsWith("/favicon") ||
      pathname.includes(".")
    ) {
      return NextResponse.next()
    }

    // Handle root path redirect
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/pt", request.url))
    }

    // Check if pathname already has a language prefix
    const supportedLanguages = ["pt", "en"]
    const pathnameHasLocale = supportedLanguages.some(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    )

    // If no language prefix, redirect to Portuguese (default)
    if (!pathnameHasLocale) {
      return NextResponse.redirect(new URL(`/pt${pathname}`, request.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error("Middleware error:", error)
    // Return a safe fallback response
    return NextResponse.redirect(new URL("/pt", request.url))
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
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
}
