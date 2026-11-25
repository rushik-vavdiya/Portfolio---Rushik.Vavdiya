import axios from 'axios'

const heroApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true,
})

export const getHeroRequest = () => heroApi.get('/hero')
export const getAllHeroesRequest = () => heroApi.get('/hero/all')
export const getHeroByIdRequest = (heroId) => heroApi.get(`/hero/${heroId}`)
export const createHeroRequest = (heroData) => heroApi.post('/hero', heroData)
export const updateHeroRequest = (heroId, heroData) => heroApi.patch(`/hero/${heroId}`, heroData)
export const updateHeroStatusRequest = (heroId, isActive) =>
  heroApi.patch(`/hero/${heroId}/status`, { isActive })
export const deleteHeroRequest = (heroId) => heroApi.delete(`/hero/${heroId}`)

export default heroApi
