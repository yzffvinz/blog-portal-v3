export function obj2querystring(params: any = {}) {
  return Object.keys(params)
    .reduce((sum: string, k: string) => {
      if (params[k] !== undefined) {
        return `${sum}&${k}=${params[k]}`
      }
      return sum
    }, '')
    .slice(1)
}

export default {}
