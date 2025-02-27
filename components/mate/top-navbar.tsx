'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookText, Code, Code2, Home, Music, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Blog',
    url: '/blog',
    icon: BookText,
  },
  {
    title: 'Open Source',
    url: '/open-source',
    icon: Code2,
  },
  {
    title: 'Spotify',
    url: '/spotify',
    icon: Music,
  },
];

export function TopNavbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { toggleSidebar, open: isSidebarOpen } = useSidebar();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (url: string) => {
    if (url === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(url);
  };

  return (
    <header
      className={cn(
        'w-full sticky top-0 z-50 transition-all duration-200 bg-background',
        isScrolled && 'shadow-sm border-b',
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="font-bold text-xl flex items-center">
            <Code className="h-5 w-5 mr-2 text-primary" />
            <span className="font-prompt">mateonunez</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className={cn(
                  'flex items-center text-sm font-medium transition-colors gap-1.5 px-2.5 py-2 rounded-md relative',
                  isActive(item.url)
                    ? 'text-primary bg-accent/50 font-medium'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                <span>{item.title}</span>
                {isActive(item.url) && (
                  <span className="absolute -bottom-[1px] left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={isSidebarOpen ? 'default' : 'outline'}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSidebar();
                  }}
                  className={cn('hidden sm:flex items-center gap-1.5 h-9 relative z-50')}
                  aria-label="Toggle sidebar"
                  aria-expanded={isSidebarOpen}
                >
                  {isSidebarOpen ? <X className="h-4 w-4 flex-shrink-0" /> : <Menu className="h-4 w-4 flex-shrink-0" />}
                  <span className="text-xs">{isSidebarOpen ? 'Close' : 'Menu'}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="end">
                <p>{isSidebarOpen ? 'Close sidebar' : 'Open sidebar for more options'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              toggleSidebar();
            }}
            className="md:hidden flex items-center justify-center h-9 w-9 rounded-md relative z-50"
            aria-label="Toggle mobile menu"
          >
            {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
