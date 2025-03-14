import type { JSX } from 'react';

export default function Loading(): JSX.Element {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-32 w-32 animate-spin rounded-full border-gray-300 border-b-2" />
    </div>
  );
}
