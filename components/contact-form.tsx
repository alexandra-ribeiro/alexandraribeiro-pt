"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function ContactForm({ dict }: { dict: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorDetails, setErrorDetails] = useState<string | null>(null)

  // Create schema based on form requirements
  const formSchema = z.object({
    name: z.string().min(2, {
      message: dict.validation.nameRequired,
    }),
    email: z.string().email({
      message: dict.validation.emailInvalid,
    }),
    phone: z.string().optional(),
    services: z.array(z.string()).nonempty({
      message: dict.validation.serviceRequired,
    }),
    message: z.string().optional(),
  })

  // Initialize form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      services: [],
      message: "",
    },
  })

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setErrorDetails(null)

    // Send an email with form data
    fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        phone: values.phone || "Não informado",
        services: values.services.join(", "),
        message: values.message || "Sem mensagem",
        subject: "Nova mensagem website AV",
        recipient: "geral@alexandraribeiro.pt",
      }),
    })
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok) {
          console.error("Server returned error:", data)
          throw new Error(data.details || data.error || "Erro ao enviar mensagem")
        }
        return data
      })
      .then(() => {
        toast({
          title: dict.formSuccess.title,
          description: dict.formSuccess.message,
        })
        form.reset()
      })
      .catch((error) => {
        console.error("Error sending email:", error)
        setErrorDetails(error.message || "Unknown error occurred")
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao enviar sua mensagem. Por favor, verifique os detalhes abaixo.",
          variant: "destructive",
        })
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  const services = [
    { id: "virtual-assistance", label: dict.serviceOptions.virtualAssistance },
    { id: "crm-erp", label: dict.serviceOptions.crmErp },
    { id: "other", label: dict.serviceOptions.other },
  ]

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
      {errorDetails && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            <p>There was an error sending your message:</p>
            <p className="font-mono text-sm mt-2 p-2 bg-red-100 dark:bg-red-900 rounded">{errorDetails}</p>
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.form.name} *</FormLabel>
                <FormControl>
                  <Input placeholder={dict.form.namePlaceholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.form.email} *</FormLabel>
                <FormControl>
                  <Input placeholder={dict.form.emailPlaceholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.form.phone}</FormLabel>
                <FormControl>
                  <Input placeholder={dict.form.phonePlaceholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="services"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>{dict.form.services}</FormLabel>
                  <FormDescription>{dict.form.servicesDescription}</FormDescription>
                </div>
                {services.map((service) => (
                  <FormField
                    key={service.id}
                    control={form.control}
                    name="services"
                    render={({ field }) => {
                      return (
                        <FormItem key={service.id} className="flex flex-row items-start space-x-3 space-y-0 mb-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(service.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, service.id])
                                  : field.onChange(field.value?.filter((value) => value !== service.id))
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">{service.label}</FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.form.message}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={dict.form.messagePlaceholder}
                    className="resize-none min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white" disabled={isSubmitting}>
            {isSubmitting ? dict.form.submitting : dict.form.submit}
          </Button>
        </form>
      </Form>
    </div>
  )
}
