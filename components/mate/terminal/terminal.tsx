'use client';

import { type JSX, useEffect, useRef, useCallback, type InputHTMLAttributes, forwardRef, useMemo, memo } from 'react';
import { cn } from '@/lib/utils';
import { Line } from './line';
import { DEFAULT_HEIGHT, DEFAULT_MESSAGES, DEFAULT_PROMPT, SLEEP_DURATION, getTypingDuration } from './constants';
import { useSpotify } from '@/lib/hooks/use-spotify';
import { useGithub } from '@/lib/hooks/use-github';
import { CommandContextProvider, type DataSources } from './command-context';
import { useTerminalState } from './hooks/use-terminal-state';
import { useCommandExecutor } from './hooks/use-command-executor';
import { useTerminalInput } from './hooks/use-terminal-input';
import type { TerminalProps } from './types';

export function Terminal({
  className,
  initialMessages = [...DEFAULT_MESSAGES],
  prompt = DEFAULT_PROMPT,
  height = DEFAULT_HEIGHT,
}: Readonly<TerminalProps>): JSX.Element {
  const { data: spotifyData } = useSpotify();
  const { data: githubData } = useGithub();

  const [state, actions] = useTerminalState(initialMessages);
  const { currentLine, typingLine, completedLines, isComplete, userInput } = state;

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const dataSources = useMemo<DataSources>(
    () => ({
      spotify: { type: 'spotify' as const, data: spotifyData },
      github: { type: 'github' as const, data: githubData },
    }),
    [spotifyData, githubData],
  );

  const tools = useMemo(() => ({ clearLines: actions.clearCompletedLines }), [actions]);

  const { executeCommand, getMatchingCommands } = useCommandExecutor({
    dataSources,
    tools,
    actions: { addCompletedLines: actions.addCompletedLines, addToHistory: actions.addToHistory },
  });

  const handleUserInput = useTerminalInput({ state, actions, executeCommand, getMatchingCommands });

  useEffect(() => {
    const isLastParagraph = currentLine === initialMessages.length;

    if (isLastParagraph) {
      actions.setIsComplete(true);
      return;
    }

    const currentText = initialMessages[currentLine];

    if (typingLine.currentIndex === 0) {
      const timer = setTimeout(() => {
        actions.setTypingLine({ text: '', currentIndex: 1 });
      }, SLEEP_DURATION);
      return () => clearTimeout(timer);
    }

    if (typingLine.currentIndex <= currentText.length) {
      const timer = setTimeout(() => {
        actions.setTypingLine({
          text: currentText.slice(0, typingLine.currentIndex),
          currentIndex: typingLine.currentIndex + 1,
        });
      }, getTypingDuration());
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      actions.addCompletedLine({ text: currentText, showPrompt: false });
      actions.setCurrentLine(currentLine + 1);
      actions.setTypingLine({ text: '', currentIndex: 0 });
    }, SLEEP_DURATION);
    return () => clearTimeout(timer);
  }, [currentLine, typingLine, initialMessages, actions]);

  useEffect(() => {
    if (isComplete && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isComplete]);

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
            <p key={index} className="transition-colors">
              <MemoizedLine text={line.text} noPrompt={!line.showPrompt} noCaret prompt={prompt} />
            </p>
          ))}
          {!isComplete && typingLine.currentIndex > 0 && (
            <p>
              <MemoizedLine text={typingLine.text} isTyping prompt={prompt} />
            </p>
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

interface TerminalInputProps extends InputHTMLAttributes<HTMLInputElement> {
  prompt: string;
}

const TerminalInput = memo(
  forwardRef<HTMLInputElement, TerminalInputProps>(({ prompt, ...props }, ref) => (
    <div className="flex items-center gap-1">
      <span className="font-black text-amber-500">{prompt} </span>
      <input
        ref={ref}
        type="text"
        className="flex-1 bg-transparent border-none outline-none text-white caret-amber-500 min-w-0 text-base md:text-sm"
        placeholder="Type a command..."
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        inputMode="search"
        enterKeyHint="send"
        {...props}
      />
    </div>
  )),
);
