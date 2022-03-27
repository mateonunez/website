import s from 'styles/pages/home.module.css';

import Header from 'components/header';
import Hero from 'components/hero';
import { ChevronDown } from 'components/icons';

export default function Home() {
  return (
    <>
      <Header />

      <div className={s.root}>
        <Hero />

        {/* Init the f**king world  */}
        <div className={s.start}>
          <button className={s.startButton}>
            <ChevronDown className={s.startIcon} />
          </button>
        </div>
      </div>
    </>
  );
}
