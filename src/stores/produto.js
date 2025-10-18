import { defineStore } from 'pinia'
import axios from 'axios'

// Configure axios defaults
axios.defaults.baseURL = '/api'

export const useProdutoStore = defineStore('produto', {
  state: () => ({
    produtos: [],
    produto: null,
    loading: false,
    error: null
  }),

  getters: {
    getProdutoById: (state) => (id) => state.produtos.find(p => p.id === id)
  },

  actions: {

    async fetchProdutos() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get('/produtos')
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
        const response = await axios.get(`/produtos/${id}`)
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
        const response = await axios.post('/produtos', produtoData)
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
        const response = await axios.put(`/produtos/${id}`, produtoData)
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
        await axios.delete(`/produtos/${id}/hard`)
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
