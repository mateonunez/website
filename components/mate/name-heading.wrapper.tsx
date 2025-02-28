'use client';
import dynamic from 'next/dynamic';
import { NameHeadingSkeleton } from './name-heading.skeleton';

const NameHeading = dynamic(() => import('@/components/mate/name-heading').then((mod) => mod.default), {
  loading: () => <NameHeadingSkeleton />,
  ssr: false,
});

export default function NameHeadingWrapper() {
  return <NameHeading />;
}
