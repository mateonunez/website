import s from 'styles/pages/home.module.css';

import { useUI } from 'components/ui/UIContext';
import cn from 'classnames';

import Header from 'components/header';
import Hero from 'components/hero';
import { useEffect } from 'react';

export default function Home() {
  const { bigBang } = useUI();

  useEffect(() => {
    console.log(bigBang);
  }, [bigBang]);

  return (
    <>
      <Header />

      <div className={s.root}>
        <Hero
          className={cn(
            'flex flex-col transition ease-in-out duration-300',
            bigBang ? 'opacity-0 h-0' : 'opacity-100 h-full'
          )}
        />

        {bigBang && <div className={s.universe}>BigBang</div>}
      </div>
    </>
  );
}
