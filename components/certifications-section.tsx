import Image from "next/image"

export default function CertificationsSection({ dict }: { dict: any }) {
  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-700 dark:text-gray-200">
          {dict.title}
        </h2>

        <div className="flex justify-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/certifications%20logos-3q9BXeC3n0plRuEeY8w9shjnfnanOn.png"
            alt="Professional Certifications - Microsoft Certified, Shopify Partner, Técnico Lisboa, Etsy Top Seller, LDS E-Commerce Certification, Canva Certified"
            width={1200}
            height={400}
            className="w-full max-w-5xl h-auto"
            unoptimized
          />
        </div>
      </div>
    </section>
  )
}
