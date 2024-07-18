import {configureStore} from '@reduxjs/toolkit'
import authSliceReducer from '../features/authslice.js'
import conversationReducer from '../features/conversations.js'
import singleConvoReducer from '../features/singleConvo.js'
import loadingReducer from '../features/loading.js'
const store=configureStore({
    reducer:{
       auth:authSliceReducer,
       conversations:conversationReducer,
       singleConvo:singleConvoReducer,
       loader:loadingReducer
    }
})
export default store