import 'tailwindcss/tailwind.css';
import 'assets/styles/global.css';

import { useEffect } from 'react';
import Router from 'next/router';

import MainLayout from 'components/layouts/main';
import nProgress from 'nprogress';

let timeout;

export default function App({ Component, pageProps, router }) {
  const start = () => {
    timeout = setTimeout(nProgress.start, 500);
  };

  const done = () => {
    clearTimeout(timeout);
    nProgress.done();
  };

  useEffect(() => {
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', done);
    Router.events.on('routeChangeError', done);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', done);
      Router.events.off('routeChangeError', done);
    };
  }, []);

  return (
    <MainLayout router={router}>
      <Component {...pageProps} />
    </MainLayout>
  );
}
