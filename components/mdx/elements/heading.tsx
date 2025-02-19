import { cn } from '@/lib/utils';
import Link from 'next/link';
import type { HTMLAttributes } from 'react';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function Heading({ as: Component = 'h1', className, children, ...props }: HeadingProps) {
  const id = typeof children === 'string' ? children.toLowerCase().replace(/\s+/g, '-') : undefined;

  return (
    <Component
      id={id}
      className={cn(
        'scroll-m-20',
        {
          'text-4xl font-extrabold tracking-tight lg:text-5xl': Component === 'h1',
          'text-3xl font-semibold tracking-tight': Component === 'h2',
          'text-2xl font-semibold tracking-tight': Component === 'h3',
          'text-xl font-semibold tracking-tight': Component === 'h4',
          'text-lg font-semibold tracking-tight': Component === 'h5',
          'text-base font-semibold tracking-tight': Component === 'h6',
        },
        className,
      )}
      {...props}
    >
      {id ? (
        <Link href={`#${id}`} className="no-underline hover:underline">
          {children}
        </Link>
      ) : (
        children
      )}
    </Component>
  );
}
