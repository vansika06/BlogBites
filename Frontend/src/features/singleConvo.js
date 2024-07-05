import {createSlice} from '@reduxjs/toolkit'
const initialState={
    isSelect:false,
    particular:{conId:'',user:'',secUser:{}}
}
const singleSlice=createSlice({
    name:"singleConvo",
    initialState,
    reducers:{
        set:(state,action)=>{
            state.isSelect=true
            state.particular=action.payload
        },
       
    }
})
export const {set}=singleSlice.actions
export default singleSlice.reducer