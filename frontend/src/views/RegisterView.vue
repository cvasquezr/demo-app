<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Crear Cuenta</h1>
      <p class="text-gray-500 text-sm mb-6">Completa el formulario para registrarte</p>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
          <input
            v-model="form.full_name"
            type="text"
            required
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            v-model="form.email"
            type="email"
            required
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input
            v-model="form.password"
            type="password"
            required
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
        >
          {{ loading ? 'Registrando...' : 'Registrarse' }}
        </button>
      </form>

      <p class="text-center text-sm text-gray-500 mt-4">
        ¿Ya tienes cuenta?
        <RouterLink to="/login" class="text-indigo-600 font-medium hover:underline">
          Iniciar sesión
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { authApi } from '../services/api'

const router = useRouter()

const form = reactive({ email: '', full_name: '', password: '' })
const error = ref('')
const loading = ref(false)

async function handleSubmit() {
  error.value = ''
  loading.value = true
  try {
    await authApi.register(form)
    router.push('/login')
  } catch (err: unknown) {
    const e = err as { response?: { data?: { detail?: string } } }
    error.value = e.response?.data?.detail ?? 'Error al registrarse'
  } finally {
    loading.value = false
  }
}
</script>
