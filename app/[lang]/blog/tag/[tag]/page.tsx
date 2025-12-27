import Script from "next/script"

export default async function BlogTagPage({
  params,
}: {
  params: { lang: string; tag: string }
}) {
  const lang = params.lang === "en" ? "en" : "pt"
  const dict = await getDictionary(params.lang)

  const tagId = params.tag
  const tagLabel = decodeURIComponent(params.tag)

  //const tagSeo = await getTagSeo(tagId, lang)
  const posts = await getPostsByTag(tagId, params.lang)

  // só 404 se não existir SEO da tag E não houver posts
  if (!tagSeo && posts.length === 0) notFound()

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Blog",
        item: `${BASE_URL}/${params.lang}/blog`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: tagLabel,
        item: `${BASE_URL}/${params.lang}/blog/tag/${params.tag}`,
      },
    ],
  }

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name:
      lang === "pt"
        ? `Artigos sobre ${tagLabel}`
        : `Articles about ${tagLabel}`,
    description:
      lang === "pt"
        ? `Coleção de artigos e guias sobre ${tagLabel}.`
        : `A collection of articles and guides about ${tagLabel}.`,
    url: `${BASE_URL}/${params.lang}/blog/tag/${params.tag}`,
  }

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${BASE_URL}/${params.lang}/blog/${post.fields.slug}`,
      name: post.fields.title,
    })),
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader dict={dict} />

      {/* Schema.org */}
      <script
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="container py-16 md:py-24 max-w-5xl mx-auto">
        {/* HEADER */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {lang === "pt"
              ? `Artigos sobre ${tagLabel}`
              : `Articles about ${tagLabel}`}
          </h1>

          {/* TEXTO SEO INTRO */}
          {tagSeo?.fields?.introText ? (
            <p className="text-lg text-gray-600">
              {tagSeo.fields.introText}
            </p>
          ) : (
            <p className="text-lg text-gray-600">
              {lang === "pt"
                ? `Aqui encontras artigos práticos e guias sobre ${tagLabel}, pensados para empreendedores e freelancers em Portugal.`
                : `Here you'll find practical articles and guides about ${tagLabel}.`}
            </p>
          )}
        </header>

        {/* LISTA DE ARTIGOS */}
        <section className="grid gap-10">
          {posts.map((post: BlogPost) => (
            <article
              key={post.sys.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              {post.fields.featuredImage && (
                <div className="relative h-56 w-full">
                  <Image
                    src={getImageUrl(post.fields.featuredImage)}
                    alt={post.fields.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}

              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">
                  <Link
                    href={`/${params.lang}/blog/${post.fields.slug}`}
                    className="hover:text-accent"
                  >
                    {post.fields.title}
                  </Link>
                </h2>

                <p className="text-gray-600 mb-4">
                  {post.fields.description}
                </p>

                <Link
                  href={`/${params.lang}/blog/${post.fields.slug}`}
                  className="text-primary font-medium"
                >
                  {lang === "pt" ? "Ler artigo →" : "Read article →"}
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* TEXTO SEO FINAL */}
        {tagSeo?.fields?.bottomText && (
          <div className="mt-16 text-gray-700">
            <p>{tagSeo.fields.bottomText}</p>
          </div>
        )}
      </div>

      <Footer dict={dict.footer} />
    </main>
  )
}
