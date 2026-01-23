'use client';

import { type JSX, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useGithub } from '@/hooks/use-github';
import { useSpotify } from '@/hooks/use-spotify';
import { useSpotifyTop } from '@/hooks/use-spotify-top';
import { trackTerminal } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { terminalCookie } from '@/lib/utils/cookies/terminal.cookie';
import { CommandContextProvider, type DataSources } from './command-context';
import { DEFAULT_HEIGHT, DEFAULT_MESSAGES, DEFAULT_PROMPT, getTypingDuration, SLEEP_DURATION } from './constants';
import { useCommandExecutor } from './hooks/use-command-executor';
import { useTerminalInput } from './hooks/use-terminal-input';
import { useTerminalState } from './hooks/use-terminal-state';
import { Line } from './line';
import { TerminalInput } from './terminal-input';
import type { TerminalProps } from './types';

export function Terminal({
  className,
  initialMessages = [...DEFAULT_MESSAGES],
  prompt = DEFAULT_PROMPT,
  height = DEFAULT_HEIGHT,
}: Readonly<TerminalProps>): JSX.Element {
  const { data: spotifyData } = useSpotify();
  const { data: githubData } = useGithub();
  const { data: spotifyTopData } = useSpotifyTop();

  const [hasVisitedBefore, setHasVisitedBefore] = useState<boolean>(false);
  const [skipAnimations, setSkipAnimations] = useState<boolean>(false);
  const hasInitializedFromCookie = useRef<boolean>(false);
  const sessionStartTime = useRef<number>(Date.now());
  const commandCount = useRef<number>(0);

  const [state, actions] = useTerminalState(initialMessages);
  const { currentLine, typingLine, completedLines, isComplete, userInput } = state;

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Extract primitive dependencies for better memoization
  const spotifyPlayingId = spotifyData?.currentlyPlaying?.id;
  const spotifyRecentlyPlayedCount = spotifyData?.recentlyPlayed?.length;
  const spotifyTopTracksCount = spotifyTopData?.tracks?.length;
  const spotifyTopArtistsCount = spotifyTopData?.artists?.length;
  const githubLogin = githubData?.profile?.login;
  const githubActivitiesCount = githubData?.activities?.activities?.length;

  const dataSources = useMemo<DataSources>(
    () => ({
      spotify: {
        type: 'spotify' as const,
        data: {
          currentlyPlaying: spotifyData?.currentlyPlaying,
          recentlyPlayed: spotifyData?.recentlyPlayed,
          topTracks: spotifyTopData?.tracks || [],
          topArtists: spotifyTopData?.artists || [],
        },
      },
      github: {
        type: 'github' as const,
        data: githubData,
      },
    }),
    [
      spotifyPlayingId,
      spotifyRecentlyPlayedCount,
      spotifyTopTracksCount,
      spotifyTopArtistsCount,
      githubLogin,
      githubActivitiesCount,
      spotifyData,
      githubData,
      spotifyTopData,
    ],
  );

  const tools = useMemo(() => ({ clearLines: actions.clearCompletedLines }), [actions]);

  const { executeCommand: baseExecuteCommand, getMatchingCommands } = useCommandExecutor({
    dataSources,
    tools,
    actions: { addCompletedLines: actions.addCompletedLines, addToHistory: actions.addToHistory },
  });

  const executeCommand = useCallback(
    async (input: string) => {
      commandCount.current += 1;
      await baseExecuteCommand(input);
    },
    [baseExecuteCommand],
  );

  const handleUserInput = useTerminalInput({ state, actions, executeCommand, getMatchingCommands });

  useEffect(() => {
    if (hasInitializedFromCookie.current) return;

    const hasVisited = terminalCookie.hasVisitedRecently();
    setHasVisitedBefore(hasVisited);
    setSkipAnimations(hasVisited);

    if (hasVisited) {
      const completedMessages = initialMessages.map((text) => ({ text, showPrompt: false }));
      actions.addCompletedLines(completedMessages);
      actions.setCurrentLine(initialMessages.length);
      actions.setIsComplete(true);
      hasInitializedFromCookie.current = true;
    }
  }, []);

  useEffect(() => {
    if (isComplete && !hasVisitedBefore && !skipAnimations) {
      terminalCookie.set();
    }
  }, [isComplete, hasVisitedBefore, skipAnimations]);

  useEffect(() => {
    if (isComplete) {
      trackTerminal.sessionStarted();
    }

    return () => {
      if (isComplete) {
        const duration = Date.now() - sessionStartTime.current;
        trackTerminal.sessionEnded(commandCount.current, duration);
      }
    };
  }, [isComplete]);

  useEffect(() => {
    if (isComplete || skipAnimations) return;

    const currentText = initialMessages[currentLine];
    let index = typingLine.currentIndex;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed >= getTypingDuration()) {
        if (index <= currentText.length) {
          actions.setTypingLine({ text: currentText.slice(0, index), currentIndex: index });
          index++;
          startTime = timestamp;
        } else {
          actions.addCompletedLine({ text: currentText, showPrompt: false });
          actions.setCurrentLine(currentLine + 1);
          actions.setTypingLine({ text: '', currentIndex: 0 });
          if (currentLine + 1 === initialMessages.length) {
            actions.setIsComplete(true);
          }
          return;
        }
      }

      requestAnimationFrame(animate);
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, SLEEP_DURATION);

    return () => clearTimeout(timer);
  }, [currentLine, initialMessages, actions, isComplete, typingLine.currentIndex, skipAnimations]);

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const debouncedScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(scrollToBottom, 100);
    };
    debouncedScroll();
    return () => clearTimeout(timeoutId);
  }, [completedLines, typingLine, scrollToBottom]);

  const handleTerminalClick = useCallback(() => {
    if (isComplete && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isComplete]);

  const handleTerminalKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (isComplete && inputRef.current && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        inputRef.current.focus();
        inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    },
    [isComplete],
  );

  return (
    <CommandContextProvider dataSources={dataSources} tools={tools}>
      <div className={cn('rounded-md border bg-card text-card-foreground shadow', className)}>
        <TerminalHeader />
        <div
          ref={terminalRef}
          style={{ height }}
          className="space-y-2 overflow-y-auto overflow-x-hidden p-4 font-mono text-sm bg-black text-neutral-50 rounded-b-xl whitespace-pre-wrap"
          onClick={handleTerminalClick}
          onKeyDown={handleTerminalKeyDown}
          role="log"
          aria-live="polite"
          aria-label="Terminal output"
        >
          {completedLines.map((line, index) => (
            <MemoizedLine key={index} text={line.text} noPrompt={!line.showPrompt} noCaret prompt={prompt} />
          ))}
          {!isComplete && !skipAnimations && typingLine.currentIndex > 0 && (
            <MemoizedLine text={typingLine.text} isTyping prompt={prompt} />
          )}
          {isComplete && (
            <TerminalInput
              ref={inputRef}
              value={userInput}
              onChange={(e) => actions.setUserInput(e.target.value)}
              onKeyDown={handleUserInput}
              prompt={prompt}
            />
          )}
        </div>
      </div>
    </CommandContextProvider>
  );
}

const MemoizedLine = memo(Line);
const TerminalHeader = memo(function TerminalHeader() {
  return (
    <div className="flex items-center justify-between border-b px-4 py-2">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
      </div>
      <div className="text-sm text-muted-foreground">Terminal</div>
    </div>
  );
});
