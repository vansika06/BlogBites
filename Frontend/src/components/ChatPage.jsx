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
import { Menu,UserPlus,CircleCheck ,CircleX  } from 'lucide-react'
import { useSocket } from '@/context/socketcontext'
 function ChatPage() {
  const [conversations,setConversations]=useState([])
  const [searchInput,setsearchInput]=useState('')
  const [request,setRequest]=useState('')
  const currentUser=useSelector((state)=>state.auth.userData)
  const dispatch=useDispatch()
  const {socket}=useSocket()
  const userId=useSelector((state)=>state.auth.userData._id)
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
  const fetchRequests=async()=>{
    try {
      const res=await axios.get('http://localhost:4000/api/v1/req/get',{
        withCredentials:true
      })
      if(res.data){
        setRequest(res.data.data)
        console.log(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(()=>{
    fetchConversations()
    fetchRequests()
  },[])

  useEffect(()=>{
    if(socket){
    socket.on("requestReceived",async(data)=>{
      const receiver=data.receiver
      if(receiver===userId){
        setRequest((prev)=>[...prev,data])
      }
    })
    return ()=>socket.off('requestReceived')}
  },[socket,userId])

  useEffect(()=>{
    if(socket){
      socket.on("reqAccepted",async(data)=>{
        if(data.receiver===userId){
          setRequest((prev)=>(prev.filter((d)=>d.sender._id!==data.sender)))
        }
      })
    }

  },[socket,userId])
  useEffect(()=>{
    if(socket){
      socket.on("reqdeclined",async(data)=>{
        if(data.receiver===userId){
          setRequest((prev)=>(prev.filter((d)=>d.sender._id!==data.sender)))
        }
      })
      console.log(request)
    }

  },[socket,userId])


  const [showSidebar, setShowSidebar] = useState(false);
  const Button = ({ children, className, onClick }) => (
    <button className={`p-2 rounded ${className}`} onClick={onClick}>
      {children}
    </button>
  );
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
  
  const handleAccept=async(id)=>{
   try {
     if (!socket.connected) {
       console.error("Socket not connected");
       return;
     }
     const d={
       sender:id,
       receiver:userId
     }
     socket.emit("acceptReq",d)
   } catch (error) {
    console.log(error)
   }
  }
  const handleReject=async(id)=>{
    if (!socket.connected) {
      console.error("Socket not connected");
      return;
    }
    const d={
      sender:id,
      receiver:userId
    }
    socket.emit("declineReq",d)
  }
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

    
    <div className="flex h-screen">
      <div className={`w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200 flex flex-col ${showSidebar ? 'fixed inset-0 z-50' : 'hidden md:flex'}`}>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Chats</h2>
          <Button className="md:hidden" onClick={() => setShowSidebar(false)}>
            <Menu size={24} />
          </Button>
        </div>
        {/* Friend Requests */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium mb-2">Friend Requests</h3>
          {request && request.map((req,index) => (
            <div key={req._id} className="flex items-center justify-between mb-2">
              <div className="flex items-center">
              <Avatar>
             <AvatarImage src={req.sender.avatar} />
             <AvatarFallback>''</AvatarFallback>
              </Avatar>
                <span className="ml-2">{req.sender.username}</span>
              </div>
              <Button className="bg-green-500 text-white hover:bg-green-600" onClick={()=>handleAccept(req.sender._id)}>
                <CircleCheck  size={12} /> Accept
              </Button>
              <Button className="bg-red-500 text-white hover:bg-red-600" onClick={()=>handleReject(req.sender._id)}>
                <CircleX  size={12} />Reject
              </Button>
            </div>
          ))}
        </div>
   
      <div className=" flex-grow overflow-y-auto">
          <input
            type="search"
            placeholder="Search followers..."
            className="w-full appearance-none bg-white border border-gray-300 rounded-lg pl-8 py-2 shadow-none"
            value={searchInput}
            onChange={(e)=>setsearchInput(e.target.value)}/>
          <button onClick={handleSearch}><Search/></button>
       
        
          {conversations && conversations.map((chat, index) => (
            <Conversations key={index} participants={chat.participants} lastMsg={chat.lastMsg} createdAt={chat.createdAt} id={chat._id} />
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="flex h-16 items-center border-b px-4 bg-white">
          <Button className="mr-2 md:hidden" onClick={() => setShowSidebar(true)}>
            <Menu size={24} />
          </Button>

        </div>
        {!isSelected?(<Nochat/>):(
          
       <Messagecontainer/>
       ) }
        
      </div>
    </div>
    
   
  )
}
export default ChatPage
