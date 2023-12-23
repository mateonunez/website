import { NextResponse } from 'next/server';
import metadata from 'lib/config/metadata';

const { author } = metadata;

export async function GET() {
  return NextResponse.json({
    ...author,
  });
}
