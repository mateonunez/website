import type { Metadata } from 'next';
import { Hanken_Grotesk, Inter, Prompt } from 'next/font/google';
import type * as React from 'react';
import './../styles/global.css';

import { AppSidebar } from '@/components/mate/app-sidebar';
import { Footer } from '@/components/mate/footer';
import { TopNavbar } from '@/components/mate/top-navbar';
import { AnalyticsProvider } from '@/components/providers/analytics-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { UIProvider } from '@/components/providers/ui-provider';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import meta from '@/lib/config/metadata';
import { createJSONLD, getPersonSchema, getWebSiteSchema } from '@/lib/seo/json-ld';
import { cn } from '@/lib/utils';

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://i.scdn.co" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://avatars.githubusercontent.com" crossOrigin="anonymous" />
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
          <AnalyticsProvider>
            <SidebarProvider>
              <AppSidebar />

              <UIProvider>
                <SidebarInset className="flex flex-col">
                  <TopNavbar />

                  <main className="flex-1">{children}</main>

                  <Footer />
                </SidebarInset>
              </UIProvider>
            </SidebarProvider>
          </AnalyticsProvider>
          {/** biome-ignore lint/correctness/useUniqueElementIds: This is a static page and the ID is unique. */}
          <script
            type="application/ld+json"
            id="person-schema"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: This is a trusted source.
            dangerouslySetInnerHTML={{ __html: createJSONLD(getPersonSchema()) }}
          />
          {/** biome-ignore lint/correctness/useUniqueElementIds: This is a static page and the ID is unique. */}
          <script
            type="application/ld+json"
            id="website-schema"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: This is a trusted source.
            dangerouslySetInnerHTML={{ __html: createJSONLD(getWebSiteSchema()) }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
