import s from 'styles/pages/404.module.css';

import { Header, Footer } from 'components';

export default function Eror500() {
  return (
    <>
      <Header />

      <div className={s.root}>
        <h1 className="title">Error unexpected. Can you fix me?</h1>
      </div>

      <Footer />
    </>
  );
}
