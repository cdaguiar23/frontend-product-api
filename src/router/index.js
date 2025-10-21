import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProdutoListView from '../views/ProdutoListView.vue'
import ProdutoFormView from '../views/ProdutoFormView.vue'
import ProdutoDetailView from '../views/ProdutoDetailView.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'ProdutoList',
    component: ProdutoListView,
    meta: { requiresAuth: true }
  },
  {
    path: '/produtos/novo',
    name: 'ProdutoCreate',
    component: ProdutoFormView,
    meta: { requiresAuth: true }
  },
  {
    path: '/produtos/:id/editar',
    name: 'ProdutoEdit',
    component: ProdutoFormView,
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/produtos/:id',
    name: 'ProdutoDetail',
    component: ProdutoDetailView,
    meta: { requiresAuth: true },
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.name === 'Login' && authStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
