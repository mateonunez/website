import type { JSX } from 'react';

export default function BlogLoading(): JSX.Element {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-8 space-y-2">
        <div className="h-8 w-32 animate-pulse rounded-md bg-primary/10" />
        <div className="h-4 w-64 animate-pulse rounded-md bg-primary/10" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3 rounded-lg border p-4">
            <div className="h-40 w-full animate-pulse rounded-md bg-primary/10" />
            <div className="h-5 w-3/4 animate-pulse rounded-md bg-primary/10" />
            <div className="h-4 w-1/2 animate-pulse rounded-md bg-primary/10" />
            <div className="h-3 w-full animate-pulse rounded-md bg-primary/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
