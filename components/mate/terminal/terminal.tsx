'use client';

import { type JSX, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { cn } from '@/lib/utils';
import { Line } from './line';
import { DEFAULT_HEIGHT, DEFAULT_MESSAGES, DEFAULT_PROMPT, SLEEP_DURATION, getTypingDuration } from './constants';
import { useSpotify } from '@/lib/hooks/use-spotify';
import { useGithub } from '@/lib/hooks/use-github';
import { useSpotifyTop } from '@/lib/hooks/use-spotify-top';
import { CommandContextProvider, type DataSources } from './command-context';
import { useTerminalState } from './hooks/use-terminal-state';
import { useCommandExecutor } from './hooks/use-command-executor';
import { useTerminalInput } from './hooks/use-terminal-input';
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

  const [state, actions] = useTerminalState(initialMessages);
  const { currentLine, typingLine, completedLines, isComplete, userInput } = state;

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    [spotifyData, githubData, spotifyTopData],
  );

  const tools = useMemo(() => ({ clearLines: actions.clearCompletedLines }), [actions]);

  const { executeCommand, getMatchingCommands } = useCommandExecutor({
    dataSources,
    tools,
    actions: { addCompletedLines: actions.addCompletedLines, addToHistory: actions.addToHistory },
  });

  const handleUserInput = useTerminalInput({ state, actions, executeCommand, getMatchingCommands });

  useEffect(() => {
    if (isComplete) return;

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
  }, [currentLine, initialMessages, actions, isComplete, typingLine.currentIndex]);

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
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

  return (
    <CommandContextProvider dataSources={dataSources} tools={tools}>
      <div className={cn('rounded-xl border bg-card text-card-foreground shadow', className)}>
        <TerminalHeader />
        {/* biome-ignore lint/nursery/noStaticElementInteractions: terminal */}
        <div
          ref={terminalRef}
          style={{ height }}
          className="space-y-2 overflow-y-auto p-4 font-mono text-sm bg-black text-neutral-50 rounded-b-xl"
          onClick={handleTerminalClick}
        >
          {completedLines.map((line, index) => (
            <MemoizedLine key={index} text={line.text} noPrompt={!line.showPrompt} noCaret prompt={prompt} />
          ))}
          {!isComplete && typingLine.currentIndex > 0 && (
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
