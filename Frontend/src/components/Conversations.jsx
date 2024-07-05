import React,{useState} from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSelector,useDispatch } from 'react-redux'
import { CheckCheck } from 'lucide-react';
import { set } from '../features/singleConvo';
import { useSocket } from '@/context/socketcontext';
import { CircleCheck } from 'lucide-react';
function Conversations({index,participants,createdAt,lastMsg,id}) {
  //modify it with redux---
  const dispatch=useDispatch()
  const {socket,onlineUsers}=useSocket()
  const currentUser=useSelector((state)=>state.auth.userData)
  console.log(currentUser._id)
  console.log(index)
  const handleClick=async()=>{
    dispatch(set(
      {
        conId:id,
        user:currentUser._id,
        secUser:participants[0]
      }
    ))
  }
  
  return (
   
      <div key={id} className="flex items-start p-4 hover:bg-gray-200 cursor-pointer" onClick={handleClick}>
              <Avatar>
             <AvatarImage src={participants[0].avatar} />
             <AvatarFallback>{participants[0].username}</AvatarFallback>
              </Avatar>
              {onlineUsers && onlineUsers.map((user)=>id===user?(<CircleCheck fill='green' size={10}/>):null)}
             < div className="ml-4">
              <h3 className="block text-xl font-medium text-gray-900 dark:text-white">{participants[0].username}</h3>
              {currentUser._id===lastMsg.sender?<CheckCheck size={16} />:""}
            <p class="block text-gray-500 text-sm truncate">{lastMsg.message.length>20?lastMsg.message.substring(0,18)+"...":lastMsg.message}</p>
            </div>
            </div>
    
  )
}
export default Conversations