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
