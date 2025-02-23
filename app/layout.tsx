import type * as React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './../styles/global.css';

import { ThemeProvider } from '@/components/theme-provider';
import { UIProvider } from '@/components/legacy/ui/ui-context';
import Analytics from '@/components/legacy/analytics/analytics';
import meta from '@/lib/config/metadata';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/mate/app-sidebar';
import { cn } from '@/lib/utils';
import { Footer } from '@/components/mate/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = meta;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bungee+Hairline&display=swap" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono&family=Playfair+Display&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn(inter.variable, 'font-sans', 'antialiased')}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <AppSidebar />
            <UIProvider>
              <SidebarInset className="flex flex-col">
                <main>{children}</main>

                <div className="fixed right-0 bottom-0 z-50 mr-4 mb-4 flex flex-col gap-2">
                  <SidebarTrigger />
                </div>

                <Analytics />
                <Footer />
              </SidebarInset>
            </UIProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
