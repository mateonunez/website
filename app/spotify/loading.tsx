import type { JSX } from 'react';

export default function SpotifyLoading(): JSX.Element {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-8 space-y-2">
        <div className="h-8 w-32 animate-pulse rounded-md bg-primary/10" />
        <div className="h-4 w-48 animate-pulse rounded-md bg-primary/10" />
      </div>
      <div className="mb-8 rounded-lg border p-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 animate-pulse rounded-full bg-primary/10" />
          <div className="space-y-2">
            <div className="h-5 w-40 animate-pulse rounded-md bg-primary/10" />
            <div className="h-4 w-24 animate-pulse rounded-md bg-primary/10" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3 rounded-lg border p-4">
            <div className="h-5 w-3/4 animate-pulse rounded-md bg-primary/10" />
            <div className="h-4 w-1/2 animate-pulse rounded-md bg-primary/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
