import { BlogBreadcrumb } from '@/components/mate/breadcrumb';
import { AnimatedContainer, AnimatedItem } from '@/components/ui/animated-container';
import type { ReactNode } from 'react';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  breadcrumbItems?: Array<{ label: string; href?: string }>;
  children?: ReactNode;
}

export function PageHeader({ title, subtitle, icon, breadcrumbItems, children }: PageHeaderProps) {
  return (
    <AnimatedContainer animation="fadeIn" className="flex flex-col">
      <div className="flex h-16 md:h-20 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-14">
        <div className="flex items-center gap-4 w-full px-4 md:px-8">
          <div className="flex items-center gap-4">
            {icon && <AnimatedItem className="flex-shrink-0">{icon}</AnimatedItem>}
            <div>
              <AnimatedItem delay={0.1}>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold font-prompt">{title}</h1>
              </AnimatedItem>
              {subtitle && (
                <AnimatedItem delay={0.2}>
                  <p className="text-sm md:text-base text-muted-foreground mt-2">{subtitle}</p>
                </AnimatedItem>
              )}
            </div>
          </div>
        </div>
      </div>
      {breadcrumbItems && (
        <div className="px-4 md:px-8 py-3 border-b">
          <BlogBreadcrumb items={breadcrumbItems} className="whitespace-nowrap" />
        </div>
      )}
      {children}
    </AnimatedContainer>
  );
}
