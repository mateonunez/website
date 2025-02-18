'use client';

import { GTMProvider } from '@elgorditosalsero/react-gtm-hook';
import { Analytics } from '@vercel/analytics/react';
import type { JSX } from 'react';

export default function AnalyticsWrapper(): JSX.Element {
  const gtmParams = { id: 'GTM-K6HX6PK' };

  return (
    <>
      <GTMProvider state={gtmParams}>
        <Analytics />
      </GTMProvider>
    </>
  );
}
