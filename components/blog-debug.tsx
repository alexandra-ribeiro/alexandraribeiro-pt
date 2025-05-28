"use client"

import { useState, useEffect } from "react"
import { getAllArticles, getArticlesByLanguage } from "@/lib/blog-storage"

export default function BlogDebug() {
  const [allArticles, setAllArticles] = useState<any[]>([])
  const [ptArticles, setPtArticles] = useState<any[]>([])
  const [enArticles, setEnArticles] = useState<any[]>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Get all articles
      const all = getAllArticles()
      setAllArticles(all)

      // Get PT articles
      const pt = getArticlesByLanguage("pt")
      setPtArticles(pt)

      // Get EN articles
      const en = getArticlesByLanguage("en")
      setEnArticles(en)

      console.log("DEBUG - All articles:", all)
      console.log("DEBUG - PT articles:", pt)
      console.log("DEBUG - EN articles:", en)
    }
  }, [])

  if (typeof window === "undefined") {
    return null
  }

  return (
    <div className="fixed bottom-0 right-0 bg-black/80 text-white p-4 max-w-md max-h-96 overflow-auto text-xs z-50">
      <h3 className="font-bold mb-2">Blog Debug</h3>
      <p>All Articles: {allArticles.length}</p>
      <p>PT Articles: {ptArticles.length}</p>
      <p>EN Articles: {enArticles.length}</p>

      <h4 className="font-bold mt-4 mb-1">PT Articles:</h4>
      <ul className="list-disc pl-4">
        {ptArticles.map((article, i) => (
          <li key={i}>
            {article.title} ({article._id.startsWith("sample_") ? "Sample" : "Custom"})
            {article.published ? " - Published" : " - Draft"}
          </li>
        ))}
      </ul>

      <h4 className="font-bold mt-4 mb-1">EN Articles:</h4>
      <ul className="list-disc pl-4">
        {enArticles.map((article, i) => (
          <li key={i}>
            {article.title} ({article._id.startsWith("sample_") ? "Sample" : "Custom"})
            {article.published ? " - Published" : " - Draft"}
          </li>
        ))}
      </ul>
    </div>
  )
}
