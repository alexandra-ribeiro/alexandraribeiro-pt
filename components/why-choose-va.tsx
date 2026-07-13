import type React from "react"

interface WhyChooseVAProps {
  dict: {
    sectionLabel: string
    title: string
    description: string
    benefits: {
      title: string
      description: string
    }[]
  }
}

const WhyChooseVA: React.FC<WhyChooseVAProps> = ({ dict }) => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="text-accent text-sm uppercase tracking-widest font-medium mb-3 block">
            {dict.sectionLabel}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">{dict.title}</h2>
          <p className="text-lg text-foreground/70">{dict.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dict.benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-primary mb-2">{benefit.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseVA
