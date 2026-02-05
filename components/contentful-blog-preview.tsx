import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RSSPost {
  title: string
  link: string
  pubDate: string
  description: string
  image: string | null
}

interface BlogPreviewProps {
  dict: any
  lang: string
}

// Format date in Portuguese
function formatDatePT(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-PT", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  } catch {
    return dateString
  }
}

// Extract image from RSS content/description
function extractImageFromContent(content: string): string | null {
  // Try to find img tag in content
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i)
  if (imgMatch) {
    return imgMatch[1]
  }
  
  // Try to find media:content or enclosure
  const mediaMatch = content.match(/url=["']([^"']+\.(jpg|jpeg|png|gif|webp))["']/i)
  if (mediaMatch) {
    return mediaMatch[1]
  }
  
  return null
}

// Extract clean text description from HTML
function extractDescription(html: string, maxLength: number = 150): string {
  // Remove HTML tags
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim()
  
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + "..."
}

// Parse RSS feed XML to JSON
function parseRSSFeed(xml: string): RSSPost[] {
  const posts: RSSPost[] = []
  
  // Extract items from RSS
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi
  const items = xml.match(itemRegex) || []
  
  for (const item of items.slice(0, 3)) {
    // Extract title
    const titleMatch = item.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>|<title>([\s\S]*?)<\/title>/i)
    const title = titleMatch ? (titleMatch[1] || titleMatch[2] || "").trim() : ""
    
    // Extract link
    const linkMatch = item.match(/<link><!\[CDATA\[([\s\S]*?)\]\]><\/link>|<link>([\s\S]*?)<\/link>/i)
    const link = linkMatch ? (linkMatch[1] || linkMatch[2] || "").trim() : ""
    
    // Extract pubDate
    const pubDateMatch = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)
    const pubDate = pubDateMatch ? pubDateMatch[1].trim() : ""
    
    // Extract description/content
    const descMatch = item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>|<description>([\s\S]*?)<\/description>/i)
    const contentMatch = item.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/i)
    const rawContent = contentMatch ? contentMatch[1] : (descMatch ? (descMatch[1] || descMatch[2] || "") : "")
    
    // Extract image from content or media tags
    let image = extractImageFromContent(rawContent)
    
    // Try media:content tag
    if (!image) {
      const mediaContentMatch = item.match(/<media:content[^>]+url=["']([^"']+)["']/i)
      if (mediaContentMatch) {
        image = mediaContentMatch[1]
      }
    }
    
    // Try enclosure tag
    if (!image) {
      const enclosureMatch = item.match(/<enclosure[^>]+url=["']([^"']+)["']/i)
      if (enclosureMatch) {
        image = enclosureMatch[1]
      }
    }
    
    // Clean description
    const description = extractDescription(rawContent)
    
    if (title && link) {
      posts.push({
        title,
        link,
        pubDate,
        description,
        image,
      })
    }
  }
  
  return posts
}

// Fetch RSS feed from Systeme.io blog
async function fetchRSSPosts(): Promise<RSSPost[]> {
  try {
    const response = await fetch("https://pages.alexandraribeiro.pt/blog/feed", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    
    if (!response.ok) {
      throw new Error(`RSS fetch failed: ${response.status}`)
    }
    
    const xml = await response.text()
    return parseRSSFeed(xml)
  } catch (error) {
    console.error("Error fetching RSS feed:", error)
    return []
  }
}

export default async function ContentfulBlogPreview({ dict, lang }: BlogPreviewProps) {
  const posts = await fetchRSSPosts()
  const isPortuguese = lang === "pt"
  
  // Fallback if RSS fetch fails or no posts
  if (posts.length === 0) {
    return (
      <section className="bg-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 texture-grid opacity-20"></div>
        <div className="container mx-auto relative">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-accent text-sm uppercase tracking-widest font-medium mb-3 block">Blog</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">{dict.title}</h2>
            <div className="h-1 w-20 bg-accent mx-auto mb-8"></div>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-8">
              {isPortuguese 
                ? "Novos artigos em breve. Visite o blog para ver todos os conteúdos." 
                : "New articles coming soon. Visit the blog to see all content."}
            </p>
            <a href="https://pages.alexandraribeiro.pt/blog">
              <Button variant="outline" className="bg-transparent border-primary text-primary hover:bg-primary/10 px-8 py-6 text-base">
                {dict.viewAllButton || (isPortuguese ? "Ver todos os artigos" : "View all articles")}
              </Button>
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-24 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 texture-grid opacity-20"></div>

      <div className="container mx-auto relative">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-accent text-sm uppercase tracking-widest font-medium mb-3 block">Blog</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">{dict.title}</h2>
          <div className="h-1 w-20 bg-accent mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-border/10 hover-lift group"
            >
              <a href={post.link} className="block">
                <div className="relative h-56 w-full overflow-hidden">
                  {post.image ? (
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <span className="text-primary/40 text-4xl font-bold">AR</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </a>
              <div className="p-8">
                <div className="text-xs text-accent font-medium uppercase tracking-wider mb-3">
                  {post.pubDate ? formatDatePT(post.pubDate) : ""}
                </div>
                <a href={post.link}>
                  <h3 className="text-xl font-bold mb-4 text-primary group-hover:text-accent transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                </a>
                <p className="text-foreground/70 mb-6 line-clamp-3">{post.description}</p>
                <a
                  href={post.link}
                  className="inline-flex items-center text-primary font-medium group-hover:text-accent transition-colors duration-300"
                >
                  {dict.readMoreButton || (isPortuguese ? "Ler mais" : "Read more")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-16">
          <a href="https://pages.alexandraribeiro.pt/blog">
            <Button variant="outline" className="bg-transparent border-primary text-primary hover:bg-primary/10 px-8 py-6 text-base">
              {dict.viewAllButton || (isPortuguese ? "Ver todos os artigos" : "View all articles")}
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
