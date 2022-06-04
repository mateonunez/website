import moment from 'moment';

/**
 * Convert a date into mnemonic date string
 *
 * @param {Object|String} date
 * @returns {String}
 */
export const dateForHumans = date => moment(date).format('DD MMMM YYYY');

/**
 * Convert a date into mnemonic date string
 *
 * @param {Object|String} date
 * @returns {String}
 */
export const dateWithoutYearForHumans = date => moment(date).format('MMMM DD');

/**
 * Convert a date into year string
 *
 * @param {Object|String} date
 * @returns {String}
 */
export const yearForHumans = date => moment(date).format('YYYY');

/**
 * Convert a date into readeable time string
 *
 * @param {Object|String} date
 * @returns {String}
 */
export const dateFromNowForHumans = date => moment(date).fromNow();
