'use client';

import { Header, Footer } from 'components';
import { Analytics } from 'components/analytics';

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <Analytics />
    </>
  );
}
