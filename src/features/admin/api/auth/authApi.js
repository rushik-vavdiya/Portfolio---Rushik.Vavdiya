import axios from 'axios'

const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true,
})

export const login = (credentials) => authApi.post('/auth/login', credentials)
export const register = (userDetails) => authApi.post('/auth/register', userDetails)

export async function getCurrentUser() {
  const response = await authApi.get('/auth/me')
  const user = response.data?.data

  if (response.data?.success !== true || !user?.id) {
    throw new Error(response.data?.message ?? 'Unable to verify your session.')
  }

  return user
}
