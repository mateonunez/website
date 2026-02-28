import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Hanken_Grotesk, Inter, Prompt } from 'next/font/google';
import type * as React from 'react';
import './../styles/global.css';

import { Footer } from '@/components/mate/footer';
import { TopNavbar } from '@/components/mate/top-navbar';
import { AnalyticsProvider } from '@/components/providers/analytics-provider';
import { AnalyticsTracker } from '@/components/providers/analytics-tracker';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { UIProvider } from '@/components/providers/ui-provider';
import { JsonLdScript } from '@/components/seo/json-ld-script';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import meta from '@/lib/config/metadata';
import { getOrganizationSchema, getPersonSchema, getWebSiteSchema } from '@/lib/seo/json-ld';
import { cn } from '@/lib/utils';

const MotionProvider = dynamic(() =>
  import('@/components/providers/motion-provider').then((mod) => mod.MotionProvider),
);

const AppSidebar = dynamic(() => import('@/components/mate/app-sidebar').then((mod) => mod.AppSidebar));

const GithubStarBanner = dynamic(() =>
  import('@/components/mate/github-star-banner').then((mod) => mod.GithubStarBanner),
);

const Toaster = dynamic(() => import('@/components/ui/sonner').then((mod) => mod.Toaster));

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
});

const prompt = Prompt({
  subsets: ['latin'],
  variable: '--font-prompt',
  display: 'swap',
  weight: '400',
});

export const metadata: Metadata = meta;

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning style={{ colorScheme: 'light dark' }}>
      <head>
        <link rel="preconnect" href="https://i.scdn.co" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://avatars.githubusercontent.com" crossOrigin="anonymous" />
        <link rel="alternate" type="application/rss+xml" title="Mateo Nunez's Blog" href="/api/rss" />
      </head>
      <body className={cn(inter.variable, hankenGrotesk.variable, prompt.variable, 'font-sans', 'antialiased')}>
        {/* GTM noscript fallback: required immediately after opening body */}
        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              title="Google Tag Manager"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        ) : null}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MotionProvider>
            <AnalyticsProvider>
              <AnalyticsTracker />
              <SidebarProvider>
                <AppSidebar />

                <UIProvider>
                  <SidebarInset className="flex flex-col">
                    <a
                      href="#main-content"
                      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:text-sm focus:font-medium focus:shadow-lg"
                    >
                      Skip to main content
                    </a>
                    <TopNavbar />
                    <GithubStarBanner />

                    <main id="main-content" className="flex-1">
                      {children}
                    </main>

                    <Footer />
                  </SidebarInset>
                </UIProvider>
              </SidebarProvider>
            </AnalyticsProvider>
            <JsonLdScript data={getPersonSchema()} />
            <JsonLdScript data={getWebSiteSchema()} />
            <JsonLdScript data={getOrganizationSchema()} />

            <Toaster />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
