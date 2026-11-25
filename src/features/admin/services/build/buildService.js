import {
  createBuildRequest,
  deleteBuildRequest,
  getAllBuildRequest,
  getBuildByIdRequest,
  getBuildRequest,
  updateBuildRequest,
  updateBuildStatusRequest,
} from '../../api/build/buildApi.js'

const getResponseData = (response) => response.data.data

export const getBuild = async () => getResponseData(await getBuildRequest())
export const getAllBuild = async () => getResponseData(await getAllBuildRequest())
export const getBuildById = async (buildId) => getResponseData(await getBuildByIdRequest(buildId))
export const createBuild = async (buildData) => getResponseData(await createBuildRequest(buildData))
export const updateBuild = async (buildId, buildData) =>
  getResponseData(await updateBuildRequest(buildId, buildData))
export const updateBuildStatus = async (buildId, isActive) =>
  getResponseData(await updateBuildStatusRequest(buildId, isActive))
export const deleteBuild = async (buildId) => getResponseData(await deleteBuildRequest(buildId))
