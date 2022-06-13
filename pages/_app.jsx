import { GTMProvider } from '@elgorditosalsero/react-gtm-hook';
import { Head, MainLayout } from 'components';
import 'components/articles/mdx/code/dark.css';
import { UIProvider } from 'components/ui/ui-context';
import React from 'react';
import 'styles/global.css';
import 'styles/nprogress.css';

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
