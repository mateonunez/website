import Link from 'next/link';
import type { JSX, ReactNode } from 'react';

interface MDXLinkProps {
  children: ReactNode;
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
}

interface ChildrenProps {
  props?: {
    alt?: string;
  };
}

export default function MDXLink({ children, href, target = '_blank' }: MDXLinkProps): JSX.Element {
  let title: string | undefined;

  if (typeof children === 'object' && (children as ChildrenProps).props?.alt) {
    title = (children as ChildrenProps).props.alt;
  } else {
    title = children as string;
  }

  return (
    <Link
      href={href}
      // @ts-expect-error 'alt' prop is not supported by Next.js Link
      alt={title}
      title={title}
      target={target}
      rel="noreferrer"
    >
      {children}
    </Link>
  );
}
