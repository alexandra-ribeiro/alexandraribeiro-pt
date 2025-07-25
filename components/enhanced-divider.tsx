"use client"

import { useEffect, useRef } from "react"

export default function EnhancedDivider() {
  const dividerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (dividerRef.current) {
        const scrolled = window.pageYOffset
        const rate = scrolled * -0.5
        dividerRef.current.style.transform = `translateY(${rate}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative h-5 overflow-hidden my-3">
      <div ref={dividerRef} className="absolute inset-0 flex items-center justify-center">
        {/* Main diagonal shape with mustard-yellow */}
        <div className="w-full h-8 relative transform -skew-y-2">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-600/30 to-transparent"
            style={{
              clipPath: "polygon(0 40%, 100% 0%, 100% 60%, 0% 100%)",
            }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-700/20 to-transparent"
            style={{
              clipPath: "polygon(10% 50%, 90% 10%, 90% 50%, 10% 90%)",
            }}
          />
          {/* Central accent line */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-amber-600/60 rounded-full shadow-lg rotate-12" />
        </div>
      </div>

      {/* Decorative elements with mustard tones */}
      <div className="absolute top-4 left-1/4 w-2 h-2 bg-amber-600/40 rounded-full animate-pulse transform rotate-45" />
      <div className="absolute bottom-4 right-1/4 w-1 h-1 bg-yellow-700/60 rounded-full animate-pulse delay-1000 transform -rotate-45" />
      <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-amber-700/30 rounded-full animate-pulse delay-500" />
      <div className="absolute top-1/2 right-1/6 w-1.5 h-1.5 bg-yellow-600/30 rounded-full animate-pulse delay-700" />
    </div>
  )
}
