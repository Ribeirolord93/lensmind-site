import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // ISO date
  updatedAt?: string;
  author: string;
  category: BlogCategory;
  tags: string[];
  coverImage: string;
  coverImageAlt: string;
  readingMinutes: number;
  funnel: 'top' | 'mid' | 'bottom';
  featured?: boolean;
}

export interface PostFull extends PostMeta {
  content: string; // raw MDX
}

export type BlogCategory =
  | 'Tecnología'
  | 'Comparativas'
  | 'Guías'
  | 'Privacidad'
  | 'Casos de uso'
  | 'Tendencias';

/**
 * Lista todos os posts com metadata (não carrega o body MDX).
 * Ordenado por data de publicação descendente (mais recente primeiro).
 */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const filePath = path.join(BLOG_DIR, filename);
    const source = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(source);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title,
      description: data.description,
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt,
      author: data.author || 'Equipo Lensmind',
      category: data.category,
      tags: data.tags || [],
      coverImage: data.coverImage,
      coverImageAlt: data.coverImageAlt || data.title,
      readingMinutes: Math.ceil(stats.minutes),
      funnel: data.funnel || 'top',
      featured: data.featured || false,
    } as PostMeta;
  });

  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Carrega um post específico por slug (com conteúdo MDX completo).
 */
export function getPostBySlug(slug: string): PostFull | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(source);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title,
    description: data.description,
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt,
    author: data.author || 'Equipo Lensmind',
    category: data.category,
    tags: data.tags || [],
    coverImage: data.coverImage,
    coverImageAlt: data.coverImageAlt || data.title,
    readingMinutes: Math.ceil(stats.minutes),
    funnel: data.funnel || 'top',
    featured: data.featured || false,
    content,
  };
}

/**
 * Posts relacionados — match por categoria + tags em comum.
 * Retorna até 3 posts mais relevantes, excluindo o atual.
 */
export function getRelatedPosts(
  currentSlug: string,
  category: BlogCategory,
  tags: string[],
  limit = 3
): PostMeta[] {
  const all = getAllPosts().filter((p) => p.slug !== currentSlug);

  // Score: 3 pontos pela categoria igual + 1 ponto por tag em comum
  const scored = all.map((post) => {
    let score = 0;
    if (post.category === category) score += 3;
    score += post.tags.filter((t) => tags.includes(t)).length;
    return { post, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post);
}

/**
 * Posts por categoria.
 */
export function getPostsByCategory(category: BlogCategory): PostMeta[] {
  return getAllPosts().filter((p) => p.category === category);
}

/**
 * Posts por tag.
 */
export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((p) =>
    p.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

/**
 * Lista única de todas as tags usadas.
 */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllPosts().forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

/**
 * Lista única de categorias com contagem.
 */
export function getCategoriesWithCount(): { category: BlogCategory; count: number }[] {
  const map = new Map<BlogCategory, number>();
  getAllPosts().forEach((p) => {
    map.set(p.category, (map.get(p.category) || 0) + 1);
  });
  return Array.from(map.entries()).map(([category, count]) => ({
    category,
    count,
  }));
}
