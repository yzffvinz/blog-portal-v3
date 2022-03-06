import fetchApi from '@/libs/fetchApi'

interface BlogDetailParams {
  _id: string
}

interface BlogListParams {
  tag?: string
  pnum: number
  psize: number
}

export interface BlogDetail {
  _id?: string
  title: string
  cover: string
  description: string
  category: string
  tags: string[]
  content: string
  hide: number
}

export function getBlogDetail(params: BlogDetailParams) {
  return fetchApi.get('/api/blog/detail', params)
}

export function getBlogList(params: BlogListParams) {
  return fetchApi.get('/api/blog/list', params)
}

export function addBlog(detail: BlogDetail) {
  return fetchApi.post('/api/blog/add', detail)
}

export function modBlog(detail: BlogDetail) {
  return fetchApi.post('/api/blog/modify', detail)
}

export default {
  getBlogDetail,
  getBlogList,
  addBlog,
  modBlog,
}
