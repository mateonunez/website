'use client';

import { ExternalLink, Folder, MoreHorizontal, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

export function NavProjects({
  projects,
}: {
  projects: {
    name: string;
    description?: string;
    url: string;
    icon: LucideIcon;
    disabled?: boolean;
  }[];
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name} className={cn(item.disabled && 'opacity-50 pointer-events-none', 'mb-1.5')}>
            <SidebarMenuButton asChild>
              <a
                href={item.url}
                className="flex items-start gap-3 min-h-[48px] py-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex shrink-0 pt-0.5">
                  <item.icon className="h-4 w-4" />
                </span>
                <div className="flex flex-col gap-1 text-sm">
                  <span className="font-medium">{item.name}</span>
                  {item.description && <span className="text-xs text-muted-foreground">{item.description}</span>}
                </div>
                <ExternalLink className="ml-auto h-3 w-3 shrink-0 text-muted-foreground opacity-70" />
              </a>
            </SidebarMenuButton>
            {!item.disabled && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 rounded-lg"
                  side={isMobile ? 'bottom' : 'right'}
                  align={isMobile ? 'end' : 'start'}
                >
                  <DropdownMenuItem>
                    <Folder className="text-muted-foreground" />
                    <span>View Project</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
