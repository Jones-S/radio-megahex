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

/**
 * Merge two arrays of objects with same values.
 * If the value of key1 in an object of first array
 * matches the value of key2 in the second array
 * We merge those objects
 *
 * @param  {Array} array1 // First array
 * @param  {Array} array2 // Second array
 * @param  {string} key1 // Key of first array to union by
 * @param  {string} key2 // Key of second array to union by
 * @return {Array}
 *
 * @example
 *
 */

export function mergeArraysByValue(array1, array2, key1, key2) {
  const mergedArray = new Map

  array1.concat(array2).forEach((item, index) => {
    // if no key exists we don't want to lose the item
    // so we save the items data in a key with the index instead of a key of 'undefined'
    // because the undefined key would be overridden by every item that has no key1 or key2 present.
    const propertyValue = item[key1] || item[key2] || index
    mergedArray.has(propertyValue)
      ? mergedArray.set(propertyValue, { ...item, ...mergedArray.get(propertyValue) })
      : mergedArray.set(propertyValue, item)
  })

  return Array.from(mergedArray.values())
}

/**
 *
 *
 * @param  {Array} array1 // First array
 * @param  {Array} array2 // Second array
 * @param  {string} key1 // Key of first array to union by
 * @param  {string} key2 // Key of second array to union by
 * @return {Array}
 *
 * @example
 *
 */

export function transformMapToArrayDeep(map) {
  const array = []

  for (let [key, value] of map.entries()) {
    let item

    const isIterable = value ? typeof value[Symbol.iterator] === 'function' : false
    if (isIterable) {
      value = transformMapToArrayDeep(value)
      item = {
        name: key,
        items: value
      }
    } else {
      item = {
        name: key,
        ...value
      }
    }
    array.push(item)
  }

  return array
}

