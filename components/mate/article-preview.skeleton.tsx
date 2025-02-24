export function ArticlePreviewSkeleton() {
  return (
    <div className="space-y-4 animate-pulse" aria-label="Loading article preview">
      <div className="h-6 w-3/4 bg-muted rounded" aria-hidden="true" />
      <div className="h-4 w-full bg-muted rounded" aria-hidden="true" />
      <div className="h-4 w-1/2 bg-muted rounded" aria-hidden="true" />
    </div>
  );
}
