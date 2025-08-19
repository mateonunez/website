import NextImage from 'next/image';
import type { ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
}

export function Image({ src, alt, className, width, height, sizes, priority = false, ...props }: ImageProps) {
  if (src.startsWith('http')) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg my-2">
        <NextImage
          src={src}
          alt={alt}
          width={width || 1200}
          height={height || 630}
          className={cn('object-cover', className)}
          sizes={sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1280px) 80vw, 1200px'}
          loading={priority ? 'eager' : 'lazy'}
          priority={priority}
          {...props}
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full max-w-dvw overflow-hidden rounded-lg my-2">
      <NextImage
        src={src}
        alt={alt}
        width={width || 1200}
        height={height || 630}
        className={cn('object-cover', className)}
        sizes={sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1280px) 80vw, 1200px'}
        loading={priority ? 'eager' : 'lazy'}
        priority={priority}
        {...props}
      />
    </div>
  );
}
