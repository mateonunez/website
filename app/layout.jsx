import '@/styles/global.css';
import '@/components/legacy/articles/mdx/code/dark.css';
import Loading from './loading';

import { MainLayout } from '@/components';
import { UIProvider } from '@/components/legacy/ui/ui-context';
import { Suspense } from 'react';
import meta from '@/lib/config/metadata.js';

export const metadata = meta;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="mateonunez" />
        <meta name="theme-color" content="#F59E0B" />
      </head>

      <body className="antialiased">
        <UIProvider>
          <MainLayout>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </MainLayout>
        </UIProvider>
      </body>
    </html>
  );
}
