import type { ShareOptions, SharePlatform, ShareResult } from '@/types/sharing';

export function isWebShareSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'share' in navigator && typeof navigator.share === 'function';
}

export function isClipboardSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'clipboard' in navigator && typeof navigator.clipboard?.writeText === 'function';
}

export function buildTwitterShareUrl(options: ShareOptions): string {
  const params = new URLSearchParams();

  const text = options.description ? `${options.title}\n\n${options.description}` : options.title;
  params.append('text', text);
  params.append('url', options.url);

  if (options.via) {
    params.append('via', options.via);
  }

  if (options.hashtags && options.hashtags.length > 0) {
    params.append('hashtags', options.hashtags.join(','));
  }

  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

export function buildLinkedInShareUrl(options: ShareOptions): string {
  const params = new URLSearchParams();
  params.append('url', options.url);
  return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`;
}

export function buildFacebookShareUrl(options: ShareOptions): string {
  const params = new URLSearchParams();
  params.append('u', options.url);
  return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;
}

export function buildRedditShareUrl(options: ShareOptions): string {
  const params = new URLSearchParams();
  params.append('url', options.url);
  params.append('title', options.title);
  return `https://reddit.com/submit?${params.toString()}`;
}

export function buildWhatsAppShareUrl(options: ShareOptions): string {
  const text = options.description
    ? `${options.title}\n\n${options.description}\n\n${options.url}`
    : `${options.title}\n\n${options.url}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function buildTelegramShareUrl(options: ShareOptions): string {
  const params = new URLSearchParams();
  params.append('url', options.url);
  params.append('text', options.description ? `${options.title}\n\n${options.description}` : options.title);
  return `https://t.me/share/url?${params.toString()}`;
}

export function buildShareUrl(platform: SharePlatform, options: ShareOptions): string | null {
  switch (platform) {
    case 'twitter':
      return buildTwitterShareUrl(options);
    case 'linkedin':
      return buildLinkedInShareUrl(options);
    case 'facebook':
      return buildFacebookShareUrl(options);
    case 'reddit':
      return buildRedditShareUrl(options);
    case 'whatsapp':
      return buildWhatsAppShareUrl(options);
    case 'telegram':
      return buildTelegramShareUrl(options);
    default:
      return null;
  }
}

export async function copyToClipboard(text: string): Promise<ShareResult> {
  try {
    if (isClipboardSupported()) {
      await navigator.clipboard.writeText(text);
      return { success: true, platform: 'copy' };
    }

    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);

    if (successful) {
      return { success: true, platform: 'copy' };
    }

    return { success: false, error: 'Failed to copy to clipboard' };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to copy to clipboard',
    };
  }
}

export async function shareNative(options: ShareOptions): Promise<ShareResult> {
  if (!isWebShareSupported()) {
    return { success: false, error: 'Web Share API not supported' };
  }

  try {
    const shareData: ShareData = {
      title: options.title,
      text: options.description,
      url: options.url,
    };

    await navigator.share(shareData);
    return { success: true, platform: 'native' };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { success: false, error: 'Share cancelled' };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to share',
    };
  }
}

export function openShareWindow(url: string, platform: SharePlatform): ShareResult {
  try {
    const width = 600;
    const height = 600;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    const features = `width=${width},height=${height},left=${left},top=${top},toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=1`;

    const newWindow = window.open(url, '_blank', features);

    if (newWindow) {
      newWindow.focus();
      return { success: true, platform };
    }

    window.open(url, '_blank', 'noopener,noreferrer');
    return { success: true, platform };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to open share window',
    };
  }
}
