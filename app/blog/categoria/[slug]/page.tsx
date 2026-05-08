import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostCard from '@/components/blog/PostCard';
import { getAllPosts, getPostsByCategory, type BlogCategory } from '@/lib/blog';

interface PageProps {
  params: { slug: string };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lensmind.lat';

export const revalidate = 3600;

const VALID_CATEGORIES: BlogCategory[] = [
  'Tecnología',
  'Comparativas',
  'Guías',
  'Privacidad',
  'Casos de uso',
  'Tendencias',
];

function findCategory(slug: string): BlogCategory | null {
  const found = VALID_CATEGORIES.find(
    (c) => c.toLowerCase() === decodeURIComponent(slug).toLowerCase()
  );
  return found || null;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const categories = new Set(posts.map((p) => p.category.toLowerCase()));
  return Array.from(categories).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const category = findCategory(params.slug);
  if (!category) return { title: 'Categoría no encontrada' };
  return {
    title: `${category} — Blog Lensmind`,
    description: `Artículos de la categoría ${category} en el blog de Lensmind™.`,
    alternates: { canonical: `/blog/categoria/${params.slug}` },
  };
}

export default function CategoryPage({ params }: PageProps) {
  const category = findCategory(params.slug);
  if (!category) notFound();

  const posts = getPostsByCategory(category);

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
            <span className="text-bone-300">Categoría: {category}</span>
          </nav>

          <div className="max-w-3xl mb-12 md:mb-16">
            <p className="eyebrow mb-6">Categoría</p>
            <h1 className="display-heading text-display-lg text-bone text-balance mb-4">
              {category}
            </h1>
            <p className="text-bone-300 text-base md:text-lg">
              {posts.length} {posts.length === 1 ? 'artículo' : 'artículos'} en
              esta categoría.
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
              Aún no hay artículos en esta categoría.{' '}
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
