import fetchApi from '@/libs/fetchApi'

export function getMenus() {
  return fetchApi.get(`/api/tag/menu`)
}

export function getCategories() {
  return fetchApi.get(`/api/tag/category`)
}

export function getTags() {
  return fetchApi.get(`/api/tag/tag`)
}

export default {
  getMenus,
  getCategories,
  getTags,
}
