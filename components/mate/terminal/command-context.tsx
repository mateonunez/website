import { createContext, type ReactNode, useContext } from 'react';
import type { LastActivitiesData, NormalizedGitHubUser } from '@/types/github';
import type { NormalizedCurrentlyPlaying, NormalizedRecentlyPlayed, TopArtist, TopTrack } from '@/types/spotify';

export type SpotifyData = {
  data: {
    currentlyPlaying: NormalizedCurrentlyPlaying | null;
    recentlyPlayed: NormalizedRecentlyPlayed[] | null;
    topTracks: TopTrack[];
    topArtists: TopArtist[];
  } | null;
};
export type GitHubData = {
  data: {
    profile: NormalizedGitHubUser | null;
    activities: LastActivitiesData | null;
  } | null;
};

export type DataSourceMap = {
  spotify: SpotifyData;
  github: GitHubData;
};

export type DataSourceType = keyof DataSourceMap;

export type DataSources = {
  [K in DataSourceType]: DataSourceMap[K];
};

export interface TerminalTools {
  clearLines: () => void;
}

export interface CommandContextType {
  dataSources: DataSources;
  tools: TerminalTools;
}

const CommandContext = createContext<CommandContextType>({
  dataSources: {
    spotify: { data: null },
    github: { data: null },
  } as DataSources,
  tools: { clearLines: () => {} },
});

export const useCommandContext = () => useContext(CommandContext);

export function CommandContextProvider({
  children,
  dataSources,
  tools,
}: {
  children: ReactNode;
  dataSources: DataSources;
  tools: TerminalTools;
}) {
  return <CommandContext.Provider value={{ dataSources, tools }}>{children}</CommandContext.Provider>;
}
