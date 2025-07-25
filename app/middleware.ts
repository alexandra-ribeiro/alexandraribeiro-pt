import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = ["/pt", "/en"].every(
      (locale) => !pathname.startsWith(`${locale}/`) && pathname !== locale,
    )

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
      return NextResponse.redirect(new URL(`/pt${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error("Middleware error:", error)
    return NextResponse.redirect(new URL("/pt", request.url))
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico|.*\\..*|admin).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
}
