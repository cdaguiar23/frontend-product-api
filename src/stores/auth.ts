import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

interface User {
  username: string
  role: string
}

interface Credentials {
  username: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null as string | null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    username: (state) => state.user?.username || '',
    role: (state) => state.user?.role || ''
  },

  actions: {
    async login(credentials: Credentials) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials)
        const { token, username, role } = response.data

        this.token = token
        this.user = { username, role }

        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        return response.data
      } catch (error: unknown) {
        this.error = (error as any).response?.data?.message || 'Erro no login'
        console.error('Erro no login:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    },

    initializeAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        // You might want to validate the token here or fetch user info
      }
    }
  }
})
