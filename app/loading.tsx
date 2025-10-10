import type { JSX } from 'react';

export default function Loading(): JSX.Element {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 dark:border-gray-700 border-t-amber-500" />
        <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
