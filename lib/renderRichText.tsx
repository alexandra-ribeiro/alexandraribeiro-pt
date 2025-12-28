import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import Link from "next/link"

export function renderRichText(content: any) {
  if (!content) return null

  return documentToReactComponents(content, {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_, children) => (
        <p className="mb-4 leading-relaxed">{children}</p>
      ),

      [BLOCKS.HEADING_2]: (_, children) => (
        <h2 className="text-2xl font-bold mt-10 mb-4">{children}</h2>
      ),

      [BLOCKS.HEADING_3]: (_, children) => (
        <h3 className="text-xl font-semibold mt-8 mb-3">{children}</h3>
      ),

      [BLOCKS.UL_LIST]: (_, children) => (
        <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
      ),

      [BLOCKS.OL_LIST]: (_, children) => (
        <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
      ),

      [BLOCKS.LIST_ITEM]: (_, children) => <li>{children}</li>,

      // ✅ LINHA DIVISORA (ISTO É O QUE TE FALTA)
      [BLOCKS.HR]: () => (
        <hr className="my-10 border-t border-gray-300" />
      ),

      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const file = node.data.target.fields.file
        const title = node.data.target.fields.title

        if (!file?.url) return null

        const imageUrl = file.url.startsWith("//")
          ? `https:${file.url}`
          : file.url

        return (
          <figure className="my-10">
            <img
              src={imageUrl}
              alt={title || ""}
              className="rounded-xl shadow-md mx-auto"
            />
            {title && (
              <figcaption className="text-sm text-gray-500 text-center mt-2">
                {title}
              </figcaption>
            )}
          </figure>
        )
      },

      [INLINES.HYPERLINK]: (node, children) => (
        <a
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          {children}
        </a>
      ),
    },
  })
}
