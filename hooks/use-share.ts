'use client';

import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { trackShare } from '@/lib/analytics';
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

      trackShare.initiated('copy', content.type, content.title, absoluteUrl);

      const result = await copyToClipboard(absoluteUrl);

      if (result.success) {
        trackShare.copyLink(content.type, content.title, absoluteUrl);
        handleSuccess('copy');
      } else {
        trackShare.failed('copy', content.type, content.title, absoluteUrl);
        handleError(result.error || 'Failed to copy link');
      }
    } catch (error) {
      trackShare.failed('copy', content.type, content.title, content.url);
      handleError(error instanceof Error ? error.message : 'Failed to copy link');
    } finally {
      setIsSharing(false);
    }
  }, [content, handleSuccess, handleError]);

  const share = useCallback(
    async (platform: SharePlatform) => {
      setIsSharing(true);

      trackShare.initiated(platform, content.type, content.title, content.url);

      try {
        const options = buildShareOptions(platform);
        let result: ShareResult;

        switch (platform) {
          case 'native': {
            result = await shareNative(options);
            if (result.success) {
              trackShare.success(platform, content.type, content.title, content.url);
              handleSuccess('native');
            } else if (result.error !== 'Share cancelled') {
              trackShare.failed(platform, content.type, content.title, content.url);
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
                trackShare.success(platform, content.type, content.title, content.url);
                handleSuccess(platform);
              } else {
                trackShare.failed(platform, content.type, content.title, content.url);
                handleError(result.error || `Failed to open ${platform}`);
              }
            } else {
              trackShare.failed(platform, content.type, content.title, content.url);
              handleError(`Failed to build ${platform} share URL`);
            }
            break;
          }

          default:
            trackShare.failed(platform, content.type, content.title, content.url);
            handleError('Unsupported share platform');
        }
      } catch (error) {
        trackShare.failed(platform, content.type, content.title, content.url);
        handleError(error instanceof Error ? error.message : 'Failed to share');
      } finally {
        setIsSharing(false);
      }
    },
    [buildShareOptions, copyLink, handleSuccess, handleError, content],
  );

  return {
    share,
    isSharing,
    canUseNativeShare,
    copyLink,
  };
}
