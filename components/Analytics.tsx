'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { useState } from 'react';

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

type Consent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export default function Analytics() {
  const [consent, setConsent] = useState<Consent | null>(null);

  useEffect(() => {
    // Read existing consent from localStorage
    try {
      const stored = localStorage.getItem('lensmind-cookie-consent');
      if (stored) setConsent(JSON.parse(stored));
    } catch {
      /* private mode */
    }

    // Listen for consent changes
    function onConsent(e: Event) {
      const detail = (e as CustomEvent<Consent>).detail;
      setConsent(detail);
    }

    window.addEventListener('lensmind:consent', onConsent);
    return () => window.removeEventListener('lensmind:consent', onConsent);
  }, []);

  return (
    <>
      {/* GA4 — only loaded if analytics consent + ID is configured */}
      {GA4_ID && consent?.analytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA4_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {/* Meta Pixel — only loaded if marketing consent + ID is configured */}
      {META_PIXEL_ID && consent?.marketing && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
