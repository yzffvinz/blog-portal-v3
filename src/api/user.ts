import fetchApi from '@/libs/fetchApi'
import useMainStore from '@/store'

interface LoginParams {
  username: string
  password: string
}

export function syncUserStatus() {
  return fetchApi.get('/api/user/status').then(({ isLogin }) => {
    useMainStore().setUserLogin(isLogin)
  })
}

export function userLogin(params: LoginParams) {
  return fetchApi.post('/api/user/login', params).then((data) => {
    useMainStore().setUserLogin(true)
  })
}

export default {
  syncUserStatus,
  userLogin,
}
