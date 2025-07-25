"use client"

import { useState, useEffect, useMemo } from "react"
import ProductCard from "@/components/product-card"
import type { Dictionary } from "@/lib/dictionaries"

// -----------------------------------------------------------------------------
// Textos-padrão (PT e EN) para quando não existirem no dicionário recebido
// -----------------------------------------------------------------------------
const defaultDict = {
  store: {
    search: {
      placeholder: {
        pt: "Pesquisar produtos...",
        en: "Search products...",
      },
    },
    filters: {
      sortByLabel: { pt: "Ordenar por", en: "Sort by" },
      categoryLabel: { pt: "Categoria", en: "Category" },
      priceAsc: { pt: "Preço ▲", en: "Price ▲" },
      priceDesc: { pt: "Preço ▼", en: "Price ▼" },
      nameAsc: { pt: "Nome A-Z", en: "Name A-Z" },
      nameDesc: { pt: "Nome Z-A", en: "Name Z-A" },
      clear: { pt: "Limpar", en: "Clear" },
    },
    noProductsFound: {
      pt: "Não foram encontrados produtos.",
      en: "No products found.",
    },
  },
}

interface Product {
  id: string
  title: string
  description: any
  price: number
  image?: string | null
  category?: { name: string; slug: string } | null
  slug: string
}

interface ProductCategory {
  id: string
  name: string
  slug: string
}

interface ProductListProps {
  initialProducts: Product[]
  initialCategories: ProductCategory[]
  lang: string
  dict?: Dictionary
}

export default function ProductList({ initialProducts, initialCategories, lang, dict }: ProductListProps) {
  // Seleciona idioma ('pt' ou 'en')
  const localeKey = lang === "pt" ? "pt" : "en"

  // Fallback seguro para todos os textos
  const storeDict = dict?.store ?? {}
  const searchPlaceholderText =
    storeDict.search?.placeholder?.[localeKey] ?? defaultDict.store.search.placeholder[localeKey]
  const filtersDict = {
    sortByLabel: storeDict.filters?.sortByLabel?.[localeKey] ?? defaultDict.store.filters.sortByLabel[localeKey],
    categoryLabel: storeDict.filters?.categoryLabel?.[localeKey] ?? defaultDict.store.filters.categoryLabel[localeKey],
    priceAsc: storeDict.filters?.priceAsc?.[localeKey] ?? defaultDict.store.filters.priceAsc[localeKey],
    priceDesc: storeDict.filters?.priceDesc?.[localeKey] ?? defaultDict.store.filters.priceDesc[localeKey],
    nameAsc: storeDict.filters?.nameAsc?.[localeKey] ?? defaultDict.store.filters.nameAsc[localeKey],
    nameDesc: storeDict.filters?.nameDesc?.[localeKey] ?? defaultDict.store.filters.nameDesc[localeKey],
    clear: storeDict.filters?.clear?.[localeKey] ?? defaultDict.store.filters.clear[localeKey],
  }
  const noProductsFoundText = storeDict.noProductsFound?.[localeKey] ?? defaultDict.store.noProductsFound[localeKey]

  const [products, setProducts] = useState(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
  const [sortBy, setSortBy] = useState<string | undefined>(undefined)

  useEffect(() => {
    let filteredProducts = initialProducts

    if (selectedCategory && selectedCategory !== "all") {
      filteredProducts = filteredProducts.filter((product) => product.category?.slug === selectedCategory)
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (sortBy) {
      filteredProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === "priceAsc") {
          return a.price - b.price
        } else if (sortBy === "priceDesc") {
          return b.price - a.price
        } else if (sortBy === "nameAsc") {
          return a.title.localeCompare(b.title)
        } else if (sortBy === "nameDesc") {
          return b.title.localeCompare(a.title)
        }
        return 0
      })
    }

    setProducts(filteredProducts)
  }, [initialProducts, searchQuery, selectedCategory, sortBy])

  const allProductTitles = useMemo(
    () => initialProducts.map((p) => ({ title: p.title, slug: p.slug })),
    [initialProducts],
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Removed search and filter components from here */}
      {products.length === 0 ? (
        <div className="text-center text-gray-500 py-10">{noProductsFoundText}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} lang={lang} />
          ))}
        </div>
      )}
    </div>
  )
}
