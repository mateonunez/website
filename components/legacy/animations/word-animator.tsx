'use client';

import s from './word-animator.module.css';
import { useEffect, useRef, useState, forwardRef, type RefObject, type ElementType } from 'react';
import cn from 'classnames';

interface WordAnimatorProps {
  words: string[];
  clickable?: boolean;
}

interface WrapperProps {
  href?: string;
  alt?: string;
  'aria-hidden'?: boolean;
  onClick?: () => void;
}

const WordAnimator = forwardRef<any, WordAnimatorProps>(({ words, clickable = false }, ref) => {
  const [currentWord, setCurrentWord] = useState<string>('');
  const [opacity, setOpacity] = useState<'opacity-0' | 'opacity-100'>('opacity-0');
  const wordRef: RefObject<HTMLSpanElement> = useRef(null);

  let i = 0;
  const changeWord = (): void => {
    if (i < words.length) {
      setOpacity('opacity-0');
      setTimeout(() => {
        setCurrentWord(words[i++]);
        if (i <= words.length) {
          setOpacity('opacity-100');
        }
      }, 500);
    }
  };

  useEffect(() => {
    changeWord();
    const interval = setInterval(changeWord, 2500);
    return (): void => clearInterval(interval);
  }, []);

  const Wrapper: ElementType = clickable ? 'a' : 'div';
  const wrapperProps: WrapperProps = clickable
    ? {
        href: `#${currentWord.toLowerCase()}`,
        alt: currentWord,
        'aria-hidden': true,
        onClick: (): void => wordRef.current?.scrollIntoView(),
      }
    : {};

  return (
    <div className={s.wordAnimatorContainer}>
      <Wrapper {...wrapperProps} ref={ref}>
        <span
          ref={wordRef}
          className={cn(s.wordAnimator, `transition-opacity duration-500 ${opacity}`, clickable && 'cursor-pointer')}
        >
          {currentWord}
        </span>
      </Wrapper>
    </div>
  );
});

WordAnimator.displayName = 'WordAnimator';

export default WordAnimator;
