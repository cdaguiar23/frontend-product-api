import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

export const useProdutoStore = defineStore('produto', {
  state: () => ({
    produtos: [],
    produto: null,
    loading: false,
    error: null,
    token: localStorage.getItem('token') || null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    getProdutoById: (state) => (id) => state.produtos.find(p => p.id === id)
  },

  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },

    clearToken() {
      this.token = null
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    },

    async fetchProdutos() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`${API_BASE_URL}/produtos`)
        this.produtos = response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Erro ao buscar produtos'
        console.error('Erro ao buscar produtos:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchProdutoById(id) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`${API_BASE_URL}/produtos/${id}`)
        this.produto = response.data
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Erro ao buscar produto'
        console.error('Erro ao buscar produto:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async createProduto(produtoData) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post(`${API_BASE_URL}/produtos`, produtoData)
        this.produtos.push(response.data)
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Erro ao criar produto'
        console.error('Erro ao criar produto:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateProduto(id, produtoData) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.put(`${API_BASE_URL}/produtos/${id}`, produtoData)
        const index = this.produtos.findIndex(p => p.id === id)
        if (index !== -1) {
          this.produtos[index] = response.data
        }
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Erro ao atualizar produto'
        console.error('Erro ao atualizar produto:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteProduto(id) {
      this.loading = true
      this.error = null
      try {
        await axios.delete(`${API_BASE_URL}/produtos/${id}/hard`)
        this.produtos = this.produtos.filter(p => p.id !== id)
      } catch (error) {
        this.error = error.response?.data?.message || 'Erro ao deletar produto'
        console.error('Erro ao deletar produto:', error)
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
