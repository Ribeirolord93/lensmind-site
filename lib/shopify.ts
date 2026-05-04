import {
  GET_PRODUCT_BY_HANDLE,
  GET_FIRST_PRODUCT,
  GET_ALL_PRODUCTS,
  CREATE_CART,
  ADD_TO_CART,
} from './queries';
import { MOCK_PRODUCT, isShopifyConfigured } from './mock-product';
import type { Product, Cart } from '@/types/shopify';

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION || '2024-10';

const endpoint = domain
  ? `https://${domain}/api/${apiVersion}/graphql.json`
  : '';

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
  if (!isShopifyConfigured()) {
    throw new Error('NOT_CONFIGURED');
  }

  // Detecta automaticamente o tipo de token e usa o header correto:
  // - Tokens privados do Headless channel começam com `shpat_` → header `Shopify-Storefront-Private-Token`
  // - Tokens públicos (32 chars hex) → header `X-Shopify-Storefront-Access-Token`
  // Doc: https://shopify.dev/docs/api/usage/authentication
  const isPrivateToken = token!.startsWith('shpat_');
  const authHeader: Record<string, string> = isPrivateToken
    ? { 'Shopify-Storefront-Private-Token': token! }
    : { 'X-Shopify-Storefront-Access-Token': token! };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader,
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
// Estratégia: tenta a API real. Se falhar (não configurado, erro), retorna o mock.
// Assim o site funciona ANTES e DEPOIS de configurar Shopify.

export async function getProductByHandle(
  handle: string
): Promise<Product | null> {
  if (!isShopifyConfigured()) {
    console.log('[Lensmind] Modo mock — Shopify Storefront API não configurada');
    return MOCK_PRODUCT;
  }

  try {
    const data = await shopifyFetch<{ product: Product | null }>({
      query: GET_PRODUCT_BY_HANDLE,
      variables: { handle },
      tags: [`product:${handle}`],
    });
    return data.product || MOCK_PRODUCT;
  } catch (err) {
    console.warn('[Lensmind] Erro ao buscar produto, usando mock:', err);
    return MOCK_PRODUCT;
  }
}

export async function getFirstProduct(): Promise<Product | null> {
  if (!isShopifyConfigured()) {
    console.log('[Lensmind] Modo mock — Shopify Storefront API não configurada');
    return MOCK_PRODUCT;
  }

  try {
    const data = await shopifyFetch<{
      products: { edges: { node: Product }[] };
    }>({
      query: GET_FIRST_PRODUCT,
      tags: ['products'],
    });
    return data.products.edges[0]?.node ?? MOCK_PRODUCT;
  } catch (err) {
    console.warn('[Lensmind] Erro ao buscar produto, usando mock:', err);
    return MOCK_PRODUCT;
  }
}

export async function getAllProducts(first = 10): Promise<Product[]> {
  if (!isShopifyConfigured()) {
    return [MOCK_PRODUCT];
  }

  try {
    const data = await shopifyFetch<{
      products: { edges: { node: Product }[] };
    }>({
      query: GET_ALL_PRODUCTS,
      variables: { first },
      tags: ['products'],
    });
    return data.products.edges.map((e) => e.node);
  } catch (err) {
    console.warn('[Lensmind] Erro ao buscar produtos, usando mock:', err);
    return [MOCK_PRODUCT];
  }
}

// ===== CART =====

export async function createCart(
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  if (!isShopifyConfigured()) {
    throw new Error('CHECKOUT_NOT_AVAILABLE');
  }

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

export function formatMoney(
  amount: string | number,
  currencyCode = 'USD'
): string {
  const value = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export { isShopifyConfigured };
