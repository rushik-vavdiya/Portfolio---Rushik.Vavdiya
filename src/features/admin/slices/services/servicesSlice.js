import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  createServices,
  deleteServices,
  getAllServices,
  getServices,
  getServicesById,
  updateServices,
  updateServicesStatus,
} from '../../services/services/servicesService.js'

const runRequest = async (request, { rejectWithValue }) => {
  try {
    return await request()
  } catch (error) {
    return rejectWithValue(error.response?.data?.message ?? error.message)
  }
}

export const fetchServices = createAsyncThunk(
  'services/fetchActive',
  (_, api) => runRequest(getServices, api),
)
export const fetchAllServices = createAsyncThunk(
  'services/fetchAll',
  (_, api) => runRequest(getAllServices, api),
)
export const fetchServicesById = createAsyncThunk(
  'services/fetchById',
  (serviceId, api) => runRequest(() => getServicesById(serviceId), api),
)
export const createServicesRecord = createAsyncThunk(
  'services/create',
  (servicesData, api) => runRequest(() => createServices(servicesData), api),
)
export const updateServicesRecord = createAsyncThunk(
  'services/update',
  ({ serviceId, servicesData }, api) =>
    runRequest(() => updateServices(serviceId, servicesData), api),
)
export const updateServicesStatusRecord = createAsyncThunk(
  'services/updateStatus',
  ({ serviceId, isActive }, api) =>
    runRequest(() => updateServicesStatus(serviceId, isActive), api),
)
export const deleteServicesRecord = createAsyncThunk(
  'services/delete',
  (serviceId, api) => runRequest(() => deleteServices(serviceId), api),
)

const initialState = {
  activeService: null,
  items: [],
  selectedService: null,
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

const getId = (service) => String(service?._id ?? service?.id ?? '')
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

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => pending(state, 'active'))
      .addCase(fetchServices.fulfilled, (state, action) => {
        fulfilled(state, 'active')
        state.activeService = action.payload
      })
      .addCase(fetchServices.rejected, (state, action) => rejected(state, 'active', action))
      .addCase(fetchAllServices.pending, (state) => pending(state, 'all'))
      .addCase(fetchAllServices.fulfilled, (state, action) => {
        fulfilled(state, 'all')
        state.items = action.payload
        state.activeService = action.payload.find((item) => item.isActive) ?? null
      })
      .addCase(fetchAllServices.rejected, (state, action) => rejected(state, 'all', action))
      .addCase(fetchServicesById.pending, (state) => pending(state, 'byId'))
      .addCase(fetchServicesById.fulfilled, (state, action) => {
        fulfilled(state, 'byId')
        state.selectedService = action.payload
      })
      .addCase(fetchServicesById.rejected, (state, action) => rejected(state, 'byId', action))
      .addCase(createServicesRecord.pending, (state) => pending(state, 'create'))
      .addCase(createServicesRecord.fulfilled, (state, action) => {
        fulfilled(state, 'create')
        if (action.payload.isActive) {
          state.items = state.items.map((item) => ({ ...item, isActive: false }))
        }
        state.items.push(action.payload)
        if (action.payload.isActive) state.activeService = action.payload
      })
      .addCase(createServicesRecord.rejected, (state, action) => rejected(state, 'create', action))
      .addCase(updateServicesRecord.pending, (state) => pending(state, 'update'))
      .addCase(updateServicesRecord.fulfilled, (state, action) => {
        fulfilled(state, 'update')
        const id = getId(action.payload)
        const index = state.items.findIndex((item) => getId(item) === id)
        if (index !== -1) state.items[index] = action.payload
        if (getId(state.activeService) === id) state.activeService = action.payload
        if (getId(state.selectedService) === id) state.selectedService = action.payload
      })
      .addCase(updateServicesRecord.rejected, (state, action) => rejected(state, 'update', action))
      .addCase(updateServicesStatusRecord.pending, (state) => pending(state, 'status'))
      .addCase(updateServicesStatusRecord.fulfilled, (state, action) => {
        fulfilled(state, 'status')
        const service = action.payload
        const id = getId(service)
        if (service.isActive) {
          state.items = state.items.map((item) => ({ ...item, isActive: getId(item) === id }))
          state.activeService = service
        } else {
          state.items = state.items.map((item) =>
            getId(item) === id ? { ...item, isActive: false } : item
          )
          if (getId(state.activeService) === id) state.activeService = null
        }
        if (getId(state.selectedService) === id) state.selectedService = service
      })
      .addCase(updateServicesStatusRecord.rejected, (state, action) => rejected(state, 'status', action))
      .addCase(deleteServicesRecord.pending, (state) => pending(state, 'delete'))
      .addCase(deleteServicesRecord.fulfilled, (state, action) => {
        fulfilled(state, 'delete')
        const id = getId(action.payload)
        state.items = state.items.filter((item) => getId(item) !== id)
        if (getId(state.activeService) === id) state.activeService = null
        if (getId(state.selectedService) === id) state.selectedService = null
      })
      .addCase(deleteServicesRecord.rejected, (state, action) => rejected(state, 'delete', action))
  },
})

export default servicesSlice.reducer
