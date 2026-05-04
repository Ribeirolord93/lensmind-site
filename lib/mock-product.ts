import type { Product } from '@/types/shopify';

// Mock product — usado quando Shopify Storefront API não está configurada
// ou quando a API retorna erro. Substituido pelo produto real automaticamente
// assim que SHOPIFY_STOREFRONT_ACCESS_TOKEN for configurado corretamente.

export const MOCK_PRODUCT: Product = {
  id: 'gid://shopify/Product/mock-lensmind-01',
  handle: 'gafas-inteligentes-ia-lensmind',
  title:
    'Lensmind™ Gafas Inteligentes con IA — Cámara 1080p, Audio Manos Libres y Traductor en Tiempo Real',
  description:
    'Gafas inteligentes con cámara Sony 1080p, asistente de IA por voz, traductor en 40 idiomas y audio direccional. Toda la tecnología del Ray-Ban Meta por menos de la mitad del precio.',
  descriptionHtml: '',
  vendor: 'Lensmind',
  productType: 'Smart Glasses',
  tags: ['smart-glasses', 'ai', 'lensmind', 'tech', 'wearable'],
  availableForSale: true,
  totalInventory: 6181,
  options: [
    {
      id: 'gid://shopify/ProductOption/mock-color',
      name: 'Color',
      values: ['Negro Mate'],
    },
  ],
  priceRange: {
    minVariantPrice: { amount: '199.00', currencyCode: 'USD' },
    maxVariantPrice: { amount: '199.00', currencyCode: 'USD' },
  },
  compareAtPriceRange: {
    minVariantPrice: { amount: '329.00', currencyCode: 'USD' },
    maxVariantPrice: { amount: '329.00', currencyCode: 'USD' },
  },
  images: {
    edges: [
      {
        node: {
          url: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=1200&q=80&auto=format&fit=crop',
          altText: 'Lensmind Smart Glasses — vista frontal',
          width: 1200,
          height: 1500,
        },
      },
      {
        node: {
          url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1200&q=80&auto=format&fit=crop',
          altText: 'Lensmind Smart Glasses — perfil',
          width: 1200,
          height: 1500,
        },
      },
      {
        node: {
          url: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=1200&q=80&auto=format&fit=crop',
          altText: 'Lensmind Smart Glasses — lifestyle',
          width: 1200,
          height: 1500,
        },
      },
      {
        node: {
          url: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=1200&q=80&auto=format&fit=crop',
          altText: 'Lensmind Smart Glasses — detalle',
          width: 1200,
          height: 1500,
        },
      },
      {
        node: {
          url: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1200&q=80&auto=format&fit=crop',
          altText: 'Lensmind Smart Glasses — packaging',
          width: 1200,
          height: 1500,
        },
      },
      {
        node: {
          url: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&q=80&auto=format&fit=crop',
          altText: 'Lensmind Smart Glasses — uso diario',
          width: 1200,
          height: 1500,
        },
      },
    ],
  },
  variants: {
    edges: [
      {
        node: {
          id: 'gid://shopify/ProductVariant/mock-variant-01',
          title: 'Negro Mate',
          availableForSale: true,
          quantityAvailable: 6181,
          price: { amount: '199.00', currencyCode: 'USD' },
          compareAtPrice: { amount: '329.00', currencyCode: 'USD' },
          selectedOptions: [{ name: 'Color', value: 'Negro Mate' }],
          image: {
            url: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=1200&q=80&auto=format&fit=crop',
            altText: 'Lensmind Smart Glasses',
            width: 1200,
            height: 1500,
          },
        },
      },
    ],
  },
  seo: {
    title: 'Lensmind™ Gafas Inteligentes con IA',
    description:
      'Gafas con IA, cámara 1080p y traductor en tiempo real por $199 USD',
  },
  featuredImage: {
    url: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=1200&q=80&auto=format&fit=crop',
    altText: 'Lensmind Smart Glasses',
    width: 1200,
    height: 1500,
  },
};

// Detector — true quando Shopify NÃO está configurado, ou usando placeholder
export function isShopifyConfigured(): boolean {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !token) return false;
  if (
    token === 'your_storefront_access_token_here' ||
    token === 'shpat_placeholder' ||
    token === 'mock' ||
    token.length < 20
  ) {
    return false;
  }

  return true;
}
