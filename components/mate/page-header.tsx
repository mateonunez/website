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
      <div className="flex h-12 sm:h-14 md:h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-10 sm:group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 w-full px-4 sm:px-6 md:px-8">
          <div className="flex items-center gap-3">
            {icon && <div className="flex-shrink-0">{icon}</div>}
            <div>
              <h1 className="text-lg md:text-2xl lg:text-3xl font-bold font-hanken animate-in fade-in duration-1000 delay-200">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-muted-foreground md:text-base mt-0.5 animate-in fade-in duration-1000 delay-300">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {breadcrumbItems && <BlogBreadcrumb items={breadcrumbItems} />}
      {children}
    </header>
  );
}
