const BASE_URL = import.meta.env.BASE_URL || '/'
export function modifyRouteTo (to) {
  return typeof to === 'string' 
    ? withBaseUrl(to)
    : paramsValuesToStrings(to)
}
export function paramsValuesToStrings(to) {
  return {
      ...to,
      params: !to.params 
        ? {} 
        : Object.entries(to.params).reduce((newParams, [paramName, paramValue]) => {
            const isDefined = paramValue !== undefined || paramValue !== null
            if (isDefined) newParams[paramName] = JSON.stringify(paramValue)
            return newParams
          }
        , {})
  }
}
export function withBaseUrl(string) {
  return (BASE_URL + string).replace('//', '/')
}