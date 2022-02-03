import { obj2querystring } from '../url'

export function apiGet(url: string, params?: any) {
  return fetch(`${url}?${obj2querystring(params)}`)
    .then((res) => res.json())
    .then(({ code, msg, data }) => {
      if (code) {
        return Promise.reject(msg)
      }
      return data
    })
}

export function apiPost(url: string, params?: any) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: params && JSON.stringify(params),
  })
    .then((res) => res.json())
    .then(({ code, msg, data }) => {
      if (code) {
        return Promise.reject(msg)
      }
      return data
    })
}

export default {
  get: apiGet,
  post: apiPost,
}
