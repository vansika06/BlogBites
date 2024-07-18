import {createSlice} from '@reduxjs/toolkit'
const initialState={
    loading:false
}
const loadSlice=createSlice({
    name:"loader",
    initialState,
    reducers:{
        loaded:(state,action)=>{
            state.loading=!state.loading;
        }}})
export const {loaded}=loadSlice.actions
export default loadSlice.reducer