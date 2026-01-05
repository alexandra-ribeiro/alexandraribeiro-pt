"use client"

import { Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"

export default function WhatIsVA({ dict }: { dict: any }) {
  const { lang } = useLanguage()

  return (
    <section className="relative bg-white py-12 md:py-24 overflow-hidden section-decorator decorator-dots">
      <div className="absolute inset-0 bg-primary/[0.01] opacity-10 z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-sm md:max-w-2xl lg:max-w-6xl mx-auto">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-center text-primary mb-8 md:mb-12 px-2">
            {dict.title}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Content Column */}
            <div className="order-2 lg:order-1">
              <div className="space-y-4 md:space-y-6">
                  {dict.points.map((point: { title: string; description: string },
    index: number) => (
                  <div key={index} className="flex items-start px-2">
                    <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 bg-[#D4C675] rounded-full flex items-center justify-center mr-2 md:mr-3 mt-1">
                      <Check className="h-3 w-3 md:h-4 md:w-4 text-white" />
                    </div>
                   <div className="space-y-1">
  <p className="text-sm md:text-base font-semibold text-foreground">
    {point.title}
  </p>
  <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
    {point.description}
  </p>
</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Column */}
            <div className="order-1 lg:order-2 flex justify-center items-start">
              <div className="relative w-full max-w-md">
                <Image
                  src="/images/alexandra-business-woman.png"
                  alt="Business woman thinking."
                  width={400}
                  height={400}
                  className="rounded-lg shadow-lg object-cover w-full h-auto"
                  priority
                />
                <div className="mt-6 md:mt-10 bg-primary/5 p-4 md:p-6 rounded-lg border border-primary/10 mx-2">
                  <p className="text-sm md:text-base text-primary font-medium leading-relaxed">{dict.highlight}</p>
                </div>

                <div className="mt-6 md:mt-8 text-center px-2">
                  <Link href={`/${lang}/contact`}>
                    <Button
                      size="lg"
                      className="w-full md:w-auto bg-primary hover:bg-[#CC9E00] hover:text-primary text-white px-6 md:px-8 py-4 md:py-6 text-sm md:text-base shadow-lg"
                    >
                      {dict.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
