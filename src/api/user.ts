import fetchApi from '@/libs/fetchApi'
import useMainStore from '@/store'

interface LoginParams {
  username: string
  password: string
}

export function syncUserStatus() {
  return fetchApi.get('/api/user/status').then(({ isLogin, userInfo }) => {
    useMainStore().setUserLogin(isLogin)
    useMainStore().setUserInfo(userInfo)
  })
}

export function userLogin(params: LoginParams) {
  return fetchApi.post('/api/user/login', params).then((data) => {
    useMainStore().setUserLogin(true)
    syncUserStatus()
  })
}

export default {
  syncUserStatus,
  userLogin,
}
