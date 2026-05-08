import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import Link from 'next/link';
import ProductCTA from './ProductCTA';
import KeyTakeaways from './KeyTakeaways';
import ComparisonInline from './ComparisonInline';
import Callout from './Callout';

/**
 * MDXRenderer — renderiza o conteúdo MDX do post com componentes customizados
 * disponíveis dentro do markdown (sem precisar import).
 *
 * Componentes disponíveis nos MDX:
 *   - <ProductCTA />, <ProductCTA variant="compact" />
 *   - <KeyTakeaways items={[...]} />
 *   - <ComparisonInline headers={[]} rows={[]} />
 *   - <Callout type="tip|info|warning|danger">...</Callout>
 */

const components = {
  ProductCTA,
  KeyTakeaways,
  ComparisonInline,
  Callout,

  // Image otimizada — quando usar ![alt](src) no MDX, vira <Image> do Next
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const { src = '', alt = '' } = props;
    if (typeof src !== 'string') return null;

    // Imagens externas (http/https) — usar img normal
    if (src.startsWith('http')) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="rounded-2xl my-8 w-full"
          loading="lazy"
        />
      );
    }

    // Imagens internas — Next Image otimizada
    return (
      <span className="block relative my-8 rounded-2xl overflow-hidden bg-ink-900 aspect-video">
        <Image
          src={src}
          alt={alt}
          fill
          quality={82}
          sizes="(min-width: 768px) 720px, 100vw"
          className="object-cover"
        />
      </span>
    );
  },

  // Links internos do Next (sem reload)
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const { href = '', children, ...rest } = props;
    if (href.startsWith('/') || href.startsWith('#')) {
      return (
        <Link href={href} {...rest}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  },
};

interface MDXRendererProps {
  source: string;
}

export default function MDXRenderer({ source }: MDXRendererProps) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                behavior: 'wrap',
                properties: {
                  className: ['anchor-heading'],
                },
              },
            ],
          ],
        },
      }}
    />
  );
}
