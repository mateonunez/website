import type * as React from 'react';
import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './../styles/global.css';

import { ThemeProvider } from '@/components/theme-provider';
import { UIProvider } from '@/components/legacy/ui/ui-context';
import Analytics from '@/components/legacy/analytics/analytics';
import meta from '@/lib/config/metadata';
import { ModeToggle } from '@/components/mode-toggle';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/mate/app-sidebar';

const jetBrainsSans = JetBrains_Mono({
  variable: '--font-jetBrainsSans',
  subsets: ['latin'],
});

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jetBrainsMono',
  subsets: ['latin'],
});

export const metadata: Metadata = meta;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetBrainsSans.variable} ${jetBrainsMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <UIProvider>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset className="flex flex-col">
                <main>{children}</main>

                <div className="fixed right-0 bottom-0 z-50 mr-4 mb-4 flex flex-col gap-2">
                  <SidebarTrigger />
                  <ModeToggle />
                </div>

                <Analytics />
              </SidebarInset>
            </SidebarProvider>
          </UIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
