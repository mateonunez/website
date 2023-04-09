import 'styles/global.css';
import 'styles/nprogress.css';
import 'components/articles/mdx/code/dark.css';
import Loading from './loading';

import { MainLayout, UIProvider } from 'components';
import { Suspense } from 'react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <DefaultSeo {...seo} /> */}
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
