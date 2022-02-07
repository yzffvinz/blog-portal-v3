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
    isLogin() {
      return this.user.login
    },
  },
  actions: {
    setUserLogin(isLogin) {
      this.user.login = isLogin
    },
  },
})

export default useMainStore
