import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  createBuild,
  deleteBuild,
  getAllBuild,
  getBuild,
  getBuildById,
  updateBuild,
  updateBuildStatus,
} from '../../services/build/buildService.js'

const runRequest = async (request, { rejectWithValue }) => {
  try {
    return await request()
  } catch (error) {
    return rejectWithValue(error.response?.data?.message ?? error.message)
  }
}

export const fetchBuild = createAsyncThunk('build/fetchActive', (_, api) => runRequest(getBuild, api))
export const fetchAllBuild = createAsyncThunk('build/fetchAll', (_, api) => runRequest(getAllBuild, api))
export const fetchBuildById = createAsyncThunk('build/fetchById', (buildId, api) =>
  runRequest(() => getBuildById(buildId), api),
)
export const createBuildRecord = createAsyncThunk('build/create', (buildData, api) =>
  runRequest(() => createBuild(buildData), api),
)
export const updateBuildRecord = createAsyncThunk('build/update', ({ buildId, buildData }, api) =>
  runRequest(() => updateBuild(buildId, buildData), api),
)
export const updateBuildStatusRecord = createAsyncThunk(
  'build/updateStatus',
  ({ buildId, isActive }, api) => runRequest(() => updateBuildStatus(buildId, isActive), api),
)
export const deleteBuildRecord = createAsyncThunk('build/delete', (buildId, api) =>
  runRequest(() => deleteBuild(buildId), api),
)

const initialState = {
  activeBuild: null,
  items: [],
  selectedBuild: null,
  requests: {
    active: { status: 'idle', error: null },
    all: { status: 'idle', error: null },
    byId: { status: 'idle', error: null },
    create: { status: 'idle', error: null },
    update: { status: 'idle', error: null },
    status: { status: 'idle', error: null },
    delete: { status: 'idle', error: null },
  },
}

const getId = (item) => String(item?._id ?? item?.id ?? '')
const buildSlice = createSlice({
  name: 'build',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuild.pending, (state) => { state.requests.active.status = 'loading'; state.requests.active.error = null })
      .addCase(fetchBuild.fulfilled, (state, action) => { state.requests.active.status = 'succeeded'; state.activeBuild = action.payload })
      .addCase(fetchBuild.rejected, (state, action) => { state.requests.active.status = 'failed'; state.requests.active.error = action.payload ?? action.error.message })
      .addCase(fetchAllBuild.pending, (state) => { state.requests.all.status = 'loading'; state.requests.all.error = null })
      .addCase(fetchAllBuild.fulfilled, (state, action) => { state.requests.all.status = 'succeeded'; state.items = action.payload; state.activeBuild = action.payload.find((item) => item.isActive) ?? null })
      .addCase(fetchAllBuild.rejected, (state, action) => { state.requests.all.status = 'failed'; state.requests.all.error = action.payload ?? action.error.message })
      .addCase(fetchBuildById.fulfilled, (state, action) => { state.requests.byId.status = 'succeeded'; state.selectedBuild = action.payload })
      .addCase(createBuildRecord.fulfilled, (state, action) => {
        state.requests.create.status = 'succeeded'
        if (action.payload.isActive) state.items = state.items.map((item) => ({ ...item, isActive: false }))
        state.items.push(action.payload)
        if (action.payload.isActive) state.activeBuild = action.payload
      })
      .addCase(updateBuildRecord.fulfilled, (state, action) => {
        state.requests.update.status = 'succeeded'
        const id = getId(action.payload)
        state.items = state.items.map((item) => getId(item) === id ? action.payload : item)
        if (getId(state.activeBuild) === id) state.activeBuild = action.payload
        if (getId(state.selectedBuild) === id) state.selectedBuild = action.payload
      })
      .addCase(updateBuildStatusRecord.fulfilled, (state, action) => {
        state.requests.status.status = 'succeeded'
        const id = getId(action.payload)
        state.items = state.items.map((item) => ({ ...item, isActive: action.payload.isActive ? getId(item) === id : item.isActive && getId(item) !== id }))
        state.activeBuild = action.payload.isActive ? action.payload : getId(state.activeBuild) === id ? null : state.activeBuild
      })
      .addCase(deleteBuildRecord.fulfilled, (state, action) => {
        state.requests.delete.status = 'succeeded'
        const id = getId(action.payload)
        state.items = state.items.filter((item) => getId(item) !== id)
        if (getId(state.activeBuild) === id) state.activeBuild = null
      })
  },
})

export default buildSlice.reducer
