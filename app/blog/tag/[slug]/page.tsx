import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostCard from '@/components/blog/PostCard';
import { getAllPosts, getPostsByTag, getAllTags } from '@/lib/blog';

interface PageProps {
  params: { slug: string };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ slug: tag.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const tag = decodeURIComponent(params.slug);
  return {
    title: `#${tag} — Blog Lensmind`,
    description: `Artículos etiquetados con ${tag} en el blog de Lensmind™.`,
    alternates: { canonical: `/blog/tag/${params.slug}` },
  };
}

export default function TagPage({ params }: PageProps) {
  const tag = decodeURIComponent(params.slug);
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    // Tag não existe ou vazia — mas mostramos página com mensagem ao invés de 404
    // (pode ser que a tag exista em post não publicado ainda)
    const allTags = getAllTags();
    const tagExists = allTags.some((t) => t.toLowerCase() === tag.toLowerCase());
    if (!tagExists) notFound();
  }

  return (
    <>
      <Header />
      <main className="bg-ink min-h-screen pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="container-padded">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 text-xs text-smoke-500"
          >
            <Link href="/" className="hover:text-bone transition-colors">
              Inicio
            </Link>
            <span aria-hidden>/</span>
            <Link href="/blog" className="hover:text-bone transition-colors">
              Blog
            </Link>
            <span aria-hidden>/</span>
            <span className="text-bone-300">Tag: {tag}</span>
          </nav>

          <div className="max-w-3xl mb-12 md:mb-16">
            <p className="eyebrow mb-6">Tag</p>
            <h1 className="display-heading text-display-lg text-bone text-balance mb-4">
              #{tag}
            </h1>
            <p className="text-bone-300 text-base md:text-lg">
              {posts.length} {posts.length === 1 ? 'artículo' : 'artículos'}{' '}
              etiquetados.
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-smoke-400 py-10">
              No hay artículos con este tag aún.{' '}
              <Link href="/blog" className="text-ember hover:text-ember-400">
                Volver al blog
              </Link>
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
