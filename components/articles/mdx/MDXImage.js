import s from './mdx-image.module.css';

import Image from 'next/image';
import Link from 'next/link';

const MDXImage = ({ src, width, height, alt, layout, quality, priority, href, ...rest }) => {
  const ImageWrapper = (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      aria-label={alt}
      layout={layout}
      quality={quality}
      priority={priority}
      {...rest}
    />
  );

  return (
    <div className={s.root}>
      {href ? (
        <Link href={href} fancy={false} passHref>
          <a href={href} alt={alt} aria-label={alt} title={alt}>
            {ImageWrapper}
          </a>
        </Link>
      ) : (
        <>{ImageWrapper}</>
      )}
    </div>
  );
};

export default MDXImage;
