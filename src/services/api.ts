import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { useAuthStore } from '../stores/auth'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080'

const instance = axios.create({ baseURL: API_BASE })

// attach token
instance.interceptors.request.use((config: AxiosRequestConfig) => {
    try {
        const auth = useAuthStore()
        if (auth.token) config.headers = { ...config.headers, Authorization: 'Bearer ' + auth.token }
    } catch (e) { }
    return config
})

export default instance
