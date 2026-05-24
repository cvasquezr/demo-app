import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '../services/api'
import type { User } from '../types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const isLoading = ref(true)

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  async function init() {
    if (!token.value) {
      isLoading.value = false
      return
    }
    try {
      const res = await authApi.me()
      user.value = res.data
    } catch {
      localStorage.removeItem('token')
      token.value = null
    } finally {
      isLoading.value = false
    }
  }

  async function login(email: string, password: string) {
    const res = await authApi.login(email, password)
    token.value = res.data.access_token
    localStorage.setItem('token', token.value!)
    const userRes = await authApi.me()
    user.value = userRes.data
  }

  function logout() {
    localStorage.removeItem('token')
    token.value = null
    user.value = null
  }

  return { user, token, isLoading, isAuthenticated, isAdmin, init, login, logout }
})
