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
    isLogin(): any {
      return this.user.login
    },
  },
  actions: {
    setUserLogin(isLogin: any) {
      this.user.login = isLogin
    },
  },
})

export default useMainStore
