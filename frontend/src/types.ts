export interface User {
  id: number
  email: string
  full_name: string
  role: 'admin' | 'user'
  is_active: boolean
  created_at: string
}

export interface Item {
  id: number
  title: string
  description: string | null
  owner_id: number
  created_at: string
  updated_at: string
}
