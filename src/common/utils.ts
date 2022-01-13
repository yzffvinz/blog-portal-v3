export function throttle(func: any, duration: number = 500, context = null) {
  let timer: any = 0
  return function throttled(...args: any[]) {
    if (!timer) {
      func.call(context, ...args)
      timer = setTimeout(() => {
        timer = 0
      }, duration)
    }
  }
}

export function debounce() {}

export default {}
