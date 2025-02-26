export function TerminalSkeleton() {
  return (
    <div className="space-y-4 animate-pulse" aria-label="Loading terminal">
      <div className="h-75 w-full bg-muted rounded" aria-hidden="true" />
    </div>
  );
}
