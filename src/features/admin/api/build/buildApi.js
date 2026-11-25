import axios from 'axios'

const buildApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true,
})

export const getBuildRequest = () => buildApi.get('/build')
export const getAllBuildRequest = () => buildApi.get('/build/all')
export const getBuildByIdRequest = (buildId) => buildApi.get(`/build/${buildId}`)
export const createBuildRequest = (buildData) => buildApi.post('/build', buildData)
export const updateBuildRequest = (buildId, buildData) => buildApi.patch(`/build/${buildId}`, buildData)
export const updateBuildStatusRequest = (buildId, isActive) =>
  buildApi.patch(`/build/${buildId}/status`, { isActive })
export const deleteBuildRequest = (buildId) => buildApi.delete(`/build/${buildId}`)
