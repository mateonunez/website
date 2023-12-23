/**
 * Convert a string into kebap-case
 *
 * @param {String} str
 * @returns {String}
 */
const kebapCase = (str) =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join('-');

/**
 * Get thi initials from string
 *
 * @param {String} str
 * @returns {String}
 */
const initials = (str) =>
  str
    .match(/(?<=\s|^)\p{L}\p{Mn}*/gu)
    ?.filter((_, i, array) => i === 0 || i === array.length - 1)
    .join('') || '';

export { kebapCase, initials };
