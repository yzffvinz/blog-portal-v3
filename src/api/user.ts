import fetchApi from '@/libs/fetchApi'

interface LoginParams {
  username: string
  password: string
}

export function getUserInfo() {
  return fetchApi.get('/api/user/status')
}

export function userLogin(params: LoginParams) {
  return fetchApi.post('/api/user/login', params)
}

export default {
  getUserInfo,
  userLogin,
}
