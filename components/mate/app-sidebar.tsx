'use client';

import type * as React from 'react';
import { BookText, Code2, Home, Bot, Music, Code } from 'lucide-react';

import { NavMain } from '@/components/mate/nav-main';
import { NavProjects } from '@/components/mate/nav-projects';
import { NavUser } from '@/components/mate/nav-user';
import { ModeToggle } from '@/components/mate/nav-mode-toggle';
import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from '@/components/ui/sidebar';
import personal from '@/lib/config/personal';

const data = {
  user: {
    name: personal.social.github,
    email: personal.email,
    avatar: personal.assets.avatar,
  },
  teams: [
    {
      name: `@${personal.social.github}`,
      logo: Code,
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
      description: `Hey there! I'm AIt (acts like "alt" /ɔːlt/, but also pronounced as "eight" /eɪt/). It depends. 🤷‍♂️`,
      url: `https://github.com/${personal.social.github}/ait`,
      icon: Bot,
      disabled: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent className="space-y-4">
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <ModeToggle />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
