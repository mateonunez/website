'use client';

import { GTMProvider } from '@elgorditosalsero/react-gtm-hook';
import { Analytics } from '@vercel/analytics/react';

export default function AnalyticsWrapper() {
  const gtmParams = { id: 'GTM-K6HX6PK' };

  return (
    <>
      <GTMProvider state={gtmParams}>
        <Analytics />
      </GTMProvider>
    </>
  );
}
