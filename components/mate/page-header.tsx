'use client';
import { BookText, Code2, Home, Music } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { BlogBreadcrumb } from '@/components/mate/breadcrumb';
import { AnimatedContainer, AnimatedItem } from '@/components/ui/animated-container';
import { cn } from '@/lib/utils';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  breadcrumbItems?: Array<{ label: string; href?: string }>;
  className?: string;
  children?: ReactNode;
}

const subtitleEasterEgg = 'Just chilling and coding ☕️';

const sectionIcons = {
  '': Home,
  blog: BookText,
  'open-source': Code2,
  spotify: Music,
};

export function PageHeader({ title, subtitle, icon, breadcrumbItems, className, children }: PageHeaderProps) {
  const [tempSubtitle, setTempSubtitle] = useState(subtitle);

  const handleHover = () => setTempSubtitle(subtitleEasterEgg);
  const handleLeave = () => setTempSubtitle(subtitle);

  const getIconFromBreadcrumbs = () => {
    if (icon) return icon;

    if (breadcrumbItems && breadcrumbItems.length > 0) {
      const firstPath = breadcrumbItems[0]?.href?.split('/')[1] || '';
      const IconComponent = sectionIcons[firstPath as keyof typeof sectionIcons];

      if (IconComponent) {
        return <IconComponent className="h-6 w-6 text-primary" />;
      }
    }

    return null;
  };

  const displayIcon = getIconFromBreadcrumbs();

  return (
    <AnimatedContainer
      animation="fadeIn"
      className={cn('flex flex-col', className)}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      {breadcrumbItems && (
        <div className="px-4 md:px-8 py-3 border-b bg-muted/30">
          <BlogBreadcrumb items={breadcrumbItems} className="whitespace-nowrap" />
        </div>
      )}
      <div className="flex h-16 md:h-20 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-14">
        <div className="flex items-center justify-between w-full px-4 md:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 max-w-[calc(100%-3rem)]">
            <AnimatedItem delay={0.1}>
              <Link href="/" className="flex items-center gap-2">
                {displayIcon}
                <span className="text-xl font-bold font-prompt transition-colors hover:text-primary truncate">
                  {title}
                </span>
              </Link>
            </AnimatedItem>
            {tempSubtitle && (
              <AnimatedItem delay={0.2} className="hidden sm:block">
                <p className="text-sm md:text-base text-muted-foreground">{tempSubtitle}</p>
              </AnimatedItem>
            )}
          </div>
          <div className="flex items-center">{children}</div>
        </div>
      </div>
    </AnimatedContainer>
  );
}
