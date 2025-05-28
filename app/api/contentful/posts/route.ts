import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "contentful"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = Number.parseInt(searchParams.get("limit") || "10", 10)
    const language = searchParams.get("language") || undefined

    // Use the provided Space ID and Access Token for the AV Blog space
    const space = "s6yvdch48olm"
    const accessToken = "-7DsC8TRmQ5Ig6drErJdGLk29G7UmAjwwbMFANITzUc"

    if (!space || !accessToken) {
      return NextResponse.json({ error: "Missing Contentful credentials" }, { status: 500 })
    }

    const client = createClient({
      space,
      accessToken,
    })

    const query: any = {
      content_type: "blogPost",
      order: "-fields.publishedDate",
      limit,
    }

    if (language) {
      query["fields.language"] = language
    }

    const response = await client.getEntries(query)

    return NextResponse.json(response.items)
  } catch (error) {
    console.error("Error fetching Contentful posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts from Contentful" }, { status: 500 })
  }
}
