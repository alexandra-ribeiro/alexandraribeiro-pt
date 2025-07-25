import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if pathname already has a locale
  const pathnameHasLocale = ["/en", "/pt"].some((locale) => pathname.startsWith(locale) || pathname === locale.slice(1))

  if (!pathnameHasLocale) {
    // Default to Portuguese
    const locale = "pt"

    // Handle root path
    if (pathname === "/") {
      return NextResponse.redirect(new URL(`/${locale}`, request.url))
    }

    // Handle other paths
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico|images|.*\\.).*)",
  ],
}
