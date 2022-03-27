import { useUI } from 'components/ui/UIContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import nProgress from 'nprogress';

let timeout;

export default function MainLayout({ children }) {
  const router = useRouter();
  const { loading, setLoading } = useUI();

  const startNProgress = () => {
    timeout = setTimeout(nProgress.start, 500);
    setLoading(true);
  };

  const doneNProgress = () => {
    setLoading(false);
    clearTimeout(timeout);
    nProgress.done();
  };

  // Router
  useEffect(() => {
    // Changing route
    router.events.on('routeChangeStart', startNProgress);
    router.events.on('routeChangeComplete', doneNProgress);
    router.events.on('routeChangeError', doneNProgress);

    return () => {
      // Changing route
      router.events.off('routeChangeStart', startNProgress);
      router.events.off('routeChangeComplete', doneNProgress);
      router.events.off('routeChangeError', doneNProgress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events]);

  return (
    <>
      {loading && <div className="loading-overlay" />}

      {/* Main  */}
      <main>{children}</main>
    </>
  );
}
