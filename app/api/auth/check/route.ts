import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ authenticated: false, message: "Not authenticated" }, { status: 401 })
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        name: session.user?.name,
        email: session.user?.email,
        role: session.user?.role,
        isAdmin: session.user?.isAdmin,
      },
    })
  } catch (error) {
    console.error("Error checking authentication:", error)
    return NextResponse.json({ error: "Failed to check authentication" }, { status: 500 })
  }
}
