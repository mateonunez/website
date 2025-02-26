'use client';

import { RepositoriesShowcase } from '@/components/mate/open-source/repositories-showcase';

interface RepositoriesShowcaseWrapperProps {
  featured?: boolean;
  limit?: number;
}

export default function RepositoriesShowcaseWrapper({ featured = false, limit }: RepositoriesShowcaseWrapperProps) {
  return <RepositoriesShowcase featured={featured} limit={limit} />;
}
