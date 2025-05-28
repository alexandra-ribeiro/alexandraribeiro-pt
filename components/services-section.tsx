export default function ServicesSection({ dict }: { dict: any }) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <img
          src="/images/services/services-infographic.png"
          alt="Serviços - Como posso ajudar a sua empresa?"
          className="w-full max-w-5xl mx-auto h-auto"
        />

        <div className="text-center mt-12">
          <a
            href="/services"
            className="inline-block bg-blue-800 hover:bg-amber-500 text-white font-bold py-3 px-8 rounded-md transition-colors"
          >
            {dict.cta || "Ver todos os serviços"}
          </a>
        </div>
      </div>
    </section>
  )
}
