import axios from 'axios'

const servicesApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true,
})

export const getServicesRequest = () => servicesApi.get('/services')
export const getAllServicesRequest = () => servicesApi.get('/services/all')
export const getServicesByIdRequest = (serviceId) => servicesApi.get(`/services/${serviceId}`)
export const createServicesRequest = (servicesData) => servicesApi.post('/services', servicesData)
export const updateServicesRequest = (serviceId, servicesData) =>
  servicesApi.patch(`/services/${serviceId}`, servicesData)
export const updateServicesStatusRequest = (serviceId, isActive) =>
  servicesApi.patch(`/services/${serviceId}/status`, { isActive })
export const deleteServicesRequest = (serviceId) => servicesApi.delete(`/services/${serviceId}`)

export default servicesApi
