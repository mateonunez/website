'use client';

import type * as React from 'react';
import { BookText, Code2, Home, Bot, Music, GalleryVerticalEnd, SidebarCloseIcon } from 'lucide-react';

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
  ],
  projects: [
    {
      name: 'AIt',
      description: 'AI-powered terminal companion',
      url: 'https://github.com/mateonunez/ait',
      icon: Bot,
      disabled: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar, isMobile } = useSidebar();

  return (
    <Sidebar {...props}>
      <SidebarHeader />
      <SidebarContent className="space-y-4">
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <ModeToggle />
        {isMobile && (
          <div className="relative flex w-full min-w-0 flex-col p-4 mt-auto">
            <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => toggleSidebar()}>
              <SidebarCloseIcon className="mr-2 h-4 w-4" />
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
