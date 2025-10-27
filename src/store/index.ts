import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string>(localStorage.getItem('token') || '')
    const user = ref<any>(null)

    function setToken(newToken: string) {
        token.value = newToken
        localStorage.setItem('token', newToken)
    }

    function clearToken() {
        token.value = ''
        localStorage.removeItem('token')
        user.value = null
    }

    function setUser(u: any) {
        user.value = u
    }

    return { token, user, setToken, clearToken, setUser }
})
