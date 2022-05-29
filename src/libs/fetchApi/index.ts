import { obj2querystring } from '../url'

export function apiGet(url: string, params?: any) {
  const urlWithParams = params ? `${url}?${obj2querystring(params)}` : url
  return fetch(import.meta.env.VITE_API_HOST + urlWithParams)
    .then((res) => res.json())
    .then(({ status, msg, data }) => {
      if (status) {
        return Promise.reject(msg)
      }
      return data
    })
}

export function apiPost(url: string, params?: any) {
  return fetch(import.meta.env.VITE_API_HOST + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: params && JSON.stringify(params),
  })
    .then((res) => res.json())
    .then(({ status, msg, data }) => {
      if (status) {
        return Promise.reject(msg)
      }
      return data
    })
}

export default {
  get: apiGet,
  post: apiPost,
}
