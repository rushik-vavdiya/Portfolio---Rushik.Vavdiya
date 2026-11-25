import {
  createServicesRequest,
  deleteServicesRequest,
  getAllServicesRequest,
  getServicesByIdRequest,
  getServicesRequest,
  updateServicesRequest,
  updateServicesStatusRequest,
} from '../../api/services/servicesApi.js'

const getResponseData = (response) => response.data.data

export async function getServices() {
  return getResponseData(await getServicesRequest())
}

export async function getAllServices() {
  return getResponseData(await getAllServicesRequest())
}

export async function getServicesById(serviceId) {
  return getResponseData(await getServicesByIdRequest(serviceId))
}

export async function createServices(servicesData) {
  return getResponseData(await createServicesRequest(servicesData))
}

export async function updateServices(serviceId, servicesData) {
  return getResponseData(await updateServicesRequest(serviceId, servicesData))
}

export async function updateServicesStatus(serviceId, isActive) {
  return getResponseData(await updateServicesStatusRequest(serviceId, isActive))
}

export async function deleteServices(serviceId) {
  return getResponseData(await deleteServicesRequest(serviceId))
}
