export const isObject = (o) => {
  return typeof o === 'object' && !Array.isArray(o) && o !== null
}
