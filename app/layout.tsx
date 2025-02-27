import type * as React from 'react';
import type { Metadata } from 'next';
import { Inter, Hanken_Grotesk, Jua, Prompt } from 'next/font/google';
import './../styles/global.css';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { UIProvider } from '@/components/providers/ui-provider';
import { AnalyticsProvider } from '@/components/providers/analytics-provider';
import meta from '@/lib/config/metadata';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/mate/app-sidebar';
import { cn } from '@/lib/utils';
import { Footer } from '@/components/mate/footer';
import { TopNavbar } from '@/components/mate/top-navbar';

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

const jua = Jua({
  subsets: ['latin'],
  variable: '--font-jua',
  display: 'swap',
  weight: '400',
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
      <body
        className={cn(
          inter.variable,
          hankenGrotesk.variable,
          jua.variable,
          prompt.variable,
          'font-sans',
          'antialiased',
        )}
      >
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
