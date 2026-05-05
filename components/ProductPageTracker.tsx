'use client';

/**
 * ProductPageTracker — fires ViewContent + persists tracking IDs to Shopify cart.
 *
 * Drop this once on your product page (e.g. inside app/page.tsx).
 * It waits for marketing consent before firing.
 *
 * Usage:
 *   <ProductPageTracker
 *     contentId={product.id}
 *     contentName="Lensmind Edition 01"
 *     value={199}
 *     currency="USD"
 *   />
 */

import { useEffect, useRef, useState } from 'react';
import { fireMetaEvent, persistTrackingToShopifyCart } from '@/lib/fbq-helpers';

interface ProductPageTrackerProps {
  contentId: string;
  contentName: string;
  value: number;
  currency: string;
  /** Shopify cart ID, if available. If passed, also persists fbp/fbc/event_id to cart attributes. */
  cartId?: string;
}

type Consent = { necessary: boolean; analytics: boolean; marketing: boolean };

export default function ProductPageTracker({
  contentId,
  contentName,
  value,
  currency,
  cartId,
}: ProductPageTrackerProps) {
  const fired = useRef(false);
  const [consent, setConsent] = useState<Consent | null>(null);

  // Read consent from localStorage + listen for changes
  useEffect(() => {
    try {
      const stored = localStorage.getItem('lensmind-cookie-consent');
      if (stored) setConsent(JSON.parse(stored));
    } catch {
      /* private mode */
    }

    function onConsent(e: Event) {
      const detail = (e as CustomEvent<Consent>).detail;
      setConsent(detail);
    }

    window.addEventListener('lensmind:consent', onConsent);
    return () => window.removeEventListener('lensmind:consent', onConsent);
  }, []);

  // Fire ViewContent once consent is granted (and only once)
  useEffect(() => {
    if (fired.current) return;
    if (!consent?.marketing) return;

    fired.current = true;

    fireMetaEvent({
      eventName: 'ViewContent',
      customData: {
        content_ids: [contentId],
        content_name: contentName,
        content_type: 'product',
        value,
        currency,
      },
    });

    if (cartId) {
      persistTrackingToShopifyCart(cartId).catch(() => {
        /* non-blocking */
      });
    }
  }, [consent, contentId, contentName, value, currency, cartId]);

  return null;
}