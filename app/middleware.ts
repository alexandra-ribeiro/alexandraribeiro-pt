import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = ["/pt", "/en"].every(
    (locale) => !pathname.startsWith(`${locale}/`) && pathname !== locale,
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // Default to Portuguese
    return NextResponse.redirect(new URL(`/pt${pathname}`, request.url))
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico|images|.*\\..*|admin).*)",
  ],
}
