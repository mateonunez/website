'use client';

import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import {
  buildShareUrl,
  copyToClipboard,
  isWebShareSupported,
  openShareWindow,
  shareNative,
} from '@/lib/utils/sharing/share-utils';
import { ensureAbsoluteUrl } from '@/lib/utils/sharing/url-builder';
import type { ShareableContent, ShareOptions, SharePlatform, ShareResult } from '@/types/sharing';

interface UseShareOptions {
  content: ShareableContent;
  showToast?: boolean;
  onSuccess?: (platform: SharePlatform) => void;
  onError?: (error: string) => void;
}

interface UseShareReturn {
  share: (platform: SharePlatform) => Promise<void>;
  isSharing: boolean;
  canUseNativeShare: boolean;
  copyLink: () => Promise<void>;
}

export function useShare({ content, showToast = true, onSuccess, onError }: UseShareOptions): UseShareReturn {
  const [isSharing, setIsSharing] = useState(false);
  const canUseNativeShare = typeof window !== 'undefined' && isWebShareSupported();

  const buildShareOptions = useCallback(
    (_platform: SharePlatform): ShareOptions => {
      const absoluteUrl = ensureAbsoluteUrl(content.url);

      return {
        url: absoluteUrl,
        title: content.title,
        description: content.description,
        hashtags: content.tags?.map((tag) => tag.replace(/\s+/g, '').replace(/^#/, '')),
        via: content.type === 'article' ? 'mmateonunez' : undefined,
        image: content.image,
      };
    },
    [content],
  );

  const handleSuccess = useCallback(
    (platform: SharePlatform, message?: string) => {
      if (showToast) {
        const defaultMessages: Record<SharePlatform, string> = {
          twitter: 'Opening Twitter...',
          linkedin: 'Opening LinkedIn...',
          facebook: 'Opening Facebook...',
          reddit: 'Opening Reddit...',
          whatsapp: 'Opening WhatsApp...',
          telegram: 'Opening Telegram...',
          native: 'Shared successfully!',
          copy: 'Link copied to clipboard!',
        };

        toast.success(message || defaultMessages[platform]);
      }
      onSuccess?.(platform);
    },
    [showToast, onSuccess],
  );

  const handleError = useCallback(
    (error: string) => {
      if (showToast) {
        toast.error(error);
      }
      onError?.(error);
    },
    [showToast, onError],
  );

  const copyLink = useCallback(async () => {
    setIsSharing(true);

    try {
      const absoluteUrl = ensureAbsoluteUrl(content.url);
      const result = await copyToClipboard(absoluteUrl);

      if (result.success) {
        handleSuccess('copy');
      } else {
        handleError(result.error || 'Failed to copy link');
      }
    } catch (error) {
      handleError(error instanceof Error ? error.message : 'Failed to copy link');
    } finally {
      setIsSharing(false);
    }
  }, [content.url, handleSuccess, handleError]);

  const share = useCallback(
    async (platform: SharePlatform) => {
      setIsSharing(true);

      try {
        const options = buildShareOptions(platform);
        let result: ShareResult;

        switch (platform) {
          case 'native': {
            result = await shareNative(options);
            if (result.success) {
              handleSuccess('native');
            } else if (result.error !== 'Share cancelled') {
              handleError(result.error || 'Failed to share');
            }
            break;
          }

          case 'copy': {
            await copyLink();
            break;
          }

          case 'twitter':
          case 'linkedin':
          case 'facebook':
          case 'reddit':
          case 'whatsapp':
          case 'telegram': {
            const shareUrl = buildShareUrl(platform, options);

            if (shareUrl) {
              result = openShareWindow(shareUrl, platform);
              if (result.success) {
                handleSuccess(platform);
              } else {
                handleError(result.error || `Failed to open ${platform}`);
              }
            } else {
              handleError(`Failed to build ${platform} share URL`);
            }
            break;
          }

          default:
            handleError('Unsupported share platform');
        }
      } catch (error) {
        handleError(error instanceof Error ? error.message : 'Failed to share');
      } finally {
        setIsSharing(false);
      }
    },
    [buildShareOptions, copyLink, handleSuccess, handleError],
  );

  return {
    share,
    isSharing,
    canUseNativeShare,
    copyLink,
  };
}
