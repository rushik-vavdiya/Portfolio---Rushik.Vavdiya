import {
  createAboutRequest,
  deleteAboutRequest,
  getAboutByIdRequest,
  getAboutRequest,
  getAllAboutRequest,
  updateAboutRequest,
  updateAboutStatusRequest,
} from '../../api/about/aboutApi.js'

const getResponseData = (response) => response.data.data

export async function getAbout() {
  return getResponseData(await getAboutRequest())
}

export async function getAllAbout() {
  return getResponseData(await getAllAboutRequest())
}

export async function getAboutById(aboutId) {
  return getResponseData(await getAboutByIdRequest(aboutId))
}

export async function createAbout(aboutData) {
  return getResponseData(await createAboutRequest(aboutData))
}

export async function updateAbout(aboutId, aboutData) {
  return getResponseData(await updateAboutRequest(aboutId, aboutData))
}

export async function updateAboutStatus(aboutId, isActive) {
  return getResponseData(await updateAboutStatusRequest(aboutId, isActive))
}

export async function deleteAbout(aboutId) {
  return getResponseData(await deleteAboutRequest(aboutId))
}
