import { forwardRef, type InputHTMLAttributes, memo } from 'react';

interface TerminalInputProps extends InputHTMLAttributes<HTMLInputElement> {
  prompt: string;
}

export const TerminalInput = memo(
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
