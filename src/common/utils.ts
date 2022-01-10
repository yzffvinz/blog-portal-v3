export function throttle(func, duration: number = 500, context = null) {
  let timer: number = 0
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
