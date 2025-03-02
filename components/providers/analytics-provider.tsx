'use client';

import { GTMProvider } from '@elgorditosalsero/react-gtm-hook';
import { Analytics } from '@vercel/analytics/react';
import type { JSX, ReactNode } from 'react';

interface AnalyticsWrapperProps {
  children: ReactNode;
}

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export function AnalyticsProvider({ children }: AnalyticsWrapperProps): JSX.Element {
  if (!gtmId) {
    return <>{children}</>;
  }

  const gtmParams = { id: gtmId };

  return (
    <>
      <GTMProvider state={gtmParams}>{children}</GTMProvider>
      <Analytics />
    </>
  );
}
