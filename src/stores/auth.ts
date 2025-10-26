import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'

interface JwtUser {
    sub?: string
    email?: string
    fullName?: string
    full_name?: string
    [key: string]: any
}

function parseJwt(token: string): JwtUser {
    try {
        const payload = token.split('.')[1]
        const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
        return JSON.parse(decodeURIComponent(escape(decoded)))
    } catch {
        return {}
    }
}

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('jwt') || '')
    const user = ref<JwtUser>(token.value ? parseJwt(token.value) : {})

    const isAuthenticated = computed(() => !!token.value)

    function setToken(tkn: string) {
        token.value = tkn
        localStorage.setItem('jwt', tkn)
        user.value = parseJwt(tkn)
    }

    function logout() {
        token.value = ''
        user.value = {}
        localStorage.removeItem('jwt')
    }

    async function signin(payload: { email: string; password: string }) {
        const res = await api.post('/api/v1/auth/signin', payload)
        const data = res.data
        // Save raw token (access_token) for parsing & sending; store only access_token
        setToken(data.access_token)
    }

    return { token, user, isAuthenticated, setToken, logout, signin }
})
