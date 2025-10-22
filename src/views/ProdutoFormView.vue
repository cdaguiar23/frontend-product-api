<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h3>{{ isEditing ? 'Editar Produto' : 'Novo Produto' }}</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="nome" class="form-label">Nome *</label>
                <input
                  type="text"
                  class="form-control"
                  id="nome"
                  v-model="form.nome"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="descricao" class="form-label">Descrição</label>
                <textarea
                  class="form-control"
                  id="descricao"
                  v-model="form.descricao"
                  rows="3"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="responsavel" class="form-label">Responsável</label>
                <input
                  type="text"
                  class="form-control"
                  id="responsavel"
                  v-model="form.responsavel"
                />
              </div>
              <div class="mb-3">
                <label for="tipoCategoria" class="form-label">Categoria</label>
                <select
                  class="form-control"
                  id="tipoCategoria"
                  v-model="form.tipoCategoria"
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="ELETRONICO">Eletrônico</option>
                  <option value="ROUPA">Roupa</option>
                  <option value="ALIMENTO">Alimento</option>
                  <option value="OUTRO">Outro</option>
                </select>
              </div>
              <div v-if="produtoStore.error" class="alert alert-danger">
                {{ produtoStore.error }}
              </div>
              <div class="d-flex gap-2">
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="produtoStore.loading"
                >
                  <span v-if="produtoStore.loading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ isEditing ? 'Atualizar' : 'Criar' }}
                </button>
                <router-link to="/" class="btn btn-secondary">Cancelar</router-link>
              </div>
            </form>
          </div>
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

const isEditing = ref(false)
const form = ref({
  nome: '',
  descricao: '',
  responsavel: '',
  tipoCategoria: ''
})

onMounted(async () => {
  if (route.params.id) {
    isEditing.value = true
    try {
      const produto = await produtoStore.fetchProdutoById(route.params.id)
      form.value = {
        nome: produto.nome,
        descricao: produto.descricao || '',
        responsavel: produto.responsavel || '',
        tipoCategoria: produto.tipoCategoria || ''
      }
    } catch (error) {
      router.push('/')
    }
  }
})

const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      await produtoStore.updateProduto(route.params.id, form.value)
    } else {
      await produtoStore.createProduto(form.value)
    }
    router.push('/produtos')
  } catch (error) {
    // Error is handled in the store
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
