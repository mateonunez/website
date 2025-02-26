import { BlogBreadcrumb } from '@/components/mate/breadcrumb';
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
    <header className="flex flex-col">
      <div className="flex h-16 md:h-20 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-14">
        <div className="flex items-center gap-4 w-full px-4 md:px-8">
          <div className="flex items-center gap-4">
            {icon && <div className="flex-shrink-0">{icon}</div>}
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold font-hanken animate-in fade-in duration-1000 delay-200">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm md:text-base text-muted-foreground mt-2 animate-in fade-in duration-1000 delay-300">
                  {subtitle}
                </p>
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
    </header>
  );
}
