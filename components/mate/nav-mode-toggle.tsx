'use client';

import { Check, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import type { JSX } from 'react';
import { useCallback, useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { themeCookie } from '@/lib/utils/cookies/theme.cookie';

export function ModeToggle(): JSX.Element {
  const { setTheme, theme } = useTheme();
  const { isMobile } = useSidebar();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedState = themeCookie.get();
    if (savedState) {
      setTheme(savedState.theme);
    }
  }, [setTheme]);

  const handleThemeChange = useCallback(
    (newTheme: 'light' | 'dark' | 'system') => {
      setTheme(newTheme);
      if (isClient) {
        themeCookie.set(newTheme);
      }
    },
    [setTheme, isClient],
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              aria-label="Toggle theme"
            >
              <div className="flex items-center justify-center rounded-lg bg-amber-500 text-sidebar-primary-foreground size-8">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform duration-300 ease-in-out dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform duration-300 ease-in-out dark:rotate-0 dark:scale-100" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="font-semibold truncate">Theme</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-56 rounded-lg border bg-background p-1 shadow-md"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuItem
              onClick={(): void => handleThemeChange('light')}
              className="flex items-center gap-2 p-2 cursor-pointer hover:bg-accent"
            >
              <div className="w-4 flex justify-center">
                {theme === 'light' && <Check className="h-4 w-4 text-primary" />}
              </div>
              <Sun className="h-4 w-4" />
              <span>Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(): void => handleThemeChange('dark')}
              className="flex items-center gap-2 p-2 cursor-pointer hover:bg-accent"
            >
              <div className="w-4 flex justify-center">
                {theme === 'dark' && <Check className="h-4 w-4 text-primary" />}
              </div>
              <Moon className="h-4 w-4" />
              <span>Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(): void => handleThemeChange('system')}
              className="flex items-center gap-2 p-2 cursor-pointer hover:bg-accent"
            >
              <div className="w-4 flex justify-center">
                {theme === 'system' && <Check className="h-4 w-4 text-primary" />}
              </div>
              <span className="h-4 w-4" /> {/* Placeholder for icon absence */}
              <span>System</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
