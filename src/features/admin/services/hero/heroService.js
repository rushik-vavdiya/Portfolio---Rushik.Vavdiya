import {
  createHeroRequest,
  deleteHeroRequest,
  getAllHeroesRequest,
  getHeroByIdRequest,
  getHeroRequest,
  updateHeroRequest,
  updateHeroStatusRequest,
} from '../../api/hero/heroApi.js'

const getResponseData = (response) => response.data.data

export async function getHero() {
  const response = await getHeroRequest()
  return getResponseData(response)
}

export async function getAllHeroes() {
  const response = await getAllHeroesRequest()
  return getResponseData(response)
}

export async function getHeroById(heroId) {
  const response = await getHeroByIdRequest(heroId)
  return getResponseData(response)
}

export async function createHero(heroData) {
  const response = await createHeroRequest(heroData)
  return getResponseData(response)
}

export async function updateHero(heroId, heroData) {
  const response = await updateHeroRequest(heroId, heroData)
  return getResponseData(response)
}

export async function updateHeroStatus(heroId, isActive) {
  const response = await updateHeroStatusRequest(heroId, isActive)
  return getResponseData(response)
}

export async function deleteHero(heroId) {
  const response = await deleteHeroRequest(heroId)
  return response.data.data
}
