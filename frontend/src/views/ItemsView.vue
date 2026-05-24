<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Items</h1>
      <button
        @click="openForm()"
        class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
      >
        + Nuevo Item
      </button>
    </div>

    <!-- Formulario -->
    <div v-if="showForm" class="bg-white rounded-xl shadow-sm border p-6 mb-6">
      <h2 class="font-semibold text-gray-900 mb-4">{{ editingId ? 'Editar Item' : 'Nuevo Item' }}</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input
            v-model="form.title"
            type="text"
            required
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea
            v-model="form.description"
            rows="3"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <p v-if="formError" class="text-red-500 text-sm">{{ formError }}</p>
        <div class="flex gap-2">
          <button
            type="submit"
            class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            {{ editingId ? 'Guardar cambios' : 'Crear' }}
          </button>
          <button
            type="button"
            @click="cancelForm"
            class="text-gray-600 hover:text-gray-800 text-sm font-medium px-4 py-2 rounded-lg border transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>

    <!-- Lista -->
    <p v-if="loading" class="text-gray-500">Cargando...</p>
    <div v-else-if="items.length === 0" class="text-center py-12 text-gray-400">
      No hay items aún. ¡Crea el primero!
    </div>
    <div v-else class="grid gap-4">
      <div
        v-for="item in items"
        :key="item.id"
        class="bg-white rounded-xl shadow-sm border p-5 flex justify-between items-start"
      >
        <div>
          <h3 class="font-semibold text-gray-900">{{ item.title }}</h3>
          <p v-if="item.description" class="text-sm text-gray-500 mt-1">{{ item.description }}</p>
          <p class="text-xs text-gray-400 mt-2">
            Creado: {{ new Date(item.created_at).toLocaleDateString() }}
          </p>
        </div>
        <div class="flex gap-2 ml-4">
          <button
            @click="openForm(item)"
            class="text-sm text-indigo-600 hover:text-indigo-800 font-medium px-3 py-1 rounded border border-indigo-200 hover:bg-indigo-50 transition-colors"
          >
            Editar
          </button>
          <button
            v-if="auth.isAdmin"
            @click="handleDelete(item.id)"
            class="text-sm text-red-500 hover:text-red-700 font-medium px-3 py-1 rounded border border-red-200 hover:bg-red-50 transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { itemsApi } from '../services/api'
import { useAuthStore } from '../stores/auth'
import type { Item } from '../types'

const auth = useAuthStore()
const items = ref<Item[]>([])
const loading = ref(true)
const showForm = ref(false)
const editingId = ref<number | null>(null)
const form = reactive({ title: '', description: '' })
const formError = ref('')

async function fetchItems() {
  loading.value = true
  try {
    const res = await itemsApi.list()
    items.value = res.data
  } finally {
    loading.value = false
  }
}

onMounted(fetchItems)

function openForm(item?: Item) {
  if (item) {
    editingId.value = item.id
    form.title = item.title
    form.description = item.description ?? ''
  } else {
    editingId.value = null
    form.title = ''
    form.description = ''
  }
  formError.value = ''
  showForm.value = true
}

function cancelForm() {
  showForm.value = false
  editingId.value = null
  formError.value = ''
}

async function handleSubmit() {
  formError.value = ''
  try {
    if (editingId.value) {
      await itemsApi.update(editingId.value, form)
    } else {
      await itemsApi.create(form)
    }
    cancelForm()
    fetchItems()
  } catch (err: unknown) {
    const e = err as { response?: { data?: { detail?: string } } }
    formError.value = e.response?.data?.detail ?? 'Error al guardar'
  }
}

async function handleDelete(id: number) {
  if (!confirm('¿Eliminar este item?')) return
  await itemsApi.remove(id)
  fetchItems()
}
</script>
