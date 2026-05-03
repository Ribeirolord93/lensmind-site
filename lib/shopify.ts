import {
  GET_PRODUCT_BY_HANDLE,
  GET_FIRST_PRODUCT,
  GET_ALL_PRODUCTS,
  CREATE_CART,
  ADD_TO_CART,
} from './queries';
import type { Product, Cart } from '@/types/shopify';

const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION || '2024-10';

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

type ShopifyResponse<T> = {
  data: T;
  errors?: { message: string }[];
};

async function shopifyFetch<T>({
  query,
  variables,
  cache = 'force-cache',
  tags,
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  tags?: string[];
}): Promise<T> {
  if (!domain || !token) {
    throw new Error(
      'Shopify env vars não configuradas. Defina SHOPIFY_STORE_DOMAIN e SHOPIFY_STOREFRONT_ACCESS_TOKEN.'
    );
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    next: tags ? { tags } : undefined,
  });

  if (!res.ok) {
    throw new Error(`Shopify request falhou: ${res.status} ${res.statusText}`);
  }

  const json: ShopifyResponse<T> = await res.json();

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join(', '));
  }

  return json.data;
}

// ===== PRODUCT =====

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<{ product: Product | null }>({
    query: GET_PRODUCT_BY_HANDLE,
    variables: { handle },
    tags: [`product:${handle}`],
  });
  return data.product;
}

export async function getFirstProduct(): Promise<Product | null> {
  const data = await shopifyFetch<{
    products: { edges: { node: Product }[] };
  }>({
    query: GET_FIRST_PRODUCT,
    tags: ['products'],
  });
  return data.products.edges[0]?.node ?? null;
}

export async function getAllProducts(first = 10): Promise<Product[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: Product }[] };
  }>({
    query: GET_ALL_PRODUCTS,
    variables: { first },
    tags: ['products'],
  });
  return data.products.edges.map((e) => e.node);
}

// ===== CART =====

export async function createCart(
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: { cart: Cart } }>({
    query: CREATE_CART,
    variables: { lines },
    cache: 'no-store',
  });
  return data.cartCreate.cart;
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: Cart } }>({
    query: ADD_TO_CART,
    variables: { cartId, lines },
    cache: 'no-store',
  });
  return data.cartLinesAdd.cart;
}

// ===== HELPERS =====

export function formatMoney(amount: string | number, currencyCode = 'USD'): string {
  const value = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
