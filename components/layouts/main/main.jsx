'use client';

import { Header, Footer, ChevronUp } from 'components';
import { Analytics } from 'components/analytics';

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />

      {/* TODO: refactor this */}
      <div className="fixed right-0 bottom-0 z-50 mr-4 mb-4">
        <a href="#top" className="transform text-white transition-all duration-300 hover:scale-200">
          <ChevronUp className="h-8 w-8" />
        </a>
      </div>

      <Analytics />
    </>
  );
}
