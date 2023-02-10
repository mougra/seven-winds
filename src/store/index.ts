import { combineReducers, configureStore } from '@reduxjs/toolkit'
import entityReducer from './slices/entitySlice'

const rootReducer = combineReducers({
  entity: entityReducer,
  // modifiedRows: modifiedRowsReducer,
})

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware({
    //     serializableCheck: false,
    //   }),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
