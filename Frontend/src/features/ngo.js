import {createSlice} from '@reduxjs/toolkit'
const initialState={
    status:false,//initially user nhi h
    ngoData:{_id:'', name: '', email: '', avatar: '',pNumber:'',Id:'',address:'',state:''}
}
const ngoSlice=createSlice({
    name:"ngo",
    initialState,
    reducers:{
        loginNgo:(state,action)=>{
           // state.status=true;//jaise login hoga state m true and userdata m y set kr denge
            state.ngoData=action.payload
        },
        logout:(state,action)=>{
            state.status=false
            state.ngoData=null;
        },
        isVerified:(state,action)=>{
            state.status=true;
        }
    }
})
export const {loginNgo,logout,isVerified}=ngoSlice.actions

export default ngoSlice.reducer