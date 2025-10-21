<template>
  <div class="container-fluid d-flex align-items-center justify-content-center min-vh-100">
    <div class="row justify-content-center w-100">
      <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">Login</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="username" class="form-label">Usuário</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  v-model="credentials.username"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Senha</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="credentials.password"
                  required
                />
              </div>
              <div v-if="authStore.error" class="alert alert-danger">
                {{ authStore.error }}
              </div>
              <button
                type="submit"
                class="btn btn-primary w-100"
                :disabled="authStore.loading"
              >
                <span v-if="authStore.loading" class="spinner-border spinner-border-sm me-2"></span>
                Entrar
              </button>
            </form>
            <div class="text-center mt-3">
              <router-link to="/register" class="btn btn-link">Criar novo usuário</router-link>
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
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const credentials = ref({
  username: '',
  password: ''
})

const handleLogin = async () => {
  try {
    await authStore.login(credentials.value)
    router.push('/')
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
