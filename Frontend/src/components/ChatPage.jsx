import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import Input from './Input'
import axios from 'axios'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSelector,useDispatch } from 'react-redux'
import { add, fetch } from '../features/conversations'
import Conversations from './Conversations.jsx'
import Nochat from './Nochat'
import Messagecontainer from './Messagecontainer'
import { set } from '../features/singleConvo'
import {nanoid} from "@reduxjs/toolkit";
 function ChatPage() {
  const [conversations,setConversations]=useState([])
  const [searchInput,setsearchInput]=useState('')
  const currentUser=useSelector((state)=>state.auth.userData)
  const dispatch=useDispatch()
//look at dispatch one
  const fetchConversations=async()=>{
    try{
      const res=await axios.get("http://localhost:4000/api/v1/message/userConversations",{
        withCredentials:true  
      })
      console.log(res.data.data)
     // setFollowers(res.data.data)
      dispatch(fetch(res.data.data))
      setConversations(res.data.data)
    }
    catch(error){
      console.log(error)
    }
  }
  const isSelected=useSelector((state)=>state.singleConvo.isSelect)
  console.log(isSelected)
  
  
  useEffect(()=>{
    fetchConversations()
  },[])

  const handleSearch=async()=>{
    //TODO SHOW ERRROR IF NO USER EXISTS OF SEARCHED NAME

   try {
     if(searchInput){
       const res=await axios.get(`http://localhost:4000/api/v1/users/c/${searchInput}`,{
        withCredentials:true
       })
       if(res){
         const  searched=res.data.data
        if(searched._id===currentUser._id){
          console.log("You cant msg yourself")
        }
        const selected=(conversations.filter((c)=>c.participants[0]._id===searched._id))[0]
        if(selected){
         
           dispatch(set(
             {
               conId:selected._id,
               user:currentUser._id,
               secUser:selected.participants[0]
             }
           ))
          console.log(selected)
        }
        else{
          const mockConver={
            lastMsg:{
              message:'',
              sender:''
            },
            _id:nanoid(),
            participants:[{
              _id:searched._id,
              username:searched.username,
              email:searched.email,
              fullname:searched.fullname,
              avatar:searched.avatar
            }],
            createdAt:''
          }
        //  dispatch(add(mockCon))
        setConversations((conversations)=>[...conversations,mockConver])
        }
       }
     }
   } catch (error) {
    console.log(error)
   }
  }

  //const conversations=useSelector((state)=>state.conversations)
  console.log(conversations)
  return (
    
    //  <div>
    // <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    //   <div className="hidden border-r bg-muted/40 md:block">
    //     <div className="flex h-full max-h-screen flex-col gap-2">
    //       <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
    //       <div className="relative">
    //             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
    //             <Input
    //               type="search"
    //               placeholder="Search products..."
    //               className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
    //             />
    //       </div>
    //     </div>
    //     </div>
    //     </div>
    //     </div> 

    
    <div className="flex justify-center min-h-screen">
    <div className="w-full max-w-6xl bg-neutral-400 shadow-md border md:grid md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_3fr]">
      <div className="hidden md:flex flex-col border-r bg-gray-50">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          
          <input
            type="search"
            placeholder="Search followers..."
            className="w-full appearance-none bg-white border border-gray-300 rounded-lg pl-8 py-2 shadow-none"
            value={searchInput}
            onChange={(e)=>setsearchInput(e.target.value)}/>
          <button onClick={handleSearch}><Search/></button>
        </div>
        <div className="overflow-y-auto">
          {conversations && conversations.map((chat, index) => (
            <Conversations key={index} participants={chat.participants} lastMsg={chat.lastMsg} createdAt={chat.createdAt} id={chat._id} />
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        {!isSelected?(<Nochat/>):(
          
       <Messagecontainer/>
       ) }
        
      </div>
    </div>
  </div>
      
   
  )
}
export default ChatPage