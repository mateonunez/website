import { NextResponse } from 'next/server';
import metadata from '@/lib/config/metadata';

const { author } = metadata;

export function GET() {
  return NextResponse.json({
    ...author,
  });
}
