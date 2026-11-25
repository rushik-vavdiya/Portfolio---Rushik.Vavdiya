import { configureStore } from '@reduxjs/toolkit'
import heroReducer from '../features/admin/slices/hero/heroSlice.js'
import aboutReducer from '../features/admin/slices/about/aboutSlice.js'
import servicesReducer from '../features/admin/slices/services/servicesSlice.js'
import buildReducer from '../features/admin/slices/build/buildSlice.js'

const store = configureStore({
  reducer: {
    hero: heroReducer,
    about: aboutReducer,
    services: servicesReducer,
    build: buildReducer,
  },
})

export default store
