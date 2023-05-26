'use client';

import s from './word-animator.module.css';
import { useEffect, useRef, useState, forwardRef } from 'react';
import cn from 'classnames';

const WordAnimator = ({ words, clickable }, ref) => {
  const [currentWord, setCurrentWord] = useState('');
  const [opacity, setOpacity] = useState('opacity-0');
  const wordRef = useRef();

  let i = 0;
  const changeWord = () => {
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
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Wrapper = clickable ? 'a' : 'div';
  const wrapperProps = clickable
    ? {
        href: `#${currentWord.toLowerCase()}`,
        alt: currentWord,
        'aria-hidden': true,
        onClick: () => wordRef.current.scrollIntoView()
      }
    : {};

  return (
    <div className={s.wordAnimatorContainer}>
      <Wrapper {...wrapperProps} ref={ref}>
        <span
          ref={wordRef}
          className={cn(
            s.wordAnimator,
            `transition-opacity duration-500 ${opacity}`,
            clickable && 'cursor-pointer'
          )}>
          {currentWord}
        </span>
      </Wrapper>
    </div>
  );
};

export default forwardRef(WordAnimator);
