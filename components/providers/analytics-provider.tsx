'use client';

import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import type { JSX, ReactNode } from 'react';
import { useId } from 'react';

interface AnalyticsWrapperProps {
  children: ReactNode;
}

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export function AnalyticsProvider({ children }: AnalyticsWrapperProps): JSX.Element {
  const gtmScriptId = useId();
  return (
    <>
      {gtmId && (
          <Script id={`gtm-init-${gtmScriptId}`} strategy="lazyOnload">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
      )}
      {children}
      <Analytics />
    </>
  );
}
