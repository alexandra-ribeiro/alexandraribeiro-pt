import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

export default function Testimonials({ dict }: { dict: any }) {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with yellow color and texture */}
      <div className="absolute inset-0 bg-customGold/80 z-0"></div>
      <div className="absolute inset-0 texture-dots opacity-20 z-0"></div>

      <div className="container section relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          {/* Title with white background for better visibility */}
          <div className="bg-white py-6 px-8 rounded-lg shadow-md inline-block mb-4">
            <span className="text-accent text-sm uppercase tracking-widest font-medium mb-3 block">Depoimentos</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">{dict.title}</h2>
            <div className="h-1 w-20 bg-accent mx-auto"></div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          {dict.items.map((item: any, index: number) => (
            <Card key={index} className="bg-white border-border/20 shadow-lg mb-8 overflow-hidden hover-lift">
              <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
              <CardContent className="pt-8 pb-8 px-8">
                <div className="flex flex-col items-center text-center">
                  <Quote className="h-10 w-10 text-accent mb-6 opacity-50" />
                  <p className="text-xl italic mb-6 text-foreground/80 leading-relaxed">"{item.quote}"</p>
                  <div className="h-px w-16 bg-accent/30 mb-4"></div>
                  <p className="font-semibold text-primary">— {item.author}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
