"use client"

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { useState, useEffect, useRef } from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
  return date.toLocaleDateString("en-US", options)
}

export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
}

export function unescapeHtml(html: string): string {
  return html
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#x2F;/g, "/") // For forward slash
    .replace(/&#x3D;/g, "=") // For equals sign
    .replace(/&#x27;/g, "'") // For apostrophe
    .replace(/&#x60;/g, "`") // For backtick
}

export function formatCurrency(amount: number, locale: "pt" | "en"): string {
  const currency = "EUR" // Assuming Euro as the currency
  const options: Intl.NumberFormatOptions = {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }

  if (locale === "pt") {
    return new Intl.NumberFormat("pt-PT", options).format(amount)
  } else {
    return new Intl.NumberFormat("en-US", options).format(amount)
  }
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Clear previous timeout if value changes
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set a new timeout
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup function to clear timeout on unmount or re-render
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [value, delay])

  return debouncedValue
}
