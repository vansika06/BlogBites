import React,{useState,useEffect, useRef} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Skeleton } from "@/components/ui/skeleton"
import { Send } from 'lucide-react';
import axios from 'axios'
import Button from './Button'
import { useSocket } from '@/context/socketcontext';
import { CheckCheck } from 'lucide-react';
//------------------------------------
//TODO WHEN SENDING OR RECEIVING MSG SET THE LAST MSG ALSO IN THE SIDEBAR
//TODO online status
 function Messagecontainer() {
   const data=useSelector((state)=>state.singleConvo.particular)
   
   const [messages,setMessages]=useState([])
  // const [updated,setUpdatedMessages]=useState(messages)
   const [inputMsg,setinputMsg]=useState('')
   const userId=useSelector((state)=>state.auth.userData._id)
   const {socket}=useSocket()
   console.log(userId)
   const messageEndRef=useRef(null)

   //since yaha pr msg show kr rhe and send kr rhe yha pr uss newmsg wala event pr listen

   //without useefffect coming many times as component re renders
   
   
   const message=async()=>{
    try {
      
        
        const res=await axios.get(`http://localhost:4000/api/v1/message/all/${data.secUser._id}`,{
          withCredentials:true  
        })
        console.log(res.data.data)
        setMessages(res.data.data)
      
    } catch (error) {
      console.log(error)
    }
  }
  

  useEffect(()=>{
    message()
  },[data.secUser._id])


  useEffect(()=>{
    if(messages.length>0){
      console.log(messages[messages.length-1])
      var sentByOther=messages[messages.length-1].sentBy!==userId
      console.log(sentByOther)}
   //pass selectedconversation id  and  other userid so that uss user ko bta ske isne msg dekh liya
   if(sentByOther){
    console.log(data.conId)
    console.log(data.secUser._id)
    socket.emit("MarkAsSeen",{conversationId:data.conId,
      otherUserId:data.secUser._id
     })
   }
   
   
  },[messages,socket,userId,data.conId,data.secUser._id])
  useEffect(()=>{
    socket.on("messageSeen",async(conversationId)=>{
      if(data.conId===conversationId){
     setMessages((prev)=>{
       const updated=prev.map((p)=>{
            if(!p.seen){
              return{
                ...p,
                seen:true
              }
            }
            else{
              return p
            }
          })
          return updated
        })
        console.log("hi")
        console.log(messages)
         // setUpdatedMessages(prev => prev.map(p => p.seen ? p : { ...p, seen: true }))
      }
   })



    
    return () => {
      socket.off("messageSeen");
    };
  },[messages,socket,userId,data.conId,data.secUser._id])

  useEffect(()=>{
    socket.on("newMessage",(msg)=>{
      if(msg.conversationId===data.conId){
        setMessages((messages)=>[...messages,msg])
      }
      
     })
     //since we dont want this when unmounts
     return ()=>socket.off('newMessage')

   },[socket])

  
const handleClick=async()=>{

    if(inputMsg){
       try {
         const d={msg:inputMsg,receiverId:data.secUser._id}
         const res=await axios.post('http://localhost:4000/api/v1/message/send',d,{
             withCredentials:true
         })
         if(res){
            console.log(res.data)
            if(messages){
              setMessages((messages)=>[...messages,res.data.data])
            }
            else{
              setMessages([res.data.data])
            }
            console.log(messages)
             setinputMsg('')
         }
       } catch (error) {
        console.log(error)
       }
    }
}

useEffect(()=>{
 messageEndRef.current?.scrollIntoView({behavior:"smooth"})
},[messages])


  return (
    <>
    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <h1 className="text-xl font-semibold ml-5">Chat with {data.secUser.username} </h1>
        </div>
        <div className="flex-grow p-4 overflow-y-auto">
          {/* Chat messages */}
          <div className="space-y-4">
            {messages && messages.map((msg,index)=>(
                <div key={index} className={`flex ${msg.sentBy===userId? 'justify-end':''}`} > 
                    {/* <Skeleton className="h-12 w-12 rounded-full" /> */}
                <div className={`max-w-xs ${msg.sentBy===userId?'bg-blue-600':'bg-gray-200'} flex items-center p-2 rounded-lg`} ref={messages.length-1===index?messageEndRef:null}>
                  <p className='flex items-center'>{msg.message} 
                  {msg.sentBy===userId &&(<CheckCheck size={18} color={msg.seen?'red':'white'}/>)}
                  </p>
                  
                </div>
              </div>
            ))}
            {/* <div className={}>
              <div className="max-w-xs bg-gray-200 p-2 rounded-lg">
                <p>Hello! How are you?</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-xs bg-blue-600 text-white p-2 rounded-lg">
                <p>I'm good, thanks! How about you?</p>
              </div>
            </div> */}
            {/* More chat messages */}
          </div>
        </div>
        <div className="border-t p-4 flex">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputMsg}
            className="w-full appearance-none bg-gray-100 border border-gray-300 rounded-lg pl-4 py-2 shadow-none"
            onChange={(e)=>setinputMsg(e.target.value)}
          />
          <button onClick={handleClick}><Send fill='blue' size={40}/></button>
        </div>
        </>
  )
}
export default Messagecontainer 