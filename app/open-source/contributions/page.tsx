import { memo } from 'react';
import type { Metadata } from 'next';
import type { JSX } from 'react';
import meta from '@/lib/config/metadata';
import { PageHeader } from '@/components/mate/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GitBranch, Github } from 'lucide-react';
import GitHubContributionGraphWrapper from '@/components/mate/open-source/github-contribution-graph.wrapper';
import LastActivityWrapper from '@/components/mate/open-source/last-activity.wrapper';

export const metadata: Metadata = {
  title: 'Open Source Contributions',
  description: `Explore ${meta.author.name}'s contributions to open source projects and activity on GitHub.`,
  keywords: [...meta.keywords, 'open source', 'github', 'contributions', 'activity', 'commits', 'pull requests'],
};

const Header = memo(() => (
  <PageHeader
    title="Contributions"
    subtitle="My activity and contributions to open source"
    icon={<GitBranch className="h-6 w-6 text-amber-500" />}
    breadcrumbItems={[
      {
        label: 'Open Source',
        href: '/open-source',
      },
      {
        label: 'Contributions',
        href: '/open-source/contributions',
      },
    ]}
  />
));

const ContributionsIntro = memo(() => (
  <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/50">
    <CardHeader className="p-4 md:p-6">
      <CardTitle className="text-xl md:text-2xl flex items-center gap-2 font-hanken">
        <Github className="h-5 w-5 md:h-6 md:w-6 text-amber-500" />
        Open Source Contributions
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4 md:p-6 pt-0">
      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
        <p>WIP</p>
      </div>
    </CardContent>
  </Card>
));

const ContributionGraph = memo(() => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold flex items-center gap-2 font-hanken">
      <Github className="h-5 w-5 text-amber-500" />
      Contribution Graph
    </h2>
    <GitHubContributionGraphWrapper />
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

export default function ContributionsPage(): JSX.Element {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-auto mx-auto lg:max-w-screen-lg">
        <div className="container mx-auto p-6">
          <div className="space-y-8">
            <ContributionsIntro />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-12 space-y-8">
                <ContributionGraph />
                <GitHubActivity />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
