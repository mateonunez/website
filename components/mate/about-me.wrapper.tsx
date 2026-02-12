'use client';

import dynamic from 'next/dynamic';
import { AboutMeSkeleton } from './about-me.skeleton';

const AboutMe = dynamic(() => import('./about-me').then((mod) => mod.AboutMe), {
  loading: () => <AboutMeSkeleton />,
});

export default function AboutMeWrapper() {
  return <AboutMe />;
}
