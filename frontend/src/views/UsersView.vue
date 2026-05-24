<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Gestión de Usuarios</h1>

    <p v-if="loading" class="text-gray-500">Cargando...</p>
    <div v-else class="bg-white rounded-xl shadow-sm border overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="text-left px-6 py-3 font-medium text-gray-500">Nombre</th>
            <th class="text-left px-6 py-3 font-medium text-gray-500">Email</th>
            <th class="text-left px-6 py-3 font-medium text-gray-500">Rol</th>
            <th class="text-left px-6 py-3 font-medium text-gray-500">Estado</th>
            <th class="text-left px-6 py-3 font-medium text-gray-500">Registro</th>
            <th class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 font-medium text-gray-900">{{ user.full_name }}</td>
            <td class="px-6 py-4 text-gray-500">{{ user.email }}</td>
            <td class="px-6 py-4">
              <span
                class="px-2 py-1 rounded-full text-xs font-medium"
                :class="user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'"
              >
                {{ user.role }}
              </span>
            </td>
            <td class="px-6 py-4">
              <span
                class="px-2 py-1 rounded-full text-xs font-medium"
                :class="user.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
              >
                {{ user.is_active ? 'Activo' : 'Inactivo' }}
              </span>
            </td>
            <td class="px-6 py-4 text-gray-500">{{ new Date(user.created_at).toLocaleDateString() }}</td>
            <td class="px-6 py-4">
              <button
                @click="handleDelete(user.id)"
                class="text-red-500 hover:text-red-700 font-medium transition-colors"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { usersApi } from '../services/api'
import type { User } from '../types'

const users = ref<User[]>([])
const loading = ref(true)

async function fetchUsers() {
  loading.value = true
  try {
    const res = await usersApi.list()
    users.value = res.data
  } finally {
    loading.value = false
  }
}

onMounted(fetchUsers)

async function handleDelete(id: number) {
  if (!confirm('¿Eliminar este usuario?')) return
  await usersApi.remove(id)
  fetchUsers()
}
</script>
