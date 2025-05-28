"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { getImageUrl, type BlogPost } from "@/lib/contentful"
import { formatDate } from "@/lib/utils"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types"

interface ClientBlogPostProps {
  post: BlogPost
  lang: string
}

export default function ClientBlogPost({ post, lang }: ClientBlogPostProps) {
  const [imageError, setImageError] = useState(false)

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => <strong className="font-bold">{text}</strong>,
      [MARKS.ITALIC]: (text: React.ReactNode) => <em className="italic">{text}</em>,
      [MARKS.UNDERLINE]: (text: React.ReactNode) => <u className="underline">{text}</u>,
      [MARKS.CODE]: (text: React.ReactNode) => (
        <code className="bg-gray-100 p-1 rounded font-mono text-sm">{text}</code>
      ),
      [MARKS.SUPERSCRIPT]: (text: React.ReactNode) => <sup>{text}</sup>,
      [MARKS.SUBSCRIPT]: (text: React.ReactNode) => <sub>{text}</sub>,
      [MARKS.STRIKETHROUGH]: (text: React.ReactNode) => <s>{text}</s>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => <p className="mb-4 text-gray-700">{children}</p>,
      [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => (
        <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => (
        <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => (
        <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node: any, children: React.ReactNode) => (
        <h4 className="text-lg font-bold mt-6 mb-2">{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (node: any, children: React.ReactNode) => (
        <h5 className="text-base font-bold mt-4 mb-2">{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (node: any, children: React.ReactNode) => (
        <h6 className="text-sm font-bold mt-4 mb-2">{children}</h6>
      ),
      [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => (
        <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => (
        <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => <li className="text-gray-700">{children}</li>,
      [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
        <blockquote className="border-l-4 border-accent pl-4 italic my-6 text-gray-600">{children}</blockquote>
      ),
      [BLOCKS.HR]: () => <hr className="my-8 border-t border-gray-200" />,
      [BLOCKS.TABLE]: (node: any, children: React.ReactNode) => (
        <div className="overflow-x-auto my-6">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
          </table>
        </div>
      ),
      [BLOCKS.TABLE_ROW]: (node: any, children: React.ReactNode) => <tr>{children}</tr>,
      [BLOCKS.TABLE_CELL]: (node: any, children: React.ReactNode) => (
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{children}</td>
      ),
      [BLOCKS.TABLE_HEADER_CELL]: (node: any, children: React.ReactNode) => (
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{children}</th>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        try {
          if (!node.data?.target?.fields) {
            return <div className="my-4 p-4 bg-gray-100 text-gray-500 text-center">Missing image</div>
          }

          const { title, description, file } = node.data.target.fields

          if (!file || !file.url) {
            return <div className="my-4 p-4 bg-gray-100 text-gray-500 text-center">Invalid image</div>
          }

          const url = file.url.startsWith("//") ? `https:${file.url}` : file.url

          return (
            <div className="my-8">
              <div className="relative h-96 w-full">
                <Image
                  src={url || "/placeholder.svg"}
                  alt={description || title || "Blog post image"}
                  fill
                  className="object-contain rounded-lg"
                  onError={() => {
                    console.warn("Failed to load embedded image")
                    // We don't set error state here to avoid re-renders
                  }}
                />
              </div>
              {title && <p className="text-center text-sm text-gray-500 mt-2">{title}</p>}
            </div>
          )
        } catch (error) {
          console.error("Error rendering embedded asset:", error)
          return <div className="my-4 p-4 bg-gray-100 text-gray-500 text-center">Failed to load image</div>
        }
      },
      [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => {
        try {
          return (
            <a href={node.data.uri} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          )
        } catch (error) {
          console.error("Error rendering hyperlink:", error)
          return <span className="text-accent">{children}</span>
        }
      },
      [INLINES.ASSET_HYPERLINK]: (node: any, children: React.ReactNode) => {
        try {
          return (
            <a
              href={node.data.target.fields.file.url}
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          )
        } catch (error) {
          console.error("Error rendering asset hyperlink:", error)
          return <span className="text-accent">{children}</span>
        }
      },
      [INLINES.EMBEDDED_ENTRY]: (node: any, children: React.ReactNode) => {
        try {
          return (
            <span className="inline-block bg-gray-100 px-2 py-1 rounded text-sm">
              {node.data.target.fields.title || "Embedded Entry"}
            </span>
          )
        } catch (error) {
          console.error("Error rendering embedded entry:", error)
          return <span className="text-accent">{children}</span>
        }
      },
    },
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
      {post.fields.featuredImage && !imageError && (
        <div className="relative h-[400px] w-full">
          <Image
            src={getImageUrl(post.fields.featuredImage) || "/placeholder.svg"}
            alt={post.fields.title}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        </div>
      )}

      <div className="p-8">
        <div className="mb-6">
          <p className="text-accent text-sm font-medium mb-2">
            {post.fields.publishedDate ? formatDate(post.fields.publishedDate, lang) : ""}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{post.fields.title}</h1>
          {post.fields.author && <p className="text-gray-600">By {post.fields.author.fields.name}</p>}
        </div>

        <div className="prose prose-lg max-w-none">
          {post.fields.content ? (
            documentToReactComponents(post.fields.content, options)
          ) : (
            <p className="text-gray-600">{post.fields.description}</p>
          )}
        </div>
      </div>
    </div>
  )
}
