import { type NextRequest, NextResponse } from 'next/server';
import { getRepository } from '@/lib/github';
import type { GitHubRepositoryResponse } from '@/types/github';

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
): Promise<NextResponse<GitHubRepositoryResponse | { error: string; extra?: unknown }>> {
  try {
    const repository = (await params).slug;
    if (!repository) {
      return NextResponse.json({ error: 'Repository not found' }, { status: 404 });
    }

    const repositoryFetched = await getRepository(repository);

    if (!repositoryFetched) {
      return NextResponse.json({ error: 'Github not available' }, { status: 500 });
    }

    return NextResponse.json({ repository: repositoryFetched });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Something went wrong with GitHub.',
        extra: error,
      },
      { status: 500 },
    );
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour
