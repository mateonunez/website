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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, hankenGrotesk.variable, prompt.variable, 'font-sans', 'antialiased')}>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
