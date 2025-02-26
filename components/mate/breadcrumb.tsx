import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import React from 'react';

interface IBreadcrumbItem {
  label: string;
  href?: string;
}

interface BlogBreadcrumbProps {
  items: IBreadcrumbItem[];
}

export function BlogBreadcrumb({ items }: BlogBreadcrumbProps) {
  return (
    <Breadcrumb className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 border-b whitespace-nowrap">
      <BreadcrumbList className="flex-nowrap">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const fullLabel = item.label;
          const truncatedLabel = item.label.length > 25 ? `${item.label.substring(0, 22)}...` : item.label;

          return (
            <React.Fragment key={item.label}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="max-w-[200px] md:max-w-none truncate md:text-clip">
                    <span className="hidden md:inline">{fullLabel}</span>
                    <span className="inline md:hidden">{truncatedLabel}</span>
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      href={item.href ?? '#'}
                      className="hover:underline max-w-[150px] md:max-w-none truncate md:text-clip inline-block"
                    >
                      <span className="hidden md:inline">{fullLabel}</span>
                      <span className="inline md:hidden">{truncatedLabel}</span>
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
