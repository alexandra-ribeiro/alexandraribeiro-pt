"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface ProductCategory {
  id: string
  name: string
  slug: string
}

interface ProductFiltersProps {
  categories: ProductCategory[]
  selectedCategory: string | undefined
  sortBy: string | undefined
  dict: {
    sortByLabel: string
    categoryLabel: string
    priceAsc: string
    priceDesc: string
    nameAsc: string
    nameDesc: string
    clear: string
  }
  onCategoryChange: (categorySlug: string | undefined) => void
  onSortByChange: (sortBy: string | undefined) => void
}

export default function ProductFilters({
  categories,
  selectedCategory,
  sortBy,
  dict,
  onCategoryChange,
  onSortByChange,
}: ProductFiltersProps) {
  const handleClearFilters = () => {
    onCategoryChange(undefined)
    onSortByChange(undefined)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-end">
      {categories && categories.length > 0 && (
        <Select onValueChange={onCategoryChange} value={selectedCategory}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder={dict.categoryLabel} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{dict.categoryLabel}</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Select onValueChange={onSortByChange} value={sortBy}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder={dict.sortByLabel} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="nameAsc">{dict.nameAsc}</SelectItem>
          <SelectItem value="nameDesc">{dict.nameDesc}</SelectItem>
          <SelectItem value="priceAsc">{dict.priceAsc}</SelectItem>
          <SelectItem value="priceDesc">{dict.priceDesc}</SelectItem>
        </SelectContent>
      </Select>

      {(selectedCategory || sortBy) && (
        <Button variant="outline" onClick={handleClearFilters} className="w-full sm:w-auto bg-transparent">
          {dict.clear}
        </Button>
      )}
    </div>
  )
}
