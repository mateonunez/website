import { Suspense, memo } from 'react';
import type { Metadata } from 'next';
import type { JSX } from 'react';
import meta from '@/lib/config/metadata';
import { PageHeader } from '@/components/mate/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Code, GitBranch } from 'lucide-react';
import RepositoriesShowcaseWrapper from '@/components/mate/open-source/repositories-showcase.wrapper';
import { RepositoriesShowcaseSkeleton } from '@/components/mate/open-source/repositories-showcase.skeleton';
import { Separator } from '@/components/ui/separator';
import LastActivityWrapper from '@/components/mate/open-source/last-activity.wrapper';
import GitHubCommunityWrapper from '@/components/mate/open-source/github-community.wrapper';

export const metadata: Metadata = {
  title: 'Open Source',
  description: `Open source projects, contributions and activity by ${meta.author.name}. ${meta.description}`,
  keywords: [...meta.keywords, 'open source', 'github', 'projects', 'contributions'],
};

const Header = memo(() => (
  <PageHeader
    title="Open Source"
    subtitle="Projects, contributions and activity"
    icon={<Github className="h-6 w-6 text-amber-500" />}
    breadcrumbItems={[
      {
        label: 'Open Source',
        href: '/open-source',
      },
    ]}
  />
));

const OpenSourceIntro = memo(() => (
  <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
    <CardHeader className="p-4 md:p-6">
      <CardTitle className="text-xl md:text-2xl flex items-center gap-2 font-hanken">
        <Github className="h-5 w-5 md:h-6 md:w-6 text-amber-500" />
        Code
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4 md:p-6 pt-0">
      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
        <p>WIP</p>
      </div>
    </CardContent>
  </Card>
));

const FeaturedRepositories = memo(() => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold flex items-center gap-2 font-hanken">
      <Code className="h-5 w-5 text-amber-500" />
      Featured Projects
    </h2>
    <Suspense fallback={<RepositoriesShowcaseSkeleton />}>
      <RepositoriesShowcaseWrapper featured />
    </Suspense>
  </div>
));

const GitHubActivity = memo(() => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold flex items-center gap-2 font-hanken">
      <GitBranch className="h-5 w-5 text-amber-500" />
      Recent Activity
    </h2>
    <LastActivityWrapper />
  </div>
));

const GitHubCommunity = memo(() => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold font-bungee">Community 🌟</h2>
    <Separator className="my-2" />
    <GitHubCommunityWrapper />
  </div>
));

export default function OpenSourcePage(): JSX.Element {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-auto mx-auto lg:max-w-screen-lg">
        <div className="container mx-auto p-6">
          <div className="space-y-8">
            <OpenSourceIntro />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 space-y-8">
                <FeaturedRepositories />
              </div>
              <div className="lg:col-span-4 space-y-8">
                <GitHubCommunity />
              </div>
              <div className="lg:col-span-12 space-y-8">
                <GitHubActivity />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
