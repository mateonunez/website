import s from './mdx-image.module.css';
import Image, { type ImageProps } from 'next/image';
import Link from 'next/link';
import type { JSX } from 'react';

interface MDXImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  width: number;
  height: number;
  alt: string;
  quality?: number;
  priority?: boolean;
  href?: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
}

export default function MDXImage({
  src,
  width,
  height,
  alt,
  quality,
  priority = false,
  href,
  target = '_self',
  ...rest
}: MDXImageProps): JSX.Element {
  const ImageWrapper = (
    <div className="h-full w-full">
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
        <Link
          href={href}
          // @ts-expect-error fancy is a custom prop that Next.js Link doesn't know about
          fancy="false"
          passHref
          aria-label={alt}
          title={alt}
          target={target}
        >
          {ImageWrapper}
        </Link>
      ) : (
        ImageWrapper
      )}
    </div>
  );
}
