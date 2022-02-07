import fetchApi from '@/libs/fetchApi'

export function getBlogDetail(params: any) {
  return fetchApi.get('/api/blog/detail', params)
}

export function getBlogList(params: any) {
  return fetchApi.get('/api/blog/list', params)
}

export function addBlog(detail: any) {
  return fetchApi.post('/api/blog/add', detail)
}

export function modBlog(detail: any) {
  return fetchApi.post('/api/blog/modify', detail)
}

export default {
  getBlogDetail,
  getBlogList,
  addBlog,
  modBlog,
}
