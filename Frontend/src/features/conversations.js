
import {createSlice} from '@reduxjs/toolkit'
const initialState={
    conversations:[
       {
        _id:'',participants:[],lastMsg:{
            sender:'',
            message:''
        }
       }

    ]
}
const blogSlice=createSlice({
    name:"conversations",
    initialState,
    reducers:{
        fetch:(state,action)=>{
            
            state.conversations=action.payload
        },
       add:(state,action)=>{
        state.conversations.push(action.payload)
       }
    }
})
export const {fetch,add}=blogSlice.actions
export default blogSlice.reducer