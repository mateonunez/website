'use client';
import dynamic from 'next/dynamic';
import { TerminalSkeleton } from './terminal.skeleton';

const Terminal = dynamic(() => import('@/components/mate/terminal/terminal').then((mod) => mod.Terminal), {
  loading: () => <TerminalSkeleton />,
  ssr: false,
});

export default function TerminalWrapper() {
  return <Terminal />;
}
