/**
 * Remove leading slash.
 *
 * @param  {string} str
 * @return {string}
 *
 * @example
 *
 * removeLeadingSlash('/myslug/')
 *  -> 'myslug/'
 */

export function removeLeadingSlash(str) {
  if (!str) return
  return str.startsWith('/') ? str.substr(1) : str
}

/**
 * Remove trailing slash.
 *
 * @param  {string} str
 * @return {string}
 *
 * @example
 *
 * removeTrailingSlash('/myslug/')
 *  -> '/myslug'
 */

export function removeTrailingSlash(str) {
  if (!str) return
  return str.endsWith('/') ? str.slice(0, -1) : str
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
