export function GitHubCommunitySkeleton() {
  return (
    <div className="space-y-2 animate-pulse" aria-label="Loading GitHub community">
      <div className="h-4 w-3/4 bg-muted rounded" aria-hidden="true" />
      <div className="h-4 w-full bg-muted rounded" aria-hidden="true" />
    </div>
  );
}
