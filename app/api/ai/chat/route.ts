import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import { type AIContext, buildSystemPrompt } from '@/lib/ai/system-prompt';

export const maxDuration = 30;

export async function POST(req: Request) {
  const body = await req.json();
  const { prompt, context } = body as { prompt: string; context?: AIContext };

  if (!prompt || typeof prompt !== 'string') {
    return new Response('Missing prompt', { status: 400 });
  }

  if (prompt.length > 500) {
    return new Response('Prompt too long (max 500 chars)', { status: 400 });
  }

  const result = streamText({
    model: anthropic('claude-sonnet-4-20250514'),
    system: buildSystemPrompt(context),
    prompt,
    maxOutputTokens: 300,
    temperature: 0.7,
  });

  return result.toTextStreamResponse();
}
