export interface TagDetail {
  name: string
  displayName: string
  description: string
}

export interface BlogDetail {
  _id: string
  title: string
  cover: string
  description: string
  author: string
  category: string
  tags: string[]
  createtime: number
  updatetime: number
  content: string
}
