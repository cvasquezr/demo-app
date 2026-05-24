import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: () => import('../views/LoginView.vue'), meta: { guest: true } },
    { path: '/register', component: () => import('../views/RegisterView.vue'), meta: { guest: true } },
    {
      path: '/',
      component: () => import('../components/AppLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: '', redirect: '/dashboard' },
        { path: 'dashboard', component: () => import('../views/DashboardView.vue') },
        { path: 'items', component: () => import('../views/ItemsView.vue') },
        { path: 'users', component: () => import('../views/UsersView.vue'), meta: { requiresAdmin: true } },
      ],
    },
  ],
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()

  if (auth.isLoading) await auth.init()

  if (to.meta.requiresAuth && !auth.isAuthenticated) return '/login'
  if (to.meta.guest && auth.isAuthenticated) return '/dashboard'
  if (to.meta.requiresAdmin && !auth.isAdmin) return '/dashboard'
})

export default router
