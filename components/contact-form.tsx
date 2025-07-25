"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface ContactFormProps {
  lang: string
}

export default function ContactForm({ lang }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: lang === "en" ? "Message sent!" : "Mensagem enviada!",
          description:
            lang === "en"
              ? "Thank you for your message. I'll get back to you soon."
              : "Obrigada pela sua mensagem. Entrarei em contacto em breve.",
        })
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast({
        title: lang === "en" ? "Error" : "Erro",
        description:
          lang === "en" ? "Failed to send message. Please try again." : "Falha ao enviar mensagem. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{lang === "en" ? "Send me a message" : "Envie-me uma mensagem"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              name="name"
              placeholder={lang === "en" ? "Your Name" : "O seu nome"}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Input
              type="email"
              name="email"
              placeholder={lang === "en" ? "Your Email" : "O seu email"}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Input
              type="text"
              name="subject"
              placeholder={lang === "en" ? "Subject" : "Assunto"}
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Textarea
              name="message"
              placeholder={lang === "en" ? "Your Message" : "A sua mensagem"}
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting
              ? lang === "en"
                ? "Sending..."
                : "Enviando..."
              : lang === "en"
                ? "Send Message"
                : "Enviar Mensagem"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
