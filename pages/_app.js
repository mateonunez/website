import 'tailwindcss/tailwind.css';

import MainLayout from 'components/layouts/main';

function MyApp({ Component, pageProps, router }) {
  return (
    <MainLayout router={router}>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp;
