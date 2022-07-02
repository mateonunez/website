import 'styles/global.css';
import 'styles/nprogress.css';
import 'components/articles/mdx/code/dark.css';

import React from 'react';

import { GTMProvider } from '@elgorditosalsero/react-gtm-hook';
import { Head, MainLayout } from 'components';
import { UIProvider } from 'components/ui/ui-context';

export default function App({ Component, pageProps }) {
  // Retrieves the layout
  const Layout = Component.Layout || (({ children }) => <MainLayout>{children}</MainLayout>);

  const gtmParams = { id: 'GTM-K6HX6PK' };

  return (
    <>
      {/* <React.StrictMode> */}
      <GTMProvider state={gtmParams}>
        <Head />
        <UIProvider>
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </UIProvider>
      </GTMProvider>
      {/* </React.StrictMode> */}
    </>
  );
}
