import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    const response = await fetch("https://api.mailerlite.com/api/v2/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-MailerLite-ApiKey": process.env.MAILERLITE_API_KEY || "",
      },
      body: JSON.stringify({
        email,
        name: name || "",
        resubscribe: true,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("MailerLite API error:", error)
      return NextResponse.json({ error: "Failed to subscribe to newsletter" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
