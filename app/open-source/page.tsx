import { Code, GitBranch, Github } from 'lucide-react';
import type { Metadata } from 'next';
import type { JSX } from 'react';
import { memo, Suspense } from 'react';
import { Main } from '@/components/mate/main';
import GitHubCommunityWrapper from '@/components/mate/open-source/github-community.wrapper';
import LastActivityWrapper from '@/components/mate/open-source/last-activity.wrapper';
import { RepositoriesShowcaseSkeleton } from '@/components/mate/open-source/repositories-showcase.skeleton';
import RepositoriesShowcaseWrapper from '@/components/mate/open-source/repositories-showcase.wrapper';
import { PageHeader } from '@/components/mate/page-header';
import { BreadcrumbSchema } from '@/components/seo/breadcrumb-schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import meta from '@/lib/config/metadata';

export const metadata: Metadata = {
  title: 'Open Source Projects & Contributions',
  description: `What open source projects does ${meta.author.name} work on? Explore TypeScript/JavaScript libraries, Node.js tools, AI projects, and community contributions. Find featured repositories, recent activity, and ways to collaborate.`,
  keywords: [
    ...meta.keywords,
    'open source',
    'github',
    'projects',
    'contributions',
    'npm packages',
    'typescript libraries',
    'node.js tools',
  ],
};

const Header = memo(() => (
  <PageHeader
    title="Open Source"
    subtitle="Projects, contributions and activity"
    asHeading
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
        <p className="text-base text-muted-foreground leading-relaxed mb-6">
          Open source isn’t just about code for me—it's about community, creativity, and the pure joy of helping others.
          I've contributed to and maintained a bunch of projects that scratch my own itch and (hopefully) help others,
          too. Check out some of my favorite contributions below—feel free to star, fork, or open a PR. 🚀
        </p>
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
      <RepositoriesShowcaseWrapper featured limit={4} />
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
      <BreadcrumbSchema items={[{ name: 'Open Source', href: '/open-source' }]} />
      <Header />
      <Main>
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
      </Main>
    </>
  );
}
