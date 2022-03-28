import s from 'styles/pages/home.module.css';

import Header from 'components/header';
import Hero from 'components/hero';
import { useUI } from 'components/ui/UIContext';

export default function Home() {
  const { bigBang } = useUI();

  return (
    <>
      <Header />

      <div className={s.root}>
        <Hero />

        {bigBang && <div className={s.bigBang}>Big Bang</div>}
      </div>
    </>
  );
}
