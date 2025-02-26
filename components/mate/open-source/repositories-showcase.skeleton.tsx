import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function RepositoriesShowcaseSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array(6)
        .fill(null)
        .map((_, index) => (
          <Card key={index} className="flex flex-col h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start gap-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
              <div className="space-y-2 mt-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardHeader>
            <CardContent className="flex-grow pb-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            </CardContent>
            <CardFooter className="pt-0 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-5 w-20" />
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}
