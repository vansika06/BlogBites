
import {createSlice} from '@reduxjs/toolkit'

const initialState={
    conversations:[
       {
        _id:'',participants:[],lastMsg:{
            sender:'',
            message:''
        }
       },
      

    ],
    notifications:[]
        
       
}
const blogSlice=createSlice({
    name:"conver",
    initialState,
    reducers:{
        fetch:(state,action)=>{
            
            state.conversations=action.payload
        },
       add:(state,action)=>{
        state.conversations.push(action.payload)
       },
       setConversation:(state,action)=>{
        state.conversations=state.conversations.map((con)=>{
            console.log(con._id)
            console.log(action.payload.id)
            if(con._id.toString()===action.payload.id.toString()){
                
                return {...con,lastMsg:action.payload.lastMsg
                }}
                return con
            }
          
        )
       
    
}}
})
export const {fetch,add,setConversation}=blogSlice.actions
export default blogSlice.reducer