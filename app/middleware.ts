import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip Next.js internals, static files, API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // Allow SEO-critical files at root
  if (pathname === "/sitemap.xml" || pathname === "/robots.txt") {
    return NextResponse.next()
  }

  // Skip admin routes
  if (pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  // Redirect non-localized routes to default language (/pt)
  if (!pathname.match(/^\/(pt|en)(\/|$)/)) {
    return NextResponse.redirect(new URL(`/pt${pathname}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
