"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewsletterPopup({ dict }: { dict: any }) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [email, setEmail] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Função para detectar exit intent
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Se o mouse sair pela parte superior da página e o usuário não interagiu ainda
      if (e.clientY <= 0 && !hasInteracted && !isOpen) {
        setIsOpen(true)
      }
    }

    // Função para detectar cliques em botões
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "BUTTON" || target.closest("button")) {
        setHasInteracted(true)
        if (timerRef.current) {
          clearTimeout(timerRef.current)
        }
      }
    }

    // Configurar timer para abrir popup após 12 segundos
    timerRef.current = setTimeout(() => {
      if (!hasInteracted && !isOpen) {
        setIsOpen(true)
      }
    }, 12000)

    // Adicionar event listeners
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("click", handleClick)

    // Cleanup
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("click", handleClick)
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [hasInteracted, isOpen])

  // Fechar popup quando clicar fora dele
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node) && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Add mailerlite integration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !isValidEmail(email)) {
      alert(dict.emailValidationError || "Por favor, insira um email válido")
      return
    }

    try {
      // This would be replaced by an actual API route in the final implementation
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setIsSuccess(true)
        // Don't close the popup yet, show the thank you message
        // setIsOpen(false)
        setHasInteracted(true)
        // You could add a success toast here
      } else {
        throw new Error("Failed to subscribe")
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error)
      // You could add an error toast here
    }
  }

  // Simple email validation function
  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card ref={popupRef} className="w-full max-w-md relative">
        <button
          onClick={() => {
            setIsOpen(false)
            setHasInteracted(true)
            setIsSuccess(false) // Reset success state when closing
          }}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        {isSuccess ? (
          // Thank you message
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-primary">{dict.thankYou.title}</CardTitle>
              <CardDescription>{dict.thankYou.message}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Button
                onClick={() => {
                  setIsOpen(false)
                  setIsSuccess(false)
                }}
                className="bg-primary hover:bg-primary/90"
              >
                OK
              </Button>
            </CardFooter>
          </>
        ) : (
          // Subscription form
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-primary">{dict.title}</CardTitle>
              <CardDescription>{dict.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <Input
                    type="email"
                    placeholder={dict.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full"
                  />
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    {dict.buttonText}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="text-center text-sm text-gray-500">
              <p>{dict.privacyText}</p>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  )
}
