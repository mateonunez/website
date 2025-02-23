'use client';

import {
  type JSX,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  useCallback,
  type InputHTMLAttributes,
  forwardRef,
} from 'react';
import { cn } from '@/lib/utils';
import { Line } from './line';
import { getCommandMap } from './commands';
import {
  DEFAULT_HEIGHT,
  DEFAULT_MESSAGES,
  DEFAULT_PROMPT,
  MAX_HISTORY,
  SLEEP_DURATION,
  getTypingDuration,
} from './constants';
import { useSpotify } from '@/lib/hooks/use-spotify';
import { useGithub } from '@/lib/hooks/use-github';
import { CommandContextProvider } from './command-context';

interface TerminalProps {
  className?: string;
  initialMessages?: string[];
  prompt?: string;
  height?: string;
}

interface TerminalLine {
  text: string;
  showPrompt: boolean;
}

interface TypingLineState {
  text: string;
  currentIndex: number;
}

export function Terminal({
  className,
  initialMessages = [...DEFAULT_MESSAGES],
  prompt = DEFAULT_PROMPT,
  height = DEFAULT_HEIGHT,
}: Readonly<TerminalProps>): JSX.Element {
  const { data: spotifyData } = useSpotify();
  const { data: githubData } = useGithub();
  // State
  const [currentLine, setCurrentLine] = useState<number>(0);
  const [typingLine, setTypingLine] = useState<TypingLineState>({ text: '', currentIndex: 0 });
  const [completedLines, setCompletedLines] = useState<TerminalLine[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [userInput, setUserInput] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Refs
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isLastParagraph = currentLine === initialMessages.length;

  // Command execution
  const executeCommand = useCallback(
    async (input: string) => {
      const trimmedInput = input.trim().toLowerCase();
      const commands = getCommandMap();

      if (trimmedInput === 'clear') {
        setCompletedLines([]);
        return;
      }

      const command = commands.get(trimmedInput);
      let response: string;

      try {
        if (command) {
          response = await command.handler({ spotifyData, githubData });
        } else {
          response = 'Unknown command. Type "help" for available commands.';
        }
      } catch (error) {
        console.error('Error executing command:', error);
        response = 'An error occurred while executing the command.';
      }

      const newLines: TerminalLine[] = [{ text: input, showPrompt: true }];

      response.split('\n').forEach((line) => {
        newLines.push({ text: line, showPrompt: false });
      });

      setCompletedLines((prev) => [...prev, ...newLines]);
      setCommandHistory((prev) => [input, ...prev].slice(0, MAX_HISTORY));
      setHistoryIndex(-1);
    },
    [spotifyData, githubData],
  );

  // Handle typing animation
  useEffect(() => {
    if (isLastParagraph) {
      setIsComplete(true);
      return;
    }

    const currentText = initialMessages[currentLine];

    if (typingLine.currentIndex === 0) {
      const timer = setTimeout(() => {
        setTypingLine({ text: '', currentIndex: 1 });
      }, SLEEP_DURATION);
      return () => clearTimeout(timer);
    }

    if (typingLine.currentIndex <= currentText.length) {
      const timer = setTimeout(() => {
        setTypingLine({
          text: currentText.slice(0, typingLine.currentIndex),
          currentIndex: typingLine.currentIndex + 1,
        });
      }, getTypingDuration());
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCompletedLines((prev) => [...prev, { text: currentText, showPrompt: false }]);
      setCurrentLine((prev) => prev + 1);
      setTypingLine({ text: '', currentIndex: 0 });
    }, SLEEP_DURATION);
    return () => clearTimeout(timer);
  }, [currentLine, typingLine, isLastParagraph, initialMessages]);

  // Focus input when complete
  useEffect(() => {
    if (isComplete && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isComplete]);

  // Handle user input
  const handleUserInput = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'Enter':
          if (userInput.trim()) {
            void executeCommand(userInput);
          } else {
            // For empty input, just add a blank line with prompt
            setCompletedLines((prev) => [...prev, { text: '', showPrompt: true }]);
          }
          setUserInput('');
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (historyIndex < commandHistory.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setUserInput(commandHistory[newIndex]);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (historyIndex > -1) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setUserInput(newIndex === -1 ? '' : commandHistory[newIndex]);
          }
          break;
        case 'Tab':
          e.preventDefault();
          // TODO: Implement command completion
          break;
      }
    },
    [userInput, executeCommand, commandHistory, historyIndex],
  );

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [completedLines, typingLine]);

  return (
    <CommandContextProvider spotifyData={spotifyData} githubData={githubData}>
      <div className={cn('rounded-xl border bg-card text-card-foreground shadow', className)}>
        <TerminalHeader />
        <div
          ref={terminalRef}
          style={{ height }}
          className="space-y-2 overflow-y-auto p-4 font-mono text-sm bg-black text-neutral-50 rounded-b-xl"
        >
          {completedLines.map((line, index) => (
            <p key={index} className="transition-colors">
              <Line text={line.text} noPrompt={!line.showPrompt} noCaret prompt={prompt} />
            </p>
          ))}
          {!isComplete && typingLine.currentIndex > 0 && (
            <p>
              <Line text={typingLine.text} isTyping prompt={prompt} />
            </p>
          )}
          {isComplete && (
            <TerminalInput
              ref={inputRef}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleUserInput}
              prompt={prompt}
            />
          )}
        </div>
      </div>
    </CommandContextProvider>
  );
}

function TerminalHeader() {
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
}

interface TerminalInputProps extends InputHTMLAttributes<HTMLInputElement> {
  prompt: string;
}

const TerminalInput = forwardRef<HTMLInputElement, TerminalInputProps>(({ prompt, ...props }, ref) => (
  <div className="flex items-center gap-1">
    <span className="font-black text-amber-500">{prompt} </span>
    <input
      ref={ref}
      type="text"
      className="flex-1 bg-transparent border-none outline-none text-white caret-amber-500"
      placeholder="Type a command..."
      {...props}
    />
  </div>
));
