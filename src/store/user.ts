import { defineStore } from 'pinia'

interface UserInfo {
  Bucket: string
  Region: string
  SecretId: string
  SecretKey: string
  exp: number
  iat: number
  username: string
}

const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {
        login: false,
        userInfo: {
          Bucket: '',
          Region: '',
          SecretId: '',
          SecretKey: '',
          exp: 0,
          iat: 0,
          username: '',
        },
      },
    }
  },
  getters: {
    isLogin(state): boolean {
      return state.user.login
    },
    userInfo(state): UserInfo {
      return state.user.userInfo
    },
  },
  actions: {
    setUserLogin(isLogin: boolean) {
      this.user.login = isLogin
    },
    setUserInfo(userInfo: UserInfo) {
      this.user.userInfo = userInfo
    },
  },
})

export default useUserStore
