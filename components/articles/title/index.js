import s from './title.module.css';

export default function ArticleTitle({ title }) {
  return (
    <>
      <h1 className={s.root}>{title}</h1>
    </>
  );
}
