import s from 'styles/pages/home.module.css';

import Header from 'components/header';
import Hero from 'components/hero';
import { ChevronDown } from 'components/icons';
import { useUI } from 'components/ui/UIContext';
import cn from 'classnames';

export default function Home() {
  const { isTerminalCompleted } = useUI();

  return (
    <>
      <Header />

      <div className={s.root}>
        <Hero />

        {/* Init the f**king world  */}
        <div
          className={cn(
            s.start,
            'transition ease-in-out duration-1000',
            isTerminalCompleted ? 'opacity-100' : 'opacity-0'
          )}>
          <button className={s.startButton}>
            <ChevronDown className={s.startIcon} />
          </button>
        </div>
      </div>
    </>
  );
}
