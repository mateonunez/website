import type { ReactNode } from 'react';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <main className="flex-1 overflow-auto mx-auto max-w-dvw">{children}</main>;
}
