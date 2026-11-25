import axios from 'axios'

const aboutApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true,
})

export const getAboutRequest = () => aboutApi.get('/about')
export const getAllAboutRequest = () => aboutApi.get('/about/all')
export const getAboutByIdRequest = (aboutId) => aboutApi.get(`/about/${aboutId}`)
export const createAboutRequest = (aboutData) => aboutApi.post('/about', aboutData)
export const updateAboutRequest = (aboutId, aboutData) => aboutApi.patch(`/about/${aboutId}`, aboutData)
export const updateAboutStatusRequest = (aboutId, isActive) =>
  aboutApi.patch(`/about/${aboutId}/status`, { isActive })
export const deleteAboutRequest = (aboutId) => aboutApi.delete(`/about/${aboutId}`)

export default aboutApi
