import {createSlice} from '@reduxjs/toolkit'
const initialState={
    ischatSelect:false,
    type:null,
    particular:{conId:'',user:'',secUser:{}},
    notications:[],
    isGroupselect:false,
    particularGroup:{
        groupId:'',name:'',members:[]
    }
}
const singleSlice=createSlice({
    name:"singleConvo",
    initialState,
    reducers:{
        set:(state,action)=>{
            state.ischatSelect=true
            state.type="single"
           // state.isGroupselect=false
            state.particular=action.payload
        },
       setNotification:(state,action)=>{
        state.notications.push(action.payload)
       },
       setGroup:(state,action)=>{
        state.isGroupselect=true
       // state.isSelect=false
        state.particularGroup=action.payload
        state.type="channel"
       }
       ,
      
    }
})
export const {set,setNotification,setGroup}=singleSlice.actions

export const selectConversation = (state) => ({
    isSelected: state.singleConvo. ischatSelect || state.singleConvo.isGroupselect,
    type: state.singleConvo.type,
    details: state.singleConvo.type === "single" ? state.singleConvo.particular : state.singleConvo.particularGroup
  });
export default singleSlice.reducer