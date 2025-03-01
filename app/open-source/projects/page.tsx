import { Suspense, memo } from 'react';
import type { Metadata } from 'next';
import type { JSX } from 'react';
import meta from '@/lib/config/metadata';
import { PageHeader } from '@/components/mate/page-header';
import { Code } from 'lucide-react';
import RepositoriesShowcaseWrapper from '@/components/mate/open-source/repositories-showcase.wrapper';
import { RepositoriesShowcaseSkeleton } from '@/components/mate/open-source/repositories-showcase.skeleton';

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
      <main className="flex-1 overflow-auto mx-auto lg:max-w-screen-lg">
        <div className="container mx-auto p-6">
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-8">
                <AllRepositories />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
