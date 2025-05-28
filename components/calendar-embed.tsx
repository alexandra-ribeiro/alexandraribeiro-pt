"use client"

import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface CalendarEmbedProps {
  dict: any
  calendlyUrl?: string
}

export default function CalendarEmbed({
  dict,
  calendlyUrl = "https://calendly.com/geral-alexandraribeiro-av/discovery-call-15min",
}: CalendarEmbedProps) {
  useEffect(() => {
    // Carrega o script do Calendly quando o componente é montado
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Remove o script quando o componente é desmontado
      try {
        document.body.removeChild(script)
      } catch (e) {
        // Script já pode ter sido removido
      }
    }
  }, [])

  return (
    <Card className="border-none shadow-md overflow-hidden">
      <CardContent className="p-0">
        <div
          className="calendly-inline-widget"
          data-url={calendlyUrl}
          style={{
            minWidth: "320px",
            height: "630px",
          }}
        />
      </CardContent>
    </Card>
  )
}
