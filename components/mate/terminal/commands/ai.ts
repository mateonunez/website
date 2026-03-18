import type { AIContext } from '@/lib/ai/system-prompt';
import type { DataSources } from '../command-context';
import type { Command, CommandContext } from '../types/commands';

function buildContextFromDataSources(dataSources: DataSources): AIContext {
  const context: AIContext = {};

  const spotifyData = dataSources.spotify.data;
  if (spotifyData) {
    context.spotify = {
      currentlyPlaying: spotifyData.currentlyPlaying
        ? {
            title: spotifyData.currentlyPlaying.title,
            artist: spotifyData.currentlyPlaying.artist,
            album: spotifyData.currentlyPlaying.album,
          }
        : null,
      recentTracks: spotifyData.recentlyPlayed?.slice(0, 5).map((t) => ({ title: t.title, artist: t.artist })),
      topTracks: spotifyData.topTracks?.slice(0, 5).map((t) => ({ title: t.title, artist: t.artist })),
      topArtists: spotifyData.topArtists?.slice(0, 5).map((a) => ({ name: a.name, genres: a.genres })),
    };
  }

  const githubData = dataSources.github.data;
  if (githubData) {
    context.github = {
      login: githubData.profile?.login,
      followers: githubData.profile?.followers?.length,
      activities: githubData.activities?.activities?.slice(0, 5).map((a) => ({
        type: a.type,
        title: a.title,
        repo: a.repo.fullName,
        date: a.date,
      })),
    };
  }

  return context;
}

async function streamAIResponse(
  prompt: string,
  { dataSources, tools }: Pick<CommandContext, 'dataSources' | 'tools'>,
): Promise<void> {
  const context = buildContextFromDataSources(dataSources);

  const response = await fetch('/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, context }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    tools.appendStreamingText(`Error: ${errorText || response.statusText}`);
    tools.finalizeStream();
    return;
  }

  const reader = response.body?.getReader();
  if (!reader) {
    tools.appendStreamingText('Error: No response stream.');
    tools.finalizeStream();
    return;
  }

  const decoder = new TextDecoder();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      tools.appendStreamingText(chunk);
    }
  } finally {
    tools.finalizeStream();
  }
}

export const askCommand: Command = {
  name: 'ask',
  description: 'Ask AIt anything',
  usage: 'ask <question>',
  aliases: ['ai', 'chat', 'q'],
  handler: async ({ args, dataSources, tools }) => {
    if (!args) return 'Usage: ask <your question>\nExample: ask what tech stack do you use?';

    tools.appendStreamingText('');
    await streamAIResponse(args, { dataSources, tools });
    return { type: 'streamed' };
  },
};

export const explainCommand: Command = {
  name: 'explain',
  description: "Explain a topic from Mateo's perspective",
  usage: 'explain <topic>',
  aliases: ['ex'],
  handler: async ({ args, dataSources, tools }) => {
    if (!args) return 'Usage: explain <topic>\nExample: explain your approach to testing';

    const prompt = `Explain the following from your perspective and experience as a senior engineer: ${args}`;
    tools.appendStreamingText('');
    await streamAIResponse(prompt, { dataSources, tools });
    return { type: 'streamed' };
  },
};

export const summarizeCommand: Command = {
  name: 'summarize',
  description: 'Summarize what Mateo is about',
  usage: 'summarize [topic]',
  aliases: ['sum'],
  handler: async ({ args, dataSources, tools }) => {
    const prompt = args
      ? `Give a focused summary about: ${args}. Draw from your experience and projects.`
      : "Give a concise summary of who you are, what you do, and what you're working on right now.";

    tools.appendStreamingText('');
    await streamAIResponse(prompt, { dataSources, tools });
    return { type: 'streamed' };
  },
};

export const tldrCommand: Command = {
  name: 'tldr',
  description: 'Quick take on any topic',
  usage: 'tldr <topic>',
  handler: async ({ args, dataSources, tools }) => {
    if (!args) return 'Usage: tldr <topic>\nExample: tldr your open source work';

    const prompt = `Give me a very brief, 2-3 line tldr about: ${args}`;
    tools.appendStreamingText('');
    await streamAIResponse(prompt, { dataSources, tools });
    return { type: 'streamed' };
  },
};

export const aiCommands: Command[] = [askCommand, explainCommand, summarizeCommand, tldrCommand];
