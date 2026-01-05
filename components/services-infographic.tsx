"use client"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function ServicesInfographic({ dict }: { dict: any }) {
  const { lang } = useLanguage()

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with yellow color and texture - with transparency */}
      <div className="absolute inset-0 bg-customGold/60 z-0"></div>
      <div className="absolute inset-0 texture-dots opacity-20 z-0"></div>

      <div className="container mx-auto relative z-10">
        <div className="w-full max-w-5xl mx-auto mb-8 bg-transparent">
          {/* Using direct URL to avoid caching issues */}
          <Image
            src="/images/design-mode/AV%20-%20circle%20infographic%20%281%29.png"
            alt="Serviços - Como posso ajudar a sua empresa?"
            width={1200}
            height={800}
            className="w-full h-auto"
            unoptimized
          />
        </div>

        <div className="mt-8 text-center">
          <Link href={`/${lang}/services`}>
            <Button className="bg-primary hover:bg-customGold text-white group px-8 py-6 text-base shadow-lg">
              {dict?.cta || "Ver todos os serviços"}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
