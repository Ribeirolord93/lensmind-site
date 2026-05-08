import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostCard from '@/components/blog/PostCard';
import { getAllPosts, getCategoriesWithCount } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog Lensmind™ — Gafas inteligentes, IA y tecnología vestible',
  description:
    'Guías, comparativas y artículos sobre smart glasses, gafas con IA, traductores en tiempo real y el futuro de la tecnología vestible en LATAM.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog Lensmind™ — Smart glasses para LATAM',
    description:
      'El primer blog de gafas inteligentes en español. Guías, reseñas y análisis del mercado de smart glasses.',
    type: 'website',
  },
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://lensmind.lat';

// ISR — revalida a cada 1h pra refletir novos posts sem rebuild
export const revalidate = 3600;

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const otherPosts = posts.filter((p) => p.slug !== featuredPost?.slug);
  const categories = getCategoriesWithCount();

  // JSON-LD Blog schema
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog Lensmind',
    description:
      'Guías, comparativas y artículos sobre gafas inteligentes y tecnología wearable.',
    url: `${SITE_URL}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'Lensmind',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.svg`,
      },
    },
    blogPost: posts.slice(0, 10).map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.publishedAt,
      author: {
        '@type': 'Organization',
        name: p.author,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      <Header />
      <main className="bg-ink min-h-screen pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="container-padded">
          {/* Hero do blog */}
          <div className="max-w-4xl mb-12 md:mb-16">
            <p className="eyebrow mb-6">Blog Lensmind</p>
            <h1 className="display-heading text-display-lg text-bone text-balance mb-6">
              Smart glasses,
              <br />
              IA y futuro vestible.
            </h1>
            <p className="text-bone-300 text-base md:text-xl leading-relaxed max-w-2xl">
              Guías, comparativas y análisis sobre gafas inteligentes y la
              tecnología que está redefiniendo cómo usamos la cámara, el audio
              y la IA en LATAM.
            </p>
          </div>

          {/* Featured post */}
          {featuredPost && (
            <div className="mb-16 md:mb-20">
              <PostCard post={featuredPost} variant="featured" />
            </div>
          )}

          {/* Categorias filter */}
          {categories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-10 md:mb-12">
              <span className="text-[11px] tracking-[0.18em] uppercase text-smoke-500 mr-2">
                Categorías:
              </span>
              {categories.map((c) => (
                <Link
                  key={c.category}
                  href={`/blog/categoria/${encodeURIComponent(
                    c.category.toLowerCase()
                  )}`}
                  className="px-3 py-1.5 rounded-full text-xs border border-ink-700 hover:border-ember hover:text-ember text-bone-300 transition-colors"
                >
                  {c.category}
                  <span className="text-smoke-500 ml-1.5">({c.count})</span>
                </Link>
              ))}
            </div>
          )}

          {/* Grid de posts */}
          {otherPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {otherPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : posts.length === 1 ? (
            <p className="text-bone-300 text-center py-10">
              Más artículos pronto. Suscríbete a la newsletter para recibirlos
              primero.
            </p>
          ) : (
            <p className="text-smoke-400 text-center py-10">
              No hay artículos publicados aún.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
