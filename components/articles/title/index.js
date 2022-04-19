import s from './title.module.css';

export default function ArticleTitle({ title }) {
  return (
    <>
      <h1 className={s.root}>{title.length > 140 ? `${title.substring(0, 140)}...` : title}</h1>
    </>
  );
}
