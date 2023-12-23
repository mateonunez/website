import { NextResponse } from 'next/server';
import { getRepository } from 'lib/github';

export async function GET(_, { params }) {
  const { slug: repository } = params;
  if (!repository) {
    return NextResponse.json({ error: 'Repository not found' }, { status: 404 });
  }

  const { [repository]: repositoryFetched } = await getRepository(repository).catch((err) => {
    return NextResponse.json({ message: 'Something went wrong with GitHub.', extra: err }, { status: 500 });
  });

  if (!repositoryFetched) {
    return NextResponse.json({ error: 'Github not available' }, { status: 500 });
  }

  return NextResponse.json({ [repository]: repositoryFetched });
}
