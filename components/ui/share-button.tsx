'use client';

import { Share2 } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useShare } from '@/hooks/use-share';
import { cn } from '@/lib/utils';
import type { ShareableContent } from '@/types/sharing';

interface ShareButtonProps {
  content: ShareableContent;
  variant?: 'default' | 'ghost' | 'outline' | 'secondary' | 'destructive' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showLabel?: boolean;
  showTooltip?: boolean;
  tooltipText?: string;
  children?: ReactNode;
  align?: 'start' | 'center' | 'end';
}

const platformIcons: Record<string, string> = {
  twitter: '𝕏',
  linkedin: 'in',
  facebook: 'f',
  reddit: '↗',
  whatsapp: '💬',
  telegram: '✈️',
};

const platformLabels: Record<string, string> = {
  twitter: 'Share on X',
  linkedin: 'Share on LinkedIn',
  facebook: 'Share on Facebook',
  reddit: 'Share on Reddit',
  whatsapp: 'Share on WhatsApp',
  telegram: 'Share on Telegram',
  copy: 'Copy link',
  native: 'Share...',
};

export function ShareButton({
  content,
  variant = 'ghost',
  size = 'icon',
  className,
  showLabel = false,
  showTooltip = true,
  tooltipText = 'Share',
  children,
  align = 'end',
}: ShareButtonProps) {
  const { share, canUseNativeShare, isSharing } = useShare({ content });

  const button = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn(
            'transition-transform duration-200',
            'hover:scale-105',
            isSharing && 'opacity-50 cursor-not-allowed',
            className,
          )}
          disabled={isSharing}
          aria-label="Share content"
        >
          {children || (
            <>
              <Share2 className={cn('h-4 w-4', showLabel && 'mr-2')} />
              {showLabel && <span>Share</span>}
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-48">
        {canUseNativeShare && (
          <>
            <DropdownMenuItem onClick={() => share('native')} className="cursor-pointer flex items-center">
              <Share2 className="mr-2 h-4 w-4 shrink-0" />
              <span>{platformLabels.native}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem onClick={() => share('copy')} className="cursor-pointer flex items-center">
          <span className="mr-2 text-base leading-none shrink-0 flex items-center justify-center w-4">🔗</span>
          <span>{platformLabels.copy}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => share('twitter')} className="cursor-pointer flex items-center">
          <span className="mr-2 text-base font-bold leading-none shrink-0 flex items-center justify-center w-4">
            {platformIcons.twitter}
          </span>
          <span>{platformLabels.twitter}</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => share('linkedin')} className="cursor-pointer flex items-center">
          <span className="mr-2 text-base font-bold leading-none shrink-0 flex items-center justify-center w-4">
            {platformIcons.linkedin}
          </span>
          <span>{platformLabels.linkedin}</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => share('facebook')} className="cursor-pointer flex items-center">
          <span className="mr-2 text-base font-bold leading-none shrink-0 flex items-center justify-center w-4">
            {platformIcons.facebook}
          </span>
          <span>{platformLabels.facebook}</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => share('reddit')} className="cursor-pointer flex items-center">
          <span className="mr-2 text-base leading-none shrink-0 flex items-center justify-center w-4">
            {platformIcons.reddit}
          </span>
          <span>{platformLabels.reddit}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => share('whatsapp')} className="cursor-pointer flex items-center">
          <span className="mr-2 text-base leading-none shrink-0 flex items-center justify-center w-4">
            {platformIcons.whatsapp}
          </span>
          <span>{platformLabels.whatsapp}</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => share('telegram')} className="cursor-pointer flex items-center">
          <span className="mr-2 text-base leading-none shrink-0 flex items-center justify-center w-4">
            {platformIcons.telegram}
          </span>
          <span>{platformLabels.telegram}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  if (showTooltip && !showLabel && size === 'icon') {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return button;
}
