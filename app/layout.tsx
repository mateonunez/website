import type * as React from 'react';
import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './../styles/global.css';

import { ThemeProvider } from '@/components/theme-provider';
import { UIProvider } from '@/components/legacy/ui/ui-context';
import { ChevronUp } from 'lucide-react';
import Analytics from '@/components/legacy/analytics/analytics';
import meta from '@/lib/config/metadata';
import { ModeToggle } from '@/components/mode-toggle';

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
            <main>{children}</main>

            <div className="fixed right-0 bottom-0 z-50 mr-4 mb-4">
              <a href="#top" className="transform text-foreground transition-all duration-300 hover:scale-110">
                <ChevronUp className="h-8 w-8" />
              </a>

              <ModeToggle />
            </div>

            <Analytics />
          </UIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
