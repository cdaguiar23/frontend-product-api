<template>
  <div class="container-fluid d-flex align-items-center justify-content-center min-vh-100">
    <div class="row justify-content-center w-100">
      <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">Cadastrar Usuário</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleRegister">
              <div class="mb-3">
                <label for="username" class="form-label">Usuário</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  v-model="userData.username"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Senha</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="userData.password"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirmar Senha</label>
                <input
                  type="password"
                  class="form-control"
                  id="confirmPassword"
                  v-model="userData.confirmPassword"
                  required
                />
              </div>
              <div v-if="error" class="alert alert-danger">
                {{ error }}
              </div>
              <div v-if="success" class="alert alert-success">
                {{ success }}
              </div>
              <button
                type="submit"
                class="btn btn-primary w-100"
                :disabled="loading"
              >
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                Cadastrar
              </button>
            </form>
            <div class="text-center mt-3">
              <router-link to="/login" class="btn btn-link">Voltar ao Login</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const userData = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const error = ref('')
const success = ref('')

const handleRegister = async () => {
  if (userData.value.password !== userData.value.confirmPassword) {
    error.value = 'As senhas não coincidem'
    return
  }

  loading.value = true
  error.value = ''
  success.value = ''

  try {
    const response = await axios.post('http://localhost:8080/api/users/register', {
      username: userData.value.username,
      password: userData.value.password
    })

    success.value = 'Usuário criado com sucesso!'
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (err) {
    error.value = err.response?.data?.message || 'Erro ao criar usuário'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
