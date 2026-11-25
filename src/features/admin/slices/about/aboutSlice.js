import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  createAbout,
  deleteAbout,
  getAbout,
  getAllAbout,
  getAboutById,
  updateAbout,
  updateAboutStatus,
} from '../../services/about/aboutService.js'

const runRequest = async (request, { rejectWithValue }) => {
  try {
    return await request()
  } catch (error) {
    return rejectWithValue(error.response?.data?.message ?? error.message)
  }
}

export const fetchAbout = createAsyncThunk('about/fetchActive', (_, api) => runRequest(getAbout, api))
export const fetchAllAbout = createAsyncThunk('about/fetchAll', (_, api) => runRequest(getAllAbout, api))
export const fetchAboutById = createAsyncThunk(
  'about/fetchById',
  (aboutId, api) => runRequest(() => getAboutById(aboutId), api),
)
export const createAboutRecord = createAsyncThunk(
  'about/create',
  (aboutData, api) => runRequest(() => createAbout(aboutData), api),
)
export const updateAboutRecord = createAsyncThunk(
  'about/update',
  ({ aboutId, aboutData }, api) => runRequest(() => updateAbout(aboutId, aboutData), api),
)
export const updateAboutStatusRecord = createAsyncThunk(
  'about/updateStatus',
  ({ aboutId, isActive }, api) => runRequest(() => updateAboutStatus(aboutId, isActive), api),
)
export const deleteAboutRecord = createAsyncThunk(
  'about/delete',
  (aboutId, api) => runRequest(() => deleteAbout(aboutId), api),
)

const initialState = {
  activeAbout: null,
  items: [],
  requests: {
    active: { status: 'idle', error: null },
    all: { status: 'idle', error: null },
    create: { status: 'idle', error: null },
    update: { status: 'idle', error: null },
    status: { status: 'idle', error: null },
    delete: { status: 'idle', error: null },
  },
}

const getId = (about) => String(about?._id ?? about?.id ?? '')
const pending = (state, key) => {
  state.requests[key].status = 'loading'
  state.requests[key].error = null
}
const fulfilled = (state, key) => {
  state.requests[key].status = 'succeeded'
}
const rejected = (state, key, action) => {
  state.requests[key].status = 'failed'
  state.requests[key].error = action.payload ?? action.error.message
}

const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAbout.pending, (state) => pending(state, 'active'))
      .addCase(fetchAbout.fulfilled, (state, action) => {
        fulfilled(state, 'active')
        state.activeAbout = action.payload
      })
      .addCase(fetchAbout.rejected, (state, action) => rejected(state, 'active', action))
      .addCase(fetchAllAbout.pending, (state) => pending(state, 'all'))
      .addCase(fetchAllAbout.fulfilled, (state, action) => {
        fulfilled(state, 'all')
        state.items = action.payload
        state.activeAbout = action.payload.find((item) => item.isActive) ?? null
      })
      .addCase(fetchAllAbout.rejected, (state, action) => rejected(state, 'all', action))
      .addCase(createAboutRecord.pending, (state) => pending(state, 'create'))
      .addCase(createAboutRecord.fulfilled, (state, action) => {
        fulfilled(state, 'create')
        if (action.payload.isActive) {
          state.items = state.items.map((item) => ({ ...item, isActive: false }))
        }
        state.items.push(action.payload)
        if (action.payload.isActive) state.activeAbout = action.payload
      })
      .addCase(createAboutRecord.rejected, (state, action) => rejected(state, 'create', action))
      .addCase(updateAboutRecord.pending, (state) => pending(state, 'update'))
      .addCase(updateAboutRecord.fulfilled, (state, action) => {
        fulfilled(state, 'update')
        const id = getId(action.payload)
        const index = state.items.findIndex((item) => getId(item) === id)
        if (index !== -1) state.items[index] = action.payload
        if (state.activeAbout && getId(state.activeAbout) === id) state.activeAbout = action.payload
      })
      .addCase(updateAboutRecord.rejected, (state, action) => rejected(state, 'update', action))
      .addCase(updateAboutStatusRecord.pending, (state) => pending(state, 'status'))
      .addCase(updateAboutStatusRecord.fulfilled, (state, action) => {
        fulfilled(state, 'status')
        const about = action.payload
        const id = getId(about)
        if (about.isActive) {
          state.items = state.items.map((item) => ({ ...item, isActive: getId(item) === id }))
          state.activeAbout = about
        } else {
          state.items = state.items.map((item) =>
            getId(item) === id ? { ...item, isActive: false } : item
          )
          if (getId(state.activeAbout) === id) state.activeAbout = null
        }
      })
      .addCase(updateAboutStatusRecord.rejected, (state, action) => rejected(state, 'status', action))
      .addCase(deleteAboutRecord.pending, (state) => pending(state, 'delete'))
      .addCase(deleteAboutRecord.fulfilled, (state, action) => {
        fulfilled(state, 'delete')
        const id = getId(action.payload)
        state.items = state.items.filter((item) => getId(item) !== id)
        if (getId(state.activeAbout) === id) state.activeAbout = null
      })
      .addCase(deleteAboutRecord.rejected, (state, action) => rejected(state, 'delete', action))
  },
})

export default aboutSlice.reducer
