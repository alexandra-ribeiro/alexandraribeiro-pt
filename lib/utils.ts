import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns a locale-aware, human-readable date:
 *  • PT ⇒ "17 de julho de 2025"
 *  • EN ⇒ "July 17, 2025"
 */
export function formatDate(date: string | Date, lang = "en") {
  try {
    const d = typeof date === "string" ? new Date(date) : date
    const locale = lang.startsWith("pt") ? "pt-PT" : "en-US"

    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(d)
  } catch (error) {
    console.error("formatDate() error:", error)
    // Fallback: return raw value
    return typeof date === "string" ? date : d.toISOString()
  }
}
