"use client"

import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import { useDebounce } from "@/lib/utils"
import { useEffect, useState } from "react"

interface ProductSearchProps {
  products: { title: string; slug: string }[]
  lang: string
  placeholder: string
  onSearch: (query: string) => void
}

export default function ProductSearch({ products, lang, placeholder, onSearch }: ProductSearchProps) {
  const [inputValue, setInputValue] = useState("")
  const debouncedSearchQuery = useDebounce(inputValue, 500)

  useEffect(() => {
    onSearch(debouncedSearchQuery)
  }, [debouncedSearchQuery, onSearch])

  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input
        type="text"
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  )
}
