'use client';

import { Github, Twitter, LinkedinIcon, Music, Mail, ExternalLink, Instagram } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import metadata from '@/lib/config/metadata';

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">MN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">@{user.name}</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">MN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{metadata.author.name}</span>
                  <span className="truncate text-xs">{metadata.description}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <a href={`mailto:${metadata.author.email}`} target="_blank" rel="noopener noreferrer">
                  <Mail className="mr-2" />
                  Email
                  <ExternalLink className="ml-auto h-4 w-4" />
                </a>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <a href="https://github.com/mateonunez" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2" />
                  GitHub
                  <ExternalLink className="ml-auto h-4 w-4" />
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="https://twitter.com/mmateonunez" target="_blank" rel="noopener noreferrer">
                  <Twitter className="mr-2" />
                  Twitter
                  <ExternalLink className="ml-auto h-4 w-4" />
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="https://www.linkedin.com/in/mateo-nunez" target="_blank" rel="noopener noreferrer">
                  <LinkedinIcon className="mr-2" />
                  LinkedIn
                  <ExternalLink className="ml-auto h-4 w-4" />
                </a>
              </DropdownMenuItem>
              {/* IG */}
              <DropdownMenuItem asChild>
                <a href="https://www.instagram.com/mmateonunez" target="_blank" rel="noopener noreferrer">
                  <Instagram className="mr-2" />
                  Instagram
                  <ExternalLink className="ml-auto h-4 w-4" />
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href="https://open.spotify.com/user/ltstcqtg2k6q3a17xzdbmcd8q"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Music className="mr-2" />
                  Spotify
                  <ExternalLink className="ml-auto h-4 w-4" />
                </a>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
