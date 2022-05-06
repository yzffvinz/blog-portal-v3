import md5 from 'js-md5'
import { getUserInfo, userLogin } from '@/api/user'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

interface UserInfo {
  Bucket: string
  Region: string
  SecretId: string
  SecretKey: string
  exp: number
  iat: number
  username: string
}

const useUserStore = defineStore('user', () => {
  const userStatus = reactive({
    isLogin: false,
    userInfo: {
      Bucket: '',
      Region: '',
      SecretId: '',
      SecretKey: '',
      exp: 0,
      iat: 0,
      username: '',
    } as UserInfo,
  })

  // 获取用户信息
  function syncUserStatus() {
    return getUserInfo().then(({ isLogin, userInfo }) => {
      userStatus.isLogin = isLogin
      userStatus.userInfo = userInfo
    })
  }

  // 登陆方法
  function login(username: string, rawPassword: string) {
    const password = md5(rawPassword)
    return userLogin({ username, password }).then(() => {
      return syncUserStatus()
    })
  }

  // 首次打开，同步登陆状态
  syncUserStatus()

  return {
    userStatus,
    login,
  }
})

export default useUserStore
