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
    <section id="about-me" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-6 text-primary">{dict.title}</h2>
            <div className="space-y-4 text-gray-700">
              {dict.bio.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8">
              <Link href={`/${lang}/about`}>
                <Button className="bg-primary hover:bg-primary/90 text-white">{dict.cta}</Button>
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1photo.png-e6kUKKSk8rktuqILYDfbNxmNXeJAWE.jpeg"
                alt="Alexandra Ribeiro"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-accent/20 rounded-full"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
