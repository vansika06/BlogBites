import {configureStore} from '@reduxjs/toolkit'
import authSliceReducer from '../features/authslice.js'
import conversationReducer from '../features/conversations.js'
import singleConvoReducer from '../features/singleConvo.js'
import loadingReducer from '../features/loading.js'
import ngoReducer from '../features/ngo.js'
import storage from 'redux-persist/lib/storage' //storage 
import { persistStore, persistReducer } from 'redux-persist' //Adding persistStore, Reducer
import { combineReducers } from '@reduxjs/toolkit'
const persistConfig={
    key:"root",
    version:1,
    storage
}
const reducer=combineReducers({
    auth:authSliceReducer,
    conver:conversationReducer,
    singleConvo:singleConvoReducer,
    loader:loadingReducer,
    ngo:ngoReducer
})
const persistedReducer=persistReducer(persistConfig,reducer)

const store=configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
          },
        }),
})

export default store