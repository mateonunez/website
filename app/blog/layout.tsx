import type { ReactNode } from 'react';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <div className="flex-1 overflow-auto mx-auto w-full">{children}</div>;
}
