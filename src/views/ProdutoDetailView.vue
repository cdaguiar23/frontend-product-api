<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card" v-if="produto">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h3>{{ produto.nome }}</h3>
            <div>
              <router-link :to="`/produtos/${produto.id}/editar`" class="btn btn-warning btn-sm me-2">Editar</router-link>
              <router-link to="/" class="btn btn-secondary btn-sm">Voltar</router-link>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <h5>Informações</h5>
                <p><strong>Nome:</strong> {{ produto.nome }}</p>
                <p><strong>Descrição:</strong> {{ produto.descricao || 'N/A' }}</p>
                <p><strong>Responsável:</strong> {{ produto.responsavel || 'N/A' }}</p>
                <p><strong>Categoria:</strong> {{ produto.tipoCategoria || 'N/A' }}</p>
              </div>
              <div class="col-md-6">
                <h5>Datas</h5>
                <p><strong>Criado em:</strong> {{ formatDate(produto.dataCriacao) }}</p>
                <p><strong>Modificado em:</strong> {{ formatDate(produto.dataModificacao) }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="produtoStore.loading" class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
        </div>
        <div v-else class="alert alert-danger">
          Produto não encontrado
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProdutoStore } from '../stores/produto'

const route = useRoute()
const router = useRouter()
const produtoStore = useProdutoStore()

const produto = ref(null)

onMounted(async () => {
  try {
    produto.value = await produtoStore.fetchProdutoById(route.params.id)
  } catch (error) {
    router.push('/')
  }
})

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleString('pt-BR')
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
