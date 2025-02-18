type DateInput = Date | string | number;
type RelativeTimeUnit = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second';

interface TimeUnit {
  unit: RelativeTimeUnit;
  seconds: number;
}

export function dateForHumans(date: DateInput): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

export function dateWithoutYearForHumans(date: DateInput): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
  }).format(d);
}

export function yearForHumans(date: DateInput): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
  }).format(d);
}

export function dateFromNowForHumans(date: DateInput): string {
  const d = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  const units: TimeUnit[] = [
    { unit: 'year', seconds: 31536000 },
    { unit: 'month', seconds: 2592000 },
    { unit: 'week', seconds: 604800 },
    { unit: 'day', seconds: 86400 },
    { unit: 'hour', seconds: 3600 },
    { unit: 'minute', seconds: 60 },
    { unit: 'second', seconds: 1 },
  ];

  for (const { unit, seconds } of units) {
    if (Math.abs(diffInSeconds) >= seconds) {
      const value = Math.floor(diffInSeconds / seconds);
      return rtf.format(-value, unit);
    }
  }

  return '';
}
