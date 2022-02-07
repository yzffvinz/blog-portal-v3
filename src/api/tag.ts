import fetchApi from '@/libs/fetchApi'

export function getMenus() {
  return fetchApi.get(`/api/tag/menu`)
}

export default {
  getMenus,
}
