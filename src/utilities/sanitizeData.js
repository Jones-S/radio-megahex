export function sanitizeFilterData(data) {
  return phpArrayToJavaScriptArray(data)
}

/*
 * PHP Arrays (= Objects) to JavaScript Arrays
 */
export function phpArrayToJavaScriptArray(obj) {
  if (obj) {
    const array = []
    Object.keys(obj).forEach(key => {
      // kirby sets .value
      array.push(obj[key].value)
    })
    return array
  }
}
