import {configureStore} from '@reduxjs/toolkit'
import authSliceReducer from '../features/authslice.js'
import conversationReducer from '../features/conversations.js'
import singleConvoReducer from '../features/singleConvo.js'

const store=configureStore({
    reducer:{
       auth:authSliceReducer,
       conversations:conversationReducer,
       singleConvo:singleConvoReducer
    }
})
export default store