import React,{useState,useEffect, useRef} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Skeleton } from "@/components/ui/skeleton"
import { Send } from 'lucide-react';
import axios from 'axios'
import Button from './Button'
import { useSocket } from '@/context/socketcontext';
import { CheckCheck,FileImage ,Paperclip} from 'lucide-react';
import { setNotification } from '@/features/singleConvo';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Spinner from './Spinner';
function Groupmsgcontainer(){
    const groupData=useSelector((state)=>state.singleConvo.particularGroup)
    console.log(groupData)
    console.log(groupData)
    const dispatch=useDispatch()
    const user=useSelector((state)=>state.auth.userData)
    const  [messages,setMessages]=useState([])
    const [loading,setLoading]=useState(false)
    const [inputMsg,setinputMsg]=useState('')
    const [showParticipants, setShowParticipants] = useState(false);
    const [online,setOnline]=useState([])
    const [image,setImage]=useState('')
    const [imgPreview,setImgpreview]=useState('')
    const imageRef=useRef(null)
    const messageEndRef=useRef(null)
    const {socket,onlineUsers}=useSocket()
    console.log(socket)
    onclose=()=>{
      setImage('')
    }
    
    const fetchMsg=async()=>{
        try {
      
            setLoading(true)
            const res=await axios.get(`http://localhost:4000/api/v1/channel/getMsg/${groupData.groupId}`,{
              withCredentials:true  
            })
            console.log(res.data.data)
            setMessages(res.data.data)
          setLoading(false)
        } catch (error) {
          console.log(error)
        }
    }
    useEffect(()=>{
        fetchMsg()
    },[groupData.groupId])

    useEffect(()=>{
      socket.on("newGroupmsg",(msg)=>{
        if(msg.groupId===groupData.groupId){
          setMessages((messages)=>[...messages,msg])
          console.log(messages)
        }
      })
      return ()=>socket.off("newGroupmsg")
    },[socket,user._id,groupData.groupId])


    const handleImage=async(e)=>{
      // setImage(URL.createObjectURL(e.target.files[0]))
       //console.log(image)
       setImgpreview(URL.createObjectURL(e.target.files[0]))
       const file = e.target.files[0];
       console.log(file)
   setImage(file);
   console.log(image)
      
    }
    const handleClick=async()=>{
      if(!inputMsg && !image){
        return
      }
      if(inputMsg||image){
         try {
          setLoading(true)
          console.log(image)
            const formData = new FormData();
            formData.append('msg',inputMsg?inputMsg:'')
            formData.append('group',groupData.groupId)
            formData.append('image',image?image:'')
        console.log(inputMsg)
          // const d={msg:inputMsg,receiverId:data.secUser._id,img:image}
           const res=await axios.post('http://localhost:4000/api/v1/channel/sendMsg',formData,{
               withCredentials:true
           })
           if(res){
              console.log(res.data)
              if(messages){
                setMessages((messages)=>[...messages,res.data.data])
                console.log(messages)
              }
              else{
                setMessages([res.data.data])
              }
              console.log(messages)
               setinputMsg('')
               setImage('')
               setLoading(false)
           }
         } catch (error) {
          console.log(error)
         }
      }
      
  }
  useEffect(()=>{
    var grpOnline=groupData.members.filter((m)=>onlineUsers.includes(m._id.toString()))
if(grpOnline){
  setOnline(grpOnline)
  console.log(grpOnline)
  console.log(online)
}
  },[onlineUsers])


  useEffect(()=>{
    messageEndRef.current?.scrollIntoView({behavior:"smooth"})
   },[messages])
    return(
      <div className="flex h-screen bg-gray-200">
      {groupData && (
        <div className="flex-1 flex flex-col bg-gray-200">
          {/* Chat Header */}
          <div className="flex h-16 items-center border-b px-4 bg-white">
            <h1 className="text-xl font-semibold">{`Chat with ${groupData.name}`}</h1>
          </div>
    
          {/* Chat Messages */}
          <div className="flex-grow p-4 overflow-y-auto bg-gray-200">
          <button 
  className="text-blue-600 hover:text-blue-800" 
  onClick={() => setShowParticipants(!showParticipants)}
>
  Participants
</button>
          {showParticipants && (
          <div className="w-64 bg-white border-l overflow-y-auto">
            <h2 className="text-lg font-semibold p-4 border-b">Online users</h2>
            <ul className="p-2">
              {online && online.map((participant) => (
                <li key={participant._id} className="flex items-center p-2">
                  <div className={'w-2 h-2 rounded-full mr-2 bg-green-500'}></div>
                  <img 
                    src={participant.avatar} 
                    alt={`${participant.username}'s avatar`} 
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span>{participant.username}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
            <div className="flex flex-col space-y-4">
              {messages && messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender._id === user._id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex ${msg.sender._id === user._id ? 'flex-row-reverse' : 'flex-row'} items-end max-w-[70%]`}>
                    <img 
                      className="w-8 h-8 rounded-full mb-1 mx-2" 
                      src={msg.sender.avatar} 
                      alt={`${msg.sender.username}'s avatar`}
                    />
                    <h3>{msg.sender.username}</h3>
                    <div className="flex flex-col">
                      <div 
                        className={`break-words ${
                          msg.sender._id === user._id ? 'bg-blue-600 text-white' : 'bg-white'
                        } p-3 rounded-lg shadow`}
                        ref={messages.length - 1 === index ? messageEndRef : null}
                      >
                        {msg.message && (
                          <p className="flex items-center break-words">
                            {msg.message}
                          </p>
                        )}
                        {msg.image && (
                          <div className="relative">
                            <img 
                              src={msg.image} 
                              alt="Shared" 
                              className="rounded-lg max-w-full h-auto object-cover" 
                              style={{ maxHeight: '200px', width: 'auto' }} 
                            />
                          </div>
                        )}
                      </div>
                       <span className={`text-xs text-gray-500 mt-1 ${msg.sender._id === user._id ? 'text-right' : 'text-left'}`}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
           
          </div>
    
          {/* Input Area */}
          <div className="border-t p-4 flex items-center">
            <div className="relative flex items-center w-full">
              <input
                type="text"
                placeholder="Type a message..."
                value={inputMsg}
                className="w-full appearance-none bg-gray-100 border border-gray-300 rounded-lg pl-4 pr-10 py-2 shadow-none"
                onChange={(e) => setinputMsg(e.target.value)}
              />
              <button
                onClick={handleClick}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Send fill='blue' size={24}/>
              </button>
            </div>
            <FileImage 
              fill="blue" 
              className="h-6 w-10 ml-2 cursor-pointer" 
              onClick={() => imageRef.current.click()}
            />
            <input type='file' hidden ref={imageRef} onChange={handleImage}/>
          </div>
        </div>
      )}
    
      {/* Image Preview Dialog */}
      <Dialog open={image} onOpenChange={onclose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Send Image</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <img src={imgPreview} alt="Selected" className="max-w-full h-auto rounded-lg" />
          </div>
          <DialogFooter>
            {loading ? (
              <Spinner />
            ) : (
              <Button onClick={handleClick}>
                <Send size={20} className="mr-2" /> Send
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>)}
    export default Groupmsgcontainer