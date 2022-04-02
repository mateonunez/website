import s from 'styles/pages/home.module.css';

import { useUI } from 'components/ui/UIContext';
import cn from 'classnames';

import Header from 'components/header';
import Hero from 'components/hero';
import Universe from 'components/universe';

export default function Home() {
  const { bigBang } = useUI();

  return (
    <>
      <Header />

      <div className={s.root}>
        <Hero
          className={cn(
            'transition ease-in-out duration-1000',
            bigBang ? 'opacity-0 h-0' : 'opacity-100 h-full'
          )}
        />

        <div
          className={cn(
            s.universe,
            'transition ease-in-out duration-1000',
            bigBang ? 'opacity-100 h-full w-full' : 'opacity-0 h-0 w-0'
          )}>
          {bigBang && <Universe />}
        </div>
      </div>
    </>
  );
}
