import { Code } from 'lucide-react';
import type { Metadata } from 'next';
import type { JSX } from 'react';
import { memo, Suspense } from 'react';
import { Main } from '@/components/mate/main';
import { RepositoriesShowcaseSkeleton } from '@/components/mate/open-source/repositories-showcase.skeleton';
import RepositoriesShowcaseWrapper from '@/components/mate/open-source/repositories-showcase.wrapper';
import { PageHeader } from '@/components/mate/page-header';
import meta from '@/lib/config/metadata';

export const metadata: Metadata = {
  title: 'Open Source Projects',
  description: `Explore open source projects created and maintained by ${meta.author.name}. From libraries to tools and applications.`,
  keywords: [...meta.keywords, 'open source', 'github', 'projects', 'repositories', 'code'],
};

const Header = memo(() => (
  <PageHeader
    title="Projects"
    subtitle="Libraries, tools, and applications I've created"
    icon={<Code className="h-6 w-6 text-amber-500" />}
    breadcrumbItems={[
      {
        label: 'Open Source',
        href: '/open-source',
      },
      {
        label: 'Projects',
        href: '/open-source/projects',
      },
    ]}
  />
));

const AllRepositories = memo(() => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold flex items-center gap-2 font-hanken">
      <Code className="h-5 w-5 text-amber-500" />
      All Projects
    </h2>
    <Suspense fallback={<RepositoriesShowcaseSkeleton />}>
      <RepositoriesShowcaseWrapper featured={false} limit={50} />
    </Suspense>
  </div>
));

export default function ProjectsPage(): JSX.Element {
  return (
    <>
      <Header />
      <Main>
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-8">
              <AllRepositories />
            </div>
          </div>
        </div>
      </Main>
    </>
  );
}
