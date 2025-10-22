<template>
  <div class="container mt-4">
    <div class="alert alert-success mb-4" role="alert">
      <h4 class="alert-heading">Bem-vindo, {{ authStore.username }}!</h4>
      <p>Você está logado no sistema de gerenciamento de produtos.</p>
    </div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Produtos</h1>
      <div>
        <button @click="logout" class="btn btn-outline-secondary me-2">Sair</button>
        <router-link to="/produtos/novo" class="btn btn-primary">Novo Produto</router-link>
      </div>
    </div>

    <div class="mb-4">
      <input
        type="text"
        class="form-control"
        placeholder="Pesquisar produtos por nome..."
        v-model="searchQuery"
      />
    </div>

    <div v-if="produtoStore.loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>

    <div v-else-if="produtoStore.error" class="alert alert-danger">
      {{ produtoStore.error }}
    </div>

    <div v-else class="row">
      <div v-for="produto in filteredProdutos" :key="produto.id" class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ produto.nome }}</h5>
            <p class="card-text">{{ produto.descricao || 'Sem descrição' }}</p>
            <p class="card-text"><small class="text-muted">Responsável: {{ produto.responsavel }}</small></p>
            <p class="card-text"><small class="text-muted">Categoria: {{ produto.tipoCategoria }}</small></p>
          </div>
          <div class="card-footer">
            <router-link :to="`/produtos/${produto.id}`" class="btn btn-info btn-sm me-2">Ver</router-link>
            <router-link :to="`/produtos/${produto.id}/editar`" class="btn btn-warning btn-sm me-2">Editar</router-link>
            <button @click="confirmDelete(produto)" class="btn btn-danger btn-sm">Excluir</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de confirmação -->
  <div class="modal fade" id="deleteModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirmar Exclusão</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          Tem certeza que deseja excluir o produto "{{ produtoToDelete?.nome }}"?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-danger" @click="deleteProduto" data-bs-dismiss="modal">Excluir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProdutoStore } from '../stores/produto'
import { useAuthStore } from '../stores/auth'
import * as bootstrap from 'bootstrap'

const router = useRouter()
const produtoStore = useProdutoStore()
const authStore = useAuthStore()

const produtoToDelete = ref(null)
const searchQuery = ref('')

onMounted(() => {
  produtoStore.fetchProdutos()
})

const filteredProdutos = computed(() => {
  if (!searchQuery.value) {
    return produtoStore.produtos
  }
  return produtoStore.produtos.filter(produto =>
    produto.nome.toLowerCase().startsWith(searchQuery.value.toLowerCase())
  )
})

const logout = () => {
  authStore.logout()
  router.push('/login')
}

const confirmDelete = (produto) => {
  produtoToDelete.value = produto
  const modal = new bootstrap.Modal(document.getElementById('deleteModal'))
  modal.show()
}

const deleteProduto = async () => {
  if (produtoToDelete.value) {
    try {
      await produtoStore.deleteProduto(produtoToDelete.value.id)
      produtoToDelete.value = null
    } catch (error) {
      // Error is handled in the store
    }
  }
}
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
