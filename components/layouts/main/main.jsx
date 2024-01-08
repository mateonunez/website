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
      <div className="fixed bottom-0 right-0 z-50 mb-4 mr-4">
        <a href="#top" className="text-white hover:scale-200 transform transition-all duration-300">
          <ChevronUp className="w-8 h-8" />
        </a>
      </div>

      <Analytics />
    </>
  );
}
