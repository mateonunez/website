/**
 * Convert a date into mnemonic date string
 *
 * @param {Object|String} date
 * @returns {String}
 */
function dateForHumans(date) {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
}

/**
 * Convert a date into mnemonic date string
 *
 * @param {Object|String} date
 * @returns {String}
 */
function dateWithoutYearForHumans(date) {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long' }).format(d);
}

/**
 * Convert a date into year string
 *
 * @param {Object|String} date
 * @returns {String}
 */
function yearForHumans(date) {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
}

/**
 * Convert a date into readable time string
 *
 * @param {Object|String} date
 * @returns {String}
 */
function dateFromNowForHumans(date) {
  const d = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now - d) / 1000);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  const units = [
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

export { dateForHumans, dateWithoutYearForHumans, yearForHumans, dateFromNowForHumans };
