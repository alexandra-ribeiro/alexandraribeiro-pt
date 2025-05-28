import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FinalCTA({ dict }: { dict: any }) {
  return (
    <section className="bg-primary text-white py-24 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 texture-diagonal opacity-10"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%, 0 0)" }}>
        <div className="w-full h-full bg-accent/20"></div>
      </div>

      <div className="absolute -top-10 right-10 w-40 h-40 border-2 border-white/10 rounded-full"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent/10 rounded-full"></div>

      <div className="container section text-center relative">
        <div className="max-w-2xl mx-auto space-y-8">
          
          <h2 className="text-3xl md:text-4xl font-bold">{dict.title}</h2>
          <p className="text-primary-foreground/90 text-lg">{dict.description}</p>
          <div className="pt-4">
            <Link href="/pt/contact">
              <Button
                size="lg"
                className="bg-[#CC9E00] text-primary hover:bg-primary hover:text-white transition-colors px-10 py-7 text-base shadow-xl"
              >
                {dict.button}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
