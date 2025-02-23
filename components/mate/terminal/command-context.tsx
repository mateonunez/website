import { createContext, useContext, type ReactNode } from 'react';
import type { NormalizedCurrentlyPlaying } from '@/types/spotify';
import type { NormalizedGitHubUser } from '@/types/github';

interface CommandContextType {
  spotifyData: NormalizedCurrentlyPlaying | null;
  githubData: { profile: NormalizedGitHubUser } | null;
}

const CommandContext = createContext<CommandContextType | undefined>(undefined);

export function useCommandContext() {
  const context = useContext(CommandContext);
  if (context === undefined) {
    // biome-ignore lint/nursery/noSecrets: falsy
    throw new Error('useCommandContext must be used within a CommandContextProvider');
  }
  return context;
}

interface CommandContextProviderProps {
  children: ReactNode;
  spotifyData: NormalizedCurrentlyPlaying | null;
  githubData: { profile: NormalizedGitHubUser } | null;
}

export function CommandContextProvider({ children, spotifyData, githubData }: CommandContextProviderProps) {
  return <CommandContext.Provider value={{ spotifyData, githubData }}>{children}</CommandContext.Provider>;
}
