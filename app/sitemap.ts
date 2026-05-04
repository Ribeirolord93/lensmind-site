import type { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/shopify';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://lensmind.lat';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Pega produtos automaticamente — funciona em modo mock ou real
  const products = await getAllProducts(50);

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/productos/${p.handle}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...productEntries,
  ];
}
