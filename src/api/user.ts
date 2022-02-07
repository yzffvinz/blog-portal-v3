import fetchApi from '@/libs/fetchApi'
import useMainStore from '@/store'

let store = null
function getStore() {
  if (!store) {
    store = useMainStore()
  }
  return store
}

export function syncUserStatus() {
  return fetchApi.get('/api/user/status').then(({ isLogin }) => {
    getStore().setUserLogin(isLogin)
  })
}

export function userLogin(params) {
  return fetchApi.post('/api/user/login', params).then((data) => {
    getStore().setUserLogin(true)
  })
}

export default {
  syncUserStatus,
  userLogin,
}
