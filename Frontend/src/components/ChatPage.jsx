import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import {Input} from '@/components/ui/input'
import axios from 'axios'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { useSelector,useDispatch } from 'react-redux'
import { add, fetch } from '../features/conversations.js'
import Conversations from './Conversations.jsx'
import Nochat from './Nochat'
import Messagecontainer from './Messagecontainer'
import { set, setGroup } from '../features/singleConvo'
import {nanoid} from "@reduxjs/toolkit";
import { Menu,UserPlus,CircleCheck ,CircleX  } from 'lucide-react'
import { useSocket } from '@/context/socketcontext'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"
import MultipleSelector from '@/components/ui/multiselect'
import Groupmsgcontainer from './Groupmsgcontainer'
import Channel from './Channel'
import { selectConversation } from '../features/singleConvo'
 function ChatPage() {
  const [conversations,setConversations]=useState([])
  var conv=useSelector((state)=>state.conver.conversations)
 const [loading,setLoading]=useState(true)
  const [searchInput,setsearchInput]=useState('')
  const [request,setRequest]=useState([])
  const userId=useSelector((state)=>state.auth.userData._id)
  const [channelName,setChannelName]=useState('')
  const [followers,setFollowers]=useState([])
  const [selectedcontacts,setSelectedcontacts]=useState([])
  const [channel,setChannel]=useState([])
  const [open,setOpen]=useState(false)
  const [open2,setOpen2]=useState(false)
  const [searchedOutput,setSearchedOutput]=useState('')
  const currentUser=useSelector((state)=>state.auth.userData)
  const { isSelected, type, details } = useSelector(selectConversation);
  const dispatch=useDispatch()
  const {socket}=useSocket()

//look at dispatch one
  const fetchConversations=async()=>{
    try{
      setLoading(true)
      const res=await axios.get("http://localhost:4000/api/v1/message/userConversations",{
        withCredentials:true  
      })
      console.log(res.data.data)
     // setFollowers(res.data.data)
      dispatch(fetch(res.data.data))
      //console.log(conv)
      setLoading(false)
      setConversations(res.data.data)
      console.log(conversations)
    }
    catch(error){
      console.log(error)
    }
  }
  const fetchFollowers=async()=>{
    try {
      const res=await axios.get("http://localhost:4000/api/v1/req/friend",{
        withCredentials:true  
      })
      if(res.data){
        setFollowers(res.data.data)
        console.log(res.data.data)
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  const sendRequest=async(id)=>{
   
    try {
      const d={
        blogger:id
      }
      const res=await axios.post('http://localhost:4000/api/v1/req/send',d,{
        withCredentials:true
      })
      if(res){
        setOpen2(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
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
  const fetchChannel=async()=>{
    try {
      const res=await axios.get('http://localhost:4000/api/v1/channel/get',{
        withCredentials:true
      })
      if(res.data){
        setChannel(res.data.data)
        console.log(res.data.data)
        console.log(channel)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchConversations()
  },[dispatch])
  useEffect(()=>{
    //fetchConversations()
    fetchRequests()
    fetchFollowers()
    fetchChannel()
  },[])
  const users=[]
  if(followers){
    for(let i of followers){
      //console.log(i.blogger._id)
      //console.log(userId)
      //console.log(i.blogger._id.toString()===userId.toString())
      //console.log({label:i.follower._id,value:i.follower.username})
      if(i.blogger._id.toString()===userId.toString()){
        users.push({label:i.follower.username,value:i.follower._id})
      }
      else{
        users.push({label:i.blogger.username,value:i.blogger._id})
      }
    }
    console.log(users)
  }
  const createChannel=async()=>{
    try {
      const d={
        name:channelName,
        members:selectedcontacts.map((i)=>i.value)
      }
      console.log(channelName)
      console.log(users)

      const res=await axios.post('http://localhost:4000/api/v1/channel/create',d,{
        withCredentials:true
      })
      if(res){
        setChannelName("")
         setSelectedcontacts([]) 
         setOpen(false)
        setChannel((channel)=>[...channel,res.data.data])
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    if(socket){
    socket.on("requestReceived",async(data)=>{
      const receiver=data.receiver
      if(receiver===userId){
        setRequest((request)=>[...request,data])
      }
    })
    return ()=>socket.off('requestReceived')}
  },[socket,userId])

  useEffect(()=>{
    if(socket){
      socket.on("reqAccepted",async(data)=>{
        if(data.receiver===userId){
          setRequest((request)=>(request?request.filter((d)=>d.sender._id!==data.sender):''))
        }
      })
    }

  },[socket,userId])
  useEffect(()=>{
    if(socket){
      socket.on("reqdeclined",async(data)=>{
        if(data.receiver===userId){
          setRequest((request)=>(request?.filter((d)=>d.sender._id!==data.sender)))
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
         setSearchedOutput(res.data.data)
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
          console.log(Object.values(users))
          const exists = users.some(user => user.value.toString() === searched._id.toString());
          console.log(exists)
          if(exists){
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
      else{
        
        setOpen2(true)

        
      }}
       }
     }
     setsearchInput('')
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
  
  
  console.log(isSelected)
  
  const renderMainContent = () => {
    if (!isSelected) return <Nochat />;
    return type === "single" ? <Messagecontainer /> : <Groupmsgcontainer />;
  };
  
useEffect(() => {
  console.log(conv);
}, [conv]);
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
      <div className={`w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200 flex flex-col overflow-auto ${showSidebar ? 'fixed inset-0 z-50' : 'hidden md:flex'}`}>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Chats</h2>
          <button className="md:hidden p-2 rounded" onClick={() => setShowSidebar(false)}>
            <Menu size={24} />
          </button>
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
              <button className="bg-green-500 p-2 rounded text-white hover:bg-green-600" onClick={()=>handleAccept(req.sender._id)}>
                <CircleCheck  size={12} /> Accept
              </button>
              <button className="bg-red-500 p-2 rounded text-white hover:bg-red-600" onClick={()=>handleReject(req.sender._id)}>
                <CircleX  size={12} />Reject
              </button>
            </div>
          ))}
        </div>
         {/* chat groups */}
         <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium mb-2">Your Channels</h3>
          <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">create channel</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Your channel</DialogTitle>
          <DialogDescription>
           Add your channel name and select your followers
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              value={channelName}
              onChange={(e)=>setChannelName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div>
            {users && <MultipleSelector
            className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white" 
            defaultOptions={users} 
            placeholder="search contacts"
            value={selectedcontacts}
            onChange={setSelectedcontacts}
            // emptyIndicator={
            //   <p className='text-center text-lg leading-10 text-gray-600'>No results</p>
            // }
            />}
            
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={createChannel}>Create Channel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
           {channel && channel.map((req,index) => (
            <Channel key={index} name={req.name} participants={req.participants} groupId={req._id} lastmessage={req.lastmessage} />
            // <div key={req._id} className="flex items-center justify-between mb-2">
            //   <div className="flex items-center" onClick={()=>handleChannelClick(req._id,req.name,req.participants)}>
            //   <Avatar>
            //  <AvatarImage src='' />
            //  <AvatarFallback>{req.name[0]}</AvatarFallback>
            //   </Avatar>
            //     <span className="ml-2">{req.name}</span>
            //   </div>
             
            // </div>
          ))}  
        </div>
      <div className="p-4 border-b border-gray-200">
        <div className='flex flex-row'>
          <input
            type="search"
            placeholder="Search followers..."
            className="w-full appearance-none bg-white border border-gray-300 rounded-lg pl-8 py-2 shadow-none"
            value={searchInput}
            onChange={(e)=>setsearchInput(e.target.value)}/>
          <button onClick={handleSearch}><Search/></button>
          </div>
          <Dialog open={open2} onOpenChange={setOpen2}>
          <DialogTrigger asChild>
            <Button variant="outline">  Follow </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
              <DialogTitle>Follow to start a conversation</DialogTitle>
              <DialogDescription>
              
              </DialogDescription>
            </DialogHeader>
            <div key={searchedOutput._id} className="flex items-start p-4 hover:bg-gray-200 cursor-pointer" >
              <Avatar>
             <AvatarImage src={searchedOutput.avatar} />
             <AvatarFallback>{searchedOutput.username}</AvatarFallback>
              </Avatar>
             <h3>{searchedOutput.username}</h3>
            </div>
                
              
            <DialogFooter>
              <Button type="submit" onClick={()=>sendRequest(searchedOutput._id)}>Send Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
          {!loading && conv.length>0 && conv.map((chat, index) => (
            <Conversations key={index} participants={chat.participants} lastMsg={chat.lastMsg} createdAt={chat.createdAt} id={chat._id} />
          ))}
       {  !conversations && (
  <p>No conversations available.</p>)}

        </div>
      </div>
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="flex h-16 items-center border-b px-4 bg-white">
          <button className="mr-2 md:hidden p-2 rounded" onClick={() => setShowSidebar(true)}>
            <Menu size={24} />
          </button>

        </div>
        {/* {!isSelected?(<Nochat/>):
          
       <Messagecontainer/>
        } */}
       { renderMainContent()}
        
      </div>
    </div>
    
   
  )
}
export default ChatPage
