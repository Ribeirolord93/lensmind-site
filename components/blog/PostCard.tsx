import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';
import type { PostMeta } from '@/lib/blog';

interface PostCardProps {
  post: PostMeta;
  variant?: 'default' | 'featured' | 'compact';
}

export default function PostCard({ post, variant = 'default' }: PostCardProps) {
  const dateFormatted = new Date(post.publishedAt).toLocaleDateString(
    'es-MX',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );

  if (variant === 'featured') {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group block relative overflow-hidden rounded-3xl bg-ink-900 border border-ink-700 hover:border-ink-600 transition-colors duration-300"
      >
        <div className="relative aspect-[16/9] md:aspect-[2/1]">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt}
            fill
            quality={82}
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="flex items-center gap-3 mb-4 text-xs">
              <span className="px-3 py-1 rounded-full bg-ember/15 text-ember font-semibold tracking-wider uppercase">
                {post.category}
              </span>
              <span className="text-smoke-400 flex items-center gap-1.5">
                <Clock size={12} />
                {post.readingMinutes} min de lectura
              </span>
            </div>
            <h2 className="display-heading text-2xl md:text-4xl text-bone tracking-tight mb-3 text-balance">
              {post.title}
            </h2>
            <p className="text-bone-300 text-sm md:text-base leading-relaxed max-w-2xl line-clamp-2">
              {post.description}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group flex items-start gap-4 p-3 -m-3 rounded-xl hover:bg-ink-900 transition-colors duration-300"
      >
        <div className="relative aspect-square w-20 md:w-24 rounded-lg overflow-hidden bg-ink-900 flex-shrink-0">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt}
            fill
            quality={70}
            sizes="100px"
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] tracking-[0.18em] uppercase text-ember font-semibold mb-1.5">
            {post.category}
          </p>
          <h3 className="text-bone text-sm md:text-base font-semibold tracking-tight leading-snug mb-1.5 line-clamp-2 group-hover:text-bone-300 transition-colors">
            {post.title}
          </h3>
          <p className="text-smoke-400 text-xs flex items-center gap-1.5">
            <Clock size={11} />
            {post.readingMinutes} min
          </p>
        </div>
      </Link>
    );
  }

  // Default
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-ink-900 border border-ink-700 hover:border-ink-600 rounded-2xl overflow-hidden transition-colors duration-300"
    >
      <div className="relative aspect-[16/10] bg-ink-800">
        <Image
          src={post.coverImage}
          alt={post.coverImageAlt}
          fill
          quality={78}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5 md:p-6">
        <div className="flex items-center gap-2.5 mb-3 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-ember/10 text-ember font-semibold tracking-wider uppercase text-[10px]">
            {post.category}
          </span>
          <span className="text-smoke-500 flex items-center gap-1.5">
            <Clock size={11} />
            {post.readingMinutes} min
          </span>
        </div>
        <h3 className="text-bone text-lg md:text-xl font-semibold tracking-tight leading-snug mb-3 line-clamp-2 group-hover:text-bone-300 transition-colors">
          {post.title}
        </h3>
        <p className="text-bone-300 text-sm leading-relaxed line-clamp-2 mb-4">
          {post.description}
        </p>
        <div className="flex items-center justify-between text-xs text-smoke-500">
          <span>{dateFormatted}</span>
          <span className="flex items-center gap-1 text-bone-300 group-hover:text-ember transition-colors">
            Leer
            <ArrowRight
              size={12}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
