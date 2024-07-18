import {createSlice} from '@reduxjs/toolkit'
const initialState={
    status:false,//initially user nhi h
    userData:{_id:'', username: '', email: '', fullname: '', avatar: '',postHistory:[]}
}
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
           // state.status=true;//jaise login hoga state m true and userdata m y set kr denge
            state.userData=action.payload


        },
        logout:(state,action)=>{
            state.status=false
            state.userData=null;
        },
        isVerified:(state,action)=>{
            state.status=true;
        }
    }
})
export const {login,logout,isVerified}=authSlice.actions
export default authSlice.reducer