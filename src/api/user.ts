import fetchApi from '@/libs/fetchApi'
import useUserStore from '@/store/user'

interface LoginParams {
  username: string
  password: string
}

export function syncUserStatus() {
  return fetchApi.get('/api/user/status').then(({ isLogin, userInfo }) => {
    useUserStore().setUserLogin(isLogin)
    useUserStore().setUserInfo(userInfo)
  })
}

export function userLogin(params: LoginParams) {
  return fetchApi.post('/api/user/login', params).then((data) => {
    useUserStore().setUserLogin(true)
    syncUserStatus()
  })
}

export default {
  syncUserStatus,
  userLogin,
}
