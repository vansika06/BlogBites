import React,{useState} from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSelector,useDispatch } from 'react-redux'
import { CheckCheck } from 'lucide-react';
import { set } from '../features/singleConvo';
import { useSocket } from '@/context/socketcontext';
import { CircleCheck } from 'lucide-react';
import { setGroup } from '../features/singleConvo';
function Channel({name,participants,groupId,lastmessage}) {
  //modify it with redux---
  const dispatch=useDispatch()
 
  const currentUser=useSelector((state)=>state.auth.userData)
  console.log(currentUser._id)
 
  const handleChannelClick=async()=>{
    const d={groupId:groupId,name:name,members:participants}
    console.log(d)
    dispatch(setGroup(d))
  }
  console.log(lastmessage)
  return (
   
      <div key={groupId} className="flex items-start p-4 hover:bg-gray-200 cursor-pointer" onClick={handleChannelClick}>
              <Avatar>
             <AvatarImage src='' />
             <AvatarFallback>{name[0]}</AvatarFallback>
              </Avatar>
             
             < div className="ml-4">
              <h3 className="block text-xl font-medium text-gray-900 dark:text-white">{name}</h3>
             
             {lastmessage && (lastmessage.length>0 && <>{currentUser._id===lastmessage.sender?<CheckCheck size={16} />:""}
             <p class="block text-gray-500 text-sm truncate">{lastmessage.message?lastmessage.message.length>20?lastmessage.message.substring(0,18)+"...":lastmessage.message:''}</p>
             </>
            ) }
              
            </div>
            </div>
    
  )
}
export default Channel