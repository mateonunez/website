/**
 *
 * @param {Array} array
 * @returns {Array}
 */
const shuffleArray = array => {
  for (let i = array.length - 1; i >= 0; i--) {
    const randomKey = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[randomKey];
    array[randomKey] = temp;
  }

  return array;
};

export { shuffleArray };
