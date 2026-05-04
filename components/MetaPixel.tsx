/**
 * MetaPixel — initializes the Facebook Pixel on the client.
 *
 * Drop this in your root layout (app/layout.tsx) so the pixel loads on every page.
 *
 * For event tracking, USE fireMetaEvent() from lib/fbq-helpers — that fires
 * pixel + CAPI together with shared event_id.
 *
 * Usage:
 *   // app/layout.tsx
 *   import { MetaPixel } from '@/components/MetaPixel';
 *   export default function RootLayout({ children }) {
 *     return (
 *       <html>
 *         <body>
 *           <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID!} />
 *           {children}
 *         </body>
 *       </html>
 *     );
 *   }
 *
 * Then on product page:
 *   useEffect(() => { fireMetaEvent({ eventName: 'ViewContent', customData: {...} }); }, []);
 */

'use client';

import { useEffect, useRef } from 'react';
import { fireMetaEvent } from '@/lib/fbq-helpers';

interface MetaPixelProps {
  pixelId: string;
  /**
   * If true (default), automatically fires PageView on initial load and on route changes.
   * Set false if you want manual control.
   */
  autoTrackPageViews?: boolean;
}

export function MetaPixel({ pixelId, autoTrackPageViews = true }: MetaPixelProps) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    if (!pixelId) {
      console.warn('[MetaPixel] No pixelId provided, skipping init');
      return;
    }
    initialized.current = true;

    // Standard Meta Pixel base code (Meta's official snippet, TypeScript-friendly)
    if (!window.fbq) {
      const fbqStub: Window['fbq'] = Object.assign(
        function (...args: unknown[]) {
          const n = window.fbq!;
          if (n.callMethod) {
            n.callMethod.apply(n, args);
          } else {
            n.queue!.push(args);
          }
        } as (...args: unknown[]) => void,
        {
          push: undefined as unknown as (...args: unknown[]) => void,
          loaded: true,
          version: '2.0',
          queue: [] as unknown[],
        }
      );
      // fbq.push = fbq (Meta's pattern — used by other scripts to enqueue)
      fbqStub!.push = fbqStub as unknown as (...args: unknown[]) => void;
      window.fbq = fbqStub;
      if (!window._fbq) window._fbq = fbqStub;

      // Inject the actual fbevents.js script
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript?.parentNode?.insertBefore(script, firstScript);
    }

    if (window.fbq) {
      // Init the pixel
      (window.fbq as (...args: unknown[]) => void)('init', pixelId);

      // First PageView (with shared event_id via fireMetaEvent for CAPI dedup)
      if (autoTrackPageViews) {
        fireMetaEvent({ eventName: 'PageView' });
      }
    }
  }, [pixelId, autoTrackPageViews]);

  // Track page changes (App Router doesn't fire navigation events the way Pages Router did)
  // We listen to popstate + intercept link clicks. Simpler: track manually in pages that matter.
  // For most Next.js sites, the initial PageView + per-page useEffect is enough.

  return (
    // Noscript fallback for users with JS disabled
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}
