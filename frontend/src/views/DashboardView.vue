<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
    <p class="text-gray-500 mb-6">Bienvenido, {{ auth.user?.full_name }}</p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-xl p-6 shadow-sm border">
        <p class="text-sm text-gray-500">Rol</p>
        <p class="text-2xl font-bold text-indigo-600 mt-1 capitalize">{{ auth.user?.role }}</p>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-sm border">
        <p class="text-sm text-gray-500">Email</p>
        <p class="text-lg font-semibold text-gray-800 mt-1">{{ auth.user?.email }}</p>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-sm border">
        <p class="text-sm text-gray-500">Estado</p>
        <span class="inline-block mt-1 text-sm font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">
          Activo
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
</script>
