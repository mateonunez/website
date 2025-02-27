import { Skeleton } from '@/components/ui/skeleton';

export function AboutMeSkeleton() {
  return (
    <div className="w-full">
      <div className="rounded-lg overflow-hidden border border-border/50">
        <div className="h-14 bg-muted/20 border-b border-border/30 flex items-center p-4">
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="p-6 flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 flex flex-col items-center md:border-r border-border/40 space-y-4">
            <Skeleton className="h-32 w-32 rounded-full" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-40" />
            <div className="flex flex-wrap gap-2 justify-center">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
          <div className="md:w-2/3 space-y-6">
            <div>
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-3/4 mt-2" />
            </div>
            <Skeleton className="h-px w-full" />
            <div>
              <Skeleton className="h-6 w-24 mb-2" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-16 mb-2" />
                    <div className="flex flex-wrap gap-1.5">
                      {Array(5)
                        .fill(0)
                        .map((_, j) => (
                          <Skeleton key={j} className="h-5 w-16 rounded-full" />
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
