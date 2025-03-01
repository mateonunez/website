import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function trimText(text: string | undefined, maxLength = 30): string {
  if (!text) return 'No description available';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}
