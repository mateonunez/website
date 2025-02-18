import Link from 'next/link';

export default function MDXLink({ children, href, target = '_blank' }) {
  let title;
  if (typeof children === 'object') {
    title = children.props?.alt;
  } else {
    title = children;
  }

  return (
    <Link href={href} alt={title} title={title} target={target} rel="noreferrer">
      {children}
    </Link>
  );
}
