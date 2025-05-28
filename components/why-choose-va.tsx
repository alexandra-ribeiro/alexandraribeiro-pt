import type React from "react"

interface WhyChooseVAProps {
  dict: any // Replace 'any' with a more specific type if possible
}

const WhyChooseVA: React.FC<WhyChooseVAProps> = ({ dict }) => {
  return (
    <section className="why-choose-va">
      <h2>{dict.whyChooseVATitle}</h2>
      <p>{dict.whyChooseVADescription}</p>

      <div className="reasons">
        {/* Example reasons - replace with actual data */}
        <div className="reason">
          <h3>{dict.reason1Title}</h3>
          <p>{dict.reason1Description}</p>
        </div>
        <div className="reason">
          <h3>{dict.reason2Title}</h3>
          <p>{dict.reason2Description}</p>
        </div>
        <div className="reason">
          <h3>{dict.reason3Title}</h3>
          <p>{dict.reason3Description}</p>
        </div>
      </div>

      <button>{dict.cta}</button>
    </section>
  )
}

export default WhyChooseVA
