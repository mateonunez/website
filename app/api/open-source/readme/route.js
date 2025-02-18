import { NextResponse } from 'next/server';
import { getReadme } from '@/lib/github';

export async function GET() {
  const readme = await getReadme().catch((err) => {
    return NextResponse.json({ message: 'Something went wrong with GitHub.', extra: err }, { status: 500 });
  });
  if (!readme) {
    return NextResponse.json({ error: 'Github not available' }, { status: 500 });
  }

  return NextResponse.json({ readme });
}
