<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center gap-6">
            <span class="font-bold text-xl text-indigo-600">Demo App</span>
            <RouterLink
              to="/dashboard"
              class="text-sm font-medium transition-colors"
              :class="$route.path === '/dashboard' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'"
            >
              Dashboard
            </RouterLink>
            <RouterLink
              to="/items"
              class="text-sm font-medium transition-colors"
              :class="$route.path.startsWith('/items') ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'"
            >
              Items
            </RouterLink>
            <RouterLink
              v-if="auth.isAdmin"
              to="/users"
              class="text-sm font-medium transition-colors"
              :class="$route.path.startsWith('/users') ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'"
            >
              Usuarios
            </RouterLink>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-sm text-gray-600">{{ auth.user?.full_name }}</span>
            <span
              class="text-xs px-2 py-1 rounded-full font-medium"
              :class="auth.isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'"
            >
              {{ auth.user?.role }}
            </span>
            <button
              @click="handleLogout"
              class="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </nav>
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const $route = useRoute()

function handleLogout() {
  auth.logout()
  router.push('/login')
}
</script>
