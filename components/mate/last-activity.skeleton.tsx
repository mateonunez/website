'use client';

export function LastActivitySkeleton() {
  return (
    <div className="w-full space-y-4">
      <div className="space-y-2 animate-pulse" aria-label="Loading GitHub activity">
        <div className="h-5 w-1/3 bg-muted rounded" aria-hidden="true" />
        <div className="h-3 w-1/2 bg-muted rounded" aria-hidden="true" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3 p-3 animate-pulse">
            <div className="h-8 w-8 bg-muted rounded-full" aria-hidden="true" />
            <div className="space-y-2 flex-1">
              <div className="flex items-center justify-between">
                <div className="h-4 w-2/3 bg-muted rounded" aria-hidden="true" />
                <div className="h-3 w-12 bg-muted rounded" aria-hidden="true" />
              </div>
              <div className="h-3 w-1/3 bg-muted rounded" aria-hidden="true" />
              <div className="h-3 w-5/6 bg-muted rounded" aria-hidden="true" />
              <div className="h-3 w-20 bg-muted rounded mt-3" aria-hidden="true" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
