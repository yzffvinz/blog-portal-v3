export function obj2querystring(params: any = {}) {
  return Object.keys(params)
    .reduce((sum: string, k: string) => {
      return `${sum}&${k}=${params[k]}`
    }, '')
    .slice(1)
}

export default {}
