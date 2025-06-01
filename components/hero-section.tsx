import { Button } from "@/components/ui/button"
import Link from "next/link"
import ContentDisplay from "@/components/content-display"

export default function HeroSection({ dict }: { dict: any }) {
  // Extract language from dict or URL
  const lang = dict.lang || (typeof window !== "undefined" && window.location.pathname.includes("/en") ? "en" : "pt")

  return (
    <section className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] overflow-hidden">
      {/* Background image with blue overlay */}
      <div
        className="fixed inset-0 w-full h-screen -z-10 bg-primary"
        style={{
          backgroundImage:
            "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/free-stock-ivory-mix-2-2021%20%285%29.jpg-kWMnTreFldUT18FD89P0DtoANaA8a1.jpeg?v=" +
            Date.now() +
            "')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 texture-dots"></div>
      </div>

      {/* Decorative elements - hidden on mobile */}
      <div className="absolute top-20 right-20 w-32 h-32 border-2 border-accent/30 rounded-full hidden lg:block"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-primary/10 rounded-lg transform rotate-45 hidden lg:block"></div>

      {/* Content overlay */}
      <div className="relative h-full container mx-auto flex flex-col justify-center px-4 sm:px-6 md:px-8 z-10">
        <div className="w-full max-w-sm sm:max-w-lg md:max-w-2xl bg-card/95 p-4 sm:p-6 md:p-8 rounded-lg backdrop-blur-sm shadow-xl border-l-4 border-accent">
          <span className="text-accent text-xs sm:text-sm uppercase tracking-wide font-medium mb-2 sm:mb-3 block leading-tight">
            {lang === "en" || dict.lang === "en"
              ? "Simplified Systems Implementation and AI for New Entrepreneurs and Online Stores"
              : "Simplified Systems Implementation and AI for New Entrepreneurs and Online Stores"}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 sm:mb-6 leading-tight">
            <ContentDisplay storageKey={`home_${lang}`} field="headline" fallback={dict.headline} />
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-foreground/80 mb-6 sm:mb-8 font-light leading-relaxed">
            <ContentDisplay storageKey={`home_${lang}`} field="subheadline" fallback={dict.subheadline} />
          </p>
          <Link href={`/${lang}/services`}>
            <Button
              size="lg"
              className="bg-[#CC9E00] hover:bg-primary hover:text-white text-primary px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 text-sm sm:text-base w-full sm:w-auto"
            >
              <ContentDisplay storageKey={`home_${lang}`} field="cta" fallback={dict.cta} />
              <span className="ml-2">→</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 bg-card"
        style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)" }}
      ></div>
    </section>
  )
}
