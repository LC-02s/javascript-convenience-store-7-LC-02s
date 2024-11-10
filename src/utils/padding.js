/**
 * @param {string} value
 * @param {number} length
 */
function padLeft(value, length) {
  return ' '.repeat(length - value.length) + value;
}

/**
 * @param {string} value
 * @param {number} length
 */
function padRight(value, length) {
  return value + ' '.repeat(length - value.length);
}

export { padLeft, padRight };
