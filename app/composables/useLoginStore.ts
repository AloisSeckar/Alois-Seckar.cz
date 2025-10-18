import CryptoJS from 'crypto-js'

export const useLoginStore = defineStore('login-store', () => {
  const login = ref(false)

  const setLogin = (pwd: string) => {
    const hash = CryptoJS.SHA256(pwd).toString()

    if (hash === useRuntimeConfig().public.key) {
      login.value = true
    } else {
      log.warn('Wrong password!')
    }
  }

  return {
    login, setLogin,
  }
})
