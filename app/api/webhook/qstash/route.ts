import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const headers = Object.fromEntries(request.headers.entries());

    const body = await request.text();

    const { method, url } = request;

    console.log('QStash Webhook Received:', {
      timestamp: new Date().toISOString(),
      method,
      url,
      headers,
      body: body || 'No body',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Webhook received and logged successfully',
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error processing QStash webhook:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process webhook',
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    message: 'QStash webhook endpoint is active',
    timestamp: new Date().toISOString(),
  });
}
