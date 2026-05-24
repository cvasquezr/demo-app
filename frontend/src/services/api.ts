import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  },
)

export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/token', new URLSearchParams({ username: email, password })),
  register: (data: { email: string; full_name: string; password: string }) =>
    api.post('/auth/register', data),
  me: () => api.get('/auth/me'),
}

export const itemsApi = {
  list: () => api.get('/items/'),
  create: (data: { title: string; description?: string }) => api.post('/items/', data),
  update: (id: number, data: { title?: string; description?: string }) =>
    api.put(`/items/${id}`, data),
  remove: (id: number) => api.delete(`/items/${id}`),
}

export const usersApi = {
  list: () => api.get('/users/'),
  remove: (id: number) => api.delete(`/users/${id}`),
}

export default api
