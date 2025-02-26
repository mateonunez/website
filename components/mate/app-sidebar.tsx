'use client';

import type * as React from 'react';
import {
  BookText,
  Code2,
  Home,
  Bot,
  Settings2,
  Sparkles,
  Music,
  GalleryVerticalEnd,
  SidebarCloseIcon,
} from 'lucide-react';

import { NavMain } from '@/components/mate/nav-main';
import { NavProjects } from '@/components/mate/nav-projects';
import { NavUser } from '@/components/mate/nav-user';
import { ModeToggle } from '@/components/mate/nav-mode-toggle';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const data = {
  user: {
    name: 'mateonunez',
    email: 'mateonunez95@gmail.com',
    avatar: '/images/profile.jpg',
  },
  teams: [
    {
      name: '@mateonunez',
      logo: GalleryVerticalEnd,
      plan: 'Personal',
    },
  ],
  navMain: [
    {
      title: 'Home',
      url: '/',
      icon: Home,
      isActive: true,
    },
    {
      title: 'Blog',
      url: '/blog',
      icon: BookText,
      items: [
        {
          title: 'Latest Articles',
          url: '/blog',
        },
        {
          title: 'Tags',
          url: '/blog/tags',
          disabled: true,
        },
      ],
    },
    {
      title: 'Open Source',
      url: '/open-source',
      icon: Code2,
      disabled: false,
      items: [
        {
          title: 'Overview',
          url: '/open-source',
        },
        {
          title: 'Projects',
          url: '/open-source/projects',
        },
      ],
    },
    {
      title: 'Spotify',
      url: '/spotify',
      icon: Music,
      disabled: false,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings2,
      disabled: true,
      items: [
        {
          title: 'Profile',
          url: '/settings/profile',
        },
        {
          title: 'Preferences',
          url: '/settings/preferences',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'AIt',
      description: 'AI-powered terminal companion',
      url: 'https://github.com/mateonunez/ait',
      icon: Bot,
    },
    {
      name: 'Playground',
      description: 'Code experiments & demos',
      url: '/playground',
      icon: Sparkles,
      disabled: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar, isMobile } = useSidebar();

  return (
    <Sidebar {...props}>
      <SidebarHeader />
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <ModeToggle />
        {isMobile && (
          <div className="relative flex w-full min-w-0 flex-col p-2 mt-auto">
            <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => toggleSidebar()}>
              <SidebarCloseIcon />
              Close
            </Button>
          </div>
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
