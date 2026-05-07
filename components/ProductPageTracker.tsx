'use client';

/**
 * ProductPageTracker — fires ViewContent once consent is granted.
 *
 * Drop this once on your product page (e.g. inside app/page.tsx).
 * It reads cookie consent from localStorage and waits for marketing consent
 * before firing. The pixel + CAPI events share the same event_id (handled
 * by fireMetaEvent internally) so Meta deduplicates browser + server hits.
 *
 * Usage:
 *   <ProductPageTracker
 *     contentId={product.id}
 *     contentName="Lensmind Edition 01"
 *     value={149.99}
 *     currency="USD"
 *   />
 */

import { useEffect, useRef, useState } from 'react';
import { fireMetaEvent } from '@/lib/fbq-helpers';

interface ProductPageTrackerProps {
  contentId: string;
  contentName: string;
  value: number;
  currency: string;
}

type Consent = { necessary: boolean; analytics: boolean; marketing: boolean };

export default function ProductPageTracker({
  contentId,
  contentName,
  value,
  currency,
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
        contentIds: [contentId],
        contentName,
        contentType: 'product',
        value,
        currency,
      },
    });
  }, [consent, contentId, contentName, value, currency]);

  return null;
}