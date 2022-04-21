import 'styles/global.css';
import 'styles/nprogress.css';
import 'components/articles/mdx/code/dark.css';

import React from 'react';

import Head from 'components/common/Head';
import MainLayout from 'components/layouts/main';

import { UIProvider } from 'components/ui/UIContext';
import { GTMProvider } from '@elgorditosalsero/react-gtm-hook';

export default function App({ Component, pageProps }) {
  // Retrieves the layout
  const Layout = Component.Layout || (({ children }) => <MainLayout>{children}</MainLayout>);

  const gtmParams = { id: 'GTM-K6HX6PK' };

  return (
    <>
      <React.StrictMode>
        <GTMProvider state={gtmParams}>
          <Head />
          <UIProvider>
            <Layout pageProps={pageProps}>
              <Component {...pageProps} />
            </Layout>
          </UIProvider>
        </GTMProvider>
      </React.StrictMode>
    </>
  );
}
