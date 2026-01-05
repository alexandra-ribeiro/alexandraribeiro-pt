import { AlertCircle, RefreshCw, Settings, Zap } from "lucide-react"

interface PainPointsSectionProps {
  dict: {
    title: string
    intro: string
    cards: {
      title: string
      description: string
    }[]
    closing: string
  }
}

export default function PainPointsSection({ dict }: PainPointsSectionProps) {
  const icons = [Settings, RefreshCw, AlertCircle, Zap]

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-6">{dict.title}</h2>

        {/* Intro paragraph */}
        <p className="text-lg text-foreground/70 text-center max-w-3xl mx-auto mb-12">{dict.intro}</p>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {dict.cards.map((card, index) => {
            const Icon = icons[index]
            return (
              <div
                key={index}
                className="bg-background border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{card.title}</h3>
                    <p className="text-foreground/70 leading-relaxed">{card.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Closing line */}
        <p className="text-lg text-foreground/80 text-center font-medium max-w-3xl mx-auto">{dict.closing}</p>
      </div>
    </section>
  )
}
