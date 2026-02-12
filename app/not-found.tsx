'use client';

import { ArrowLeft, Home, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { JSX } from 'react';
import { Button } from '@/components/ui/button';

export default function NotFound(): JSX.Element {
  const router = useRouter();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-bold text-primary sm:text-8xl">404</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">Page not found</h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button variant="default" asChild>
          <Link href="/">
            <Home className="h-4 w-4" />
            Go home
          </Link>
        </Button>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          Go back
        </Button>
        <Button variant="outline" asChild>
          <Link href="/blog">
            <Search className="h-4 w-4" />
            Browse articles
          </Link>
        </Button>
      </div>
    </div>
  );
}
