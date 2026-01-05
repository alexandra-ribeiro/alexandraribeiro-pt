import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface AboutMeProps {
  dict: {
    title: string
    bio: string
    cta: string
    badges?: string[]
  }
  lang: string
}

export default function AboutMe({ dict, lang }: AboutMeProps) {
  return (
    null
  )
}
