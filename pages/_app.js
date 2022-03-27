import 'styles/global.css';

import Head from 'components/common/Head';
import { UIProvider } from 'components/ui/UIContext';
import MainLayout from 'components/layouts/MainLayout';

export default function App({ Component, pageProps }) {
  // Retrieves the layout
  const Layout = Component.Layout || (({ children }) => <MainLayout>{children}</MainLayout>);

  return (
    <>
      <Head />
      <UIProvider>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </UIProvider>
    </>
  );
}
