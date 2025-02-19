import { cn } from '@/lib/utils';
import NextImage from 'next/image';
import type { ImgHTMLAttributes } from 'react';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export function Image({ src, alt, className, width, height, ...props }: ImageProps) {
  // Handle external images
  if (src.startsWith('http')) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <NextImage
          src={src}
          alt={alt}
          width={width || 1200}
          height={height || 630}
          className={cn('object-cover', className)}
          {...props}
        />
      </div>
    );
  }

  // Handle local images
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
      <NextImage
        src={src}
        alt={alt}
        width={width || 1200}
        height={height || 630}
        className={cn('object-cover', className)}
        {...props}
      />
    </div>
  );
}
