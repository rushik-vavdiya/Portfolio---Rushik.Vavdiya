import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  createHero,
  deleteHero,
  getAllHeroes,
  getHero,
  getHeroById,
  updateHero,
  updateHeroStatus,
} from '../../services/hero/heroService.js'

const runRequest = async (request, { rejectWithValue }) => {
  try {
    return await request()
  } catch (error) {
    return rejectWithValue(error.response?.data?.message ?? error.message)
  }
}

export const fetchHero = createAsyncThunk(
  'hero/fetchHero',
  (_, thunkApi) => runRequest(getHero, thunkApi),
)

export const fetchAllHeroes = createAsyncThunk(
  'hero/fetchAll',
  (_, thunkApi) => runRequest(getAllHeroes, thunkApi),
)

export const fetchHeroById = createAsyncThunk(
  'hero/fetchById',
  (heroId, thunkApi) => runRequest(() => getHeroById(heroId), thunkApi),
)

export const createHeroRecord = createAsyncThunk(
  'hero/create',
  (heroData, thunkApi) => runRequest(() => createHero(heroData), thunkApi),
)

export const updateHeroRecord = createAsyncThunk(
  'hero/update',
  ({ heroId, heroData }, thunkApi) =>
    runRequest(() => updateHero(heroId, heroData), thunkApi),
)

export const updateHeroStatusRecord = createAsyncThunk(
  'hero/updateStatus',
  ({ heroId, isActive }, thunkApi) =>
    runRequest(() => updateHeroStatus(heroId, isActive), thunkApi),
)

export const deleteHeroRecord = createAsyncThunk(
  'hero/delete',
  (heroId, thunkApi) => runRequest(() => deleteHero(heroId), thunkApi),
)

const initialState = {
  activeHero: null,
  items: [],
  selectedHero: null,
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

const requestPending = (state, key) => {
  state.requests[key].status = 'loading'
  state.requests[key].error = null
}

const requestFulfilled = (state, key) => {
  state.requests[key].status = 'succeeded'
}

const requestRejected = (state, key, action) => {
  state.requests[key].status = 'failed'
  state.requests[key].error = action.payload ?? action.error.message
}

const getHeroId = (hero) => hero?._id ?? hero?.id

const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHero.pending, (state) => {
        requestPending(state, 'active')
      })
      .addCase(fetchHero.fulfilled, (state, action) => {
        requestFulfilled(state, 'active')
        state.activeHero = action.payload
      })
      .addCase(fetchHero.rejected, (state, action) => {
        requestRejected(state, 'active', action)
      })
      .addCase(fetchAllHeroes.pending, (state) => {
        requestPending(state, 'all')
      })
      .addCase(fetchAllHeroes.fulfilled, (state, action) => {
        requestFulfilled(state, 'all')
        state.items = action.payload
      })
      .addCase(fetchAllHeroes.rejected, (state, action) => {
        requestRejected(state, 'all', action)
      })
      .addCase(fetchHeroById.pending, (state) => {
        requestPending(state, 'byId')
      })
      .addCase(fetchHeroById.fulfilled, (state, action) => {
        requestFulfilled(state, 'byId')
        state.selectedHero = action.payload
      })
      .addCase(fetchHeroById.rejected, (state, action) => {
        requestRejected(state, 'byId', action)
      })
      .addCase(createHeroRecord.pending, (state) => {
        requestPending(state, 'create')
      })
      .addCase(createHeroRecord.fulfilled, (state, action) => {
        requestFulfilled(state, 'create')
        state.items.push(action.payload)
      })
      .addCase(createHeroRecord.rejected, (state, action) => {
        requestRejected(state, 'create', action)
      })
      .addCase(updateHeroRecord.pending, (state) => {
        requestPending(state, 'update')
      })
      .addCase(updateHeroRecord.fulfilled, (state, action) => {
        requestFulfilled(state, 'update')
        const updatedId = getHeroId(action.payload)
        const itemIndex = state.items.findIndex((item) => getHeroId(item) === updatedId)

        if (itemIndex !== -1) {
          state.items[itemIndex] = action.payload
        }
        if (getHeroId(state.activeHero) === updatedId) {
          state.activeHero = action.payload
        }
        if (getHeroId(state.selectedHero) === updatedId) {
          state.selectedHero = action.payload
        }
      })
      .addCase(updateHeroRecord.rejected, (state, action) => {
        requestRejected(state, 'update', action)
      })
      .addCase(updateHeroStatusRecord.pending, (state) => {
        requestPending(state, 'status')
      })
      .addCase(updateHeroStatusRecord.fulfilled, (state, action) => {
        requestFulfilled(state, 'status')
        const updatedHero = action.payload
        const updatedId = getHeroId(updatedHero)
        const itemIndex = state.items.findIndex((item) => getHeroId(item) === updatedId)

        if (updatedHero.isActive) {
          state.items.forEach((item) => {
            if (getHeroId(item) !== updatedId) {
              item.isActive = false
            }
          })
          if (state.activeHero && getHeroId(state.activeHero) !== updatedId) {
            state.activeHero.isActive = false
          }
          if (state.selectedHero && getHeroId(state.selectedHero) !== updatedId) {
            state.selectedHero.isActive = false
          }
        }

        if (itemIndex !== -1) {
          state.items[itemIndex] = updatedHero
        }
        if (updatedHero.isActive) {
          state.activeHero = updatedHero
        } else if (getHeroId(state.activeHero) === updatedId) {
          state.activeHero = null
        }
        if (getHeroId(state.selectedHero) === updatedId) {
          state.selectedHero = updatedHero
        }
      })
      .addCase(updateHeroStatusRecord.rejected, (state, action) => {
        requestRejected(state, 'status', action)
      })
      .addCase(deleteHeroRecord.pending, (state) => {
        requestPending(state, 'delete')
      })
      .addCase(deleteHeroRecord.fulfilled, (state, action) => {
        requestFulfilled(state, 'delete')
        const deletedId = action.meta.arg
        state.items = state.items.filter((item) => getHeroId(item) !== deletedId)

        if (getHeroId(state.activeHero) === deletedId) {
          state.activeHero = null
        }
        if (getHeroId(state.selectedHero) === deletedId) {
          state.selectedHero = null
        }
      })
      .addCase(deleteHeroRecord.rejected, (state, action) => {
        requestRejected(state, 'delete', action)
      })
  },
})

export default heroSlice.reducer
