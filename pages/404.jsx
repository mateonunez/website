import s from 'styles/pages/404.module.css';

import Footer from 'components/common/footer/Footer';
import Header from 'components/header/header';

export default function Eror404() {
  return (
    <>
      <Header />

      <div className={s.root}>
        <h1 className="title">Did you lost?</h1>
      </div>

      <Footer />
    </>
  );
}
