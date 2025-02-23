import { createContext, type ReactNode, useContext } from 'react';
import type { NormalizedCurrentlyPlaying } from '@/types/spotify';
import type { NormalizedGitHubUser } from '@/types/github';

export type SpotifyData = { data: NormalizedCurrentlyPlaying | null };
export type GitHubData = { data: NormalizedGitHubUser | null };

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
