'use client';

import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import { trackExternalLink } from '@/lib/analytics';

interface TrackedLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  linkType?: 'spotify' | 'github' | 'social' | 'article' | 'other';
  trackLabel?: string;
}

export function TrackedLink({ linkType = 'other', trackLabel, onClick, ...props }: TrackedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const destination = typeof props.href === 'string' ? props.href : props.href.toString();
    trackExternalLink.clicked(destination, linkType, trackLabel);

    onClick?.(e);
  };

  return <Link {...props} onClick={handleClick} />;
}
