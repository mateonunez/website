export default function PostLayout({ meta, children }) {
  return (
    <article>
      <h1>{meta.title}</h1>
      <h2>{meta.description}</h2>
      <h3>By {meta.author}</h3>
      <p>{meta.publishedAt}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={meta.cover} alt={meta.title} loading="lazy" width="100%" />
      {children}
    </article>
  );
}
