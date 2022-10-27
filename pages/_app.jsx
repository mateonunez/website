import 'styles/global.css';
import 'styles/nprogress.css';
import 'components/articles/mdx/code/dark.css';

import { Head, MainLayout } from 'components';
import { UIProvider } from 'components/ui/ui-context';

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
