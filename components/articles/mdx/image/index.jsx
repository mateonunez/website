import s from './mdx-image.module.css';

import Image from 'next/image';
import Link from 'next/link';

export default function MDXImage({ src, width, height, alt, quality, priority, href, target = '_self', ...rest }) {
  const ImageWrapper = (
    <div className="w-full h-full">
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        aria-label={alt}
        quality={quality}
        priority={priority}
        {...rest}
      />
    </div>
  );

  return (
    <div className={s.root}>
      {href ? (
        <Link href={href} fancy={false} passHref alt={alt} aria-label={alt} title={alt} target={target}>
          {ImageWrapper}
        </Link>
      ) : (
        <>{ImageWrapper}</>
      )}
    </div>
  );
}
