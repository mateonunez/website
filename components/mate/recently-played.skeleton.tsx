export function RecentlyPlayedSkeleton() {
  return (
    <div className="space-y-2 animate-pulse" aria-label="Loading recently played">
      <div className="h-4 w-2/3 bg-muted rounded" aria-hidden="true" />
      <div className="h-4 w-1/2 bg-muted rounded" aria-hidden="true" />
    </div>
  );
}
