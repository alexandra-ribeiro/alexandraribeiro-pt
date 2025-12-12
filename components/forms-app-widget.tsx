"use client"

import { useEffect } from "react"

export function FormsAppWidget() {
  useEffect(() => {
    // Create and inject the script tag
    const script = document.createElement("script")
    script.src = "https://forms.app/cdn/embed.js"
    script.type = "text/javascript"
    script.async = true
    script.defer = true

    script.onload = () => {
      // Initialize forms.app widget after script loads
      // @ts-ignore
      if (typeof window.formsapp !== "undefined") {
        // @ts-ignore
        new window.formsapp(
          "693b050c300c3b00029d0dd0",
          "sidetab",
          {
            button: { color: "#e6c330", text: "Faça o teste aqui!" },
            align: { horizontal: "right", vertical: "middle" },
            width: "400px",
            height: "600px",
          },
          "https://duqur798.forms.app",
        )
      }
    }

    document.body.appendChild(script)

    // Cleanup function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return null
}
