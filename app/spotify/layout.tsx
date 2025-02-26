import type { ReactNode } from 'react';

export default function SpotifyLayout({ children }: { children: ReactNode }) {
  return <div className="flex-1 overflow-auto mx-auto w-full">{children}</div>;
}
