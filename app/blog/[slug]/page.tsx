import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MDXRenderer from '@/components/blog/MDXRenderer';
import PostCard from '@/components/blog/PostCard';
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from '@/lib/blog';

interface PageProps {
  params: { slug: string };
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://lensmind.lat';

// ISR
export const revalidate = 3600;

// Static paths pra todos os posts (gera SSG)
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

// SEO dinâmico por post
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Artículo no encontrado',
    };
  }

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: post.coverImage.startsWith('http')
            ? post.coverImage
            : `${SITE_URL}${post.coverImage}`,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(post.slug, post.category, post.tags, 3);

  const dateFormatted = new Date(post.publishedAt).toLocaleDateString(
    'es-MX',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );

  // JSON-LD BlogPosting schema
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: [
      post.coverImage.startsWith('http')
        ? post.coverImage
        : `${SITE_URL}${post.coverImage}`,
    ],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lensmind',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
  };

  // Breadcrumb schema
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Header />
      <main className="bg-ink min-h-screen pt-28 md:pt-36">
        <article className="container-padded">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex items-center gap-2 text-xs text-smoke-500"
            >
              <Link href="/" className="hover:text-bone transition-colors">
                Inicio
              </Link>
              <span aria-hidden>/</span>
              <Link
                href="/blog"
                className="hover:text-bone transition-colors"
              >
                Blog
              </Link>
              <span aria-hidden>/</span>
              <span className="text-bone-300 truncate max-w-[200px]">
                {post.title}
              </span>
            </nav>

            {/* Header do post */}
            <header className="mb-10 md:mb-14">
              <div className="flex items-center gap-3 mb-6 text-xs">
                <Link
                  href={`/blog/categoria/${encodeURIComponent(
                    post.category.toLowerCase()
                  )}`}
                  className="px-3 py-1 rounded-full bg-ember/15 text-ember font-semibold tracking-wider uppercase hover:bg-ember/25 transition-colors"
                >
                  {post.category}
                </Link>
              </div>

              <h1 className="display-heading text-3xl md:text-5xl lg:text-6xl text-bone tracking-tight leading-[1.05] mb-6 text-balance">
                {post.title}
              </h1>

              <p className="text-bone-300 text-lg md:text-xl leading-relaxed mb-8">
                {post.description}
              </p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-smoke-400 pb-8 border-b border-ink-700">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <time dateTime={post.publishedAt}>{dateFormatted}</time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{post.readingMinutes} min de lectura</span>
                </div>
                <div className="text-smoke-500">
                  Por <span className="text-bone-300">{post.author}</span>
                </div>
              </div>
            </header>

            {/* Cover image */}
            {post.coverImage && (
              <div className="relative aspect-[16/9] md:aspect-[2/1] rounded-2xl overflow-hidden bg-ink-900 mb-10 md:mb-14">
                <Image
                  src={post.coverImage}
                  alt={post.coverImageAlt}
                  fill
                  priority
                  quality={85}
                  sizes="(min-width: 1024px) 768px, 100vw"
                  className="object-cover"
                />
              </div>
            )}

            {/* Conteúdo MDX */}
            <div className="prose prose-invert prose-lg max-w-none prose-lensmind">
              <MDXRenderer source={post.content} />
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-ink-700">
                <p className="eyebrow mb-4">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${encodeURIComponent(
                        tag.toLowerCase()
                      )}`}
                      className="px-3 py-1.5 rounded-full text-xs border border-ink-700 hover:border-ember hover:text-ember text-bone-300 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Volver al blog */}
            <div className="mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-smoke-400 hover:text-bone transition-colors"
              >
                <ArrowLeft size={14} />
                <span>Volver al blog</span>
              </Link>
            </div>
          </div>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="container-padded mt-20 md:mt-28 pb-20 md:pb-28 border-t border-ink-700 pt-16 md:pt-20">
            <div className="max-w-6xl mx-auto">
              <p className="eyebrow mb-6">Sigue leyendo</p>
              <h2 className="display-heading text-2xl md:text-3xl lg:text-4xl text-bone tracking-tight mb-10 md:mb-14">
                Artículos relacionados.
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {related.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
