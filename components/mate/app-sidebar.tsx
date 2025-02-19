'use client';

import type * as React from 'react';
import { BookText, Code2, Home, Bot, Settings2, Sparkles, Music, GalleryVerticalEnd } from 'lucide-react';

import { NavMain } from '@/components/mate/nav-main';
import { NavProjects } from '@/components/mate/nav-projects';
import { NavUser } from '@/components/mate/nav-user';
import { TeamSwitcher } from '@/components/mate/team-switcher';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';

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
      disabled: true,
      items: [
        {
          title: 'Projects',
          url: '/open-source',
        },
        {
          title: 'Contributions',
          url: '/open-source/contributions',
        },
      ],
    },
    {
      title: 'Spotify',
      url: '/spotify',
      icon: Music,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings2,
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
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
