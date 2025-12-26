"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQSection({ dict }: { dict: any }) {
  return (
    <section className="py-24 bg-card relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 texture-grid opacity-20"></div>

      <div className="container mx-auto relative">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-accent text-sm uppercase tracking-widest font-medium mb-3 block">
            Perguntas Frequentes
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">{dict.title}</h2>
          <div className="h-1 w-20 bg-accent mx-auto mb-8"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-6">
            {dict.items.map((item: any, index: number) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-300 rounded-lg px-6 bg-white shadow-sm overflow-hidden group"
              >
                <AccordionTrigger className="text-lg font-medium py-5 text-left hover:text-primary transition-colors duration-300 group-data-[state=open]:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 pb-5 pt-2 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
