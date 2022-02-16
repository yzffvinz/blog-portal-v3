import { defineStore } from 'pinia'

const useMainStore = defineStore('main', {
  state: () => {
    return {
      user: {
        login: false,
      },
    }
  },
  getters: {
    isLogin(): boolean {
      return this.user.login
    },
  },
  actions: {
    setUserLogin(isLogin: boolean) {
      this.user.login = isLogin
    },
  },
})

export default useMainStore
