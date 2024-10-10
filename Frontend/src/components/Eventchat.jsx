import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSocket } from '@/context/socketcontext';
import { useSelector } from 'react-redux';
import { UserType } from '@/features/userType';
import { Send,FileImage } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button';
function  ChatWindow() {
  const {groupId}=useParams()
  console.log(groupId)
  const state = useSelector((state) => state);
  const {type,data}=UserType(state)
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([])
  const [loading,setLoading]=useState(false)
  const [event,setEvent]=useState('')
  const [participants,setParticipants]=useState([])
  const {socket,onlineUsers}=useSocket()
  console.log(onlineUsers)
  const [inputMsg,setinputMsg]=useState('')
  const [image,setImage]=useState('')
  const [imgPreview,setImgpreview]=useState('')
  onclose=()=>{
    setImage('')
  }
  console.log(socket)
//  const [typing,set]
  const messageEndRef=useRef(null)
  const imageRef=useRef(null)
  const fetchMsg=async()=>{
    try {
  
        setLoading(true)
        const res=await axios.get(`http://localhost:4000/api/v1/channel/getMsg/${groupId}`,{
          withCredentials:true ,
          headers:{
            usertype:type
          } 
        })
        console.log(res.data.data)
        console.log(data._id)
        setMessages(res.data.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
}
useEffect(()=>{
  if(socket){
    socket.on("joinEventGrp",async(data)=>{
      if(data.groupId===groupId){
        toast.success(data.username ? ` ${data.username} Joined!` : `${data.name} Joined!`,{
          position:'top-right',
          duration:3000,
          style: {
             
              fontSize: '20px', // Increase the font size
              padding: '20px', 
            },
      })
      }
    })
  }
  
},[socket,data,groupId,participants])
const fetchPart=async()=>{
 try {
   const res=await axios.post('http://localhost:4000/api/v1/ngo/participants',{grpId:groupId},{
     withCredentials:true ,
     headers: {
      usertype: type, // or 'ngo' based on the logged-in entity
    },

   })
   if(res){
    console.log(res.data.data)
    setEvent(res.data.data)
    setParticipants(res.data.data.participants)
    console.log(res.data.data.participants)
   }
  
 } catch (error) {
  console.log(error)
 }
}
useEffect(()=>{
    fetchMsg()
    fetchPart()
},[groupId])
useEffect(()=>{
  if(socket){
    socket.on("newGroupmsg",(msg)=>{
      if(msg.groupId===groupId){
        console.log(msg)
        setMessages((messages)=>[...messages,msg])
        console.log(messages)
      }
    })
    return ()=>socket.off("newGroupmsg")
  }
 
},[socket,data._id,groupId])
const handleClick=async()=>{
  if(!inputMsg && !image){
    return
  }
  if(inputMsg || image){
     try {
      setLoading(true)
      console.log(image)
        const formData = new FormData();
        formData.append('msg',inputMsg?inputMsg:'')
        formData.append('group',groupId)
        formData.append('image',image?image:'')
        console.log(formData)
        console.log(groupId)
    console.log(inputMsg)
      // const d={msg:inputMsg,receiverId:data.secUser._id,img:image}
       const res=await axios.post('http://localhost:4000/api/v1/ngo/send',formData,{
           withCredentials:true,
           headers:{
            usertype:type
           }
           
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
  

  // To automatically scroll to the latest message
  
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImage=async(e)=>{
    // setImage(URL.createObjectURL(e.target.files[0]))
     //console.log(image)
     setImgpreview(URL.createObjectURL(e.target.files[0]))
     const file = e.target.files[0];
     console.log(file)
 setImage(file);
 console.log(image)
    
  }


 
  return (
    <div className="w-3/4 h-screen flex flex-col bg-gray-50">
      <div className="flex-grow flex">
        {/* Participants List */}
        <div className="w-1/4 bg-gray-100 p-4 border-r overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Participants</h2>
          <ul>
            {participants &&participants.map((participant) => (
              <li key={participant._id} className="mb-2 text-gray-800">
                <span className="block p-2 bg-blue-100 rounded">{participant.username}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Messages Section */}
        <div className="flex-grow flex flex-col justify-between p-4">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-2 mb-4">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <div>
              <h2 className="text-2xl font-bold">{event.name}</h2>
              <p className="text-sm text-gray-600">Organized by: {}</p>
            </div>
          </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto mb-4">
            {messages && messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col mb-2 ${
                  msg.sender._id === data._id? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`p-3 rounded-lg shadow-md ${
                    msg.sender._id === data._id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <span className="font-bold">{msg.sender.username?msg.sender.username:msg.sender.name}</span>
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
                <span className={`text-xs text-gray-500 mt-1 ${msg.sender._id === data._id ? 'text-right' : 'text-left'}`}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>

          {/* Typing Indicator */}
         

          {/* Send Message Form */}
          <div>
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
          <Dialog open={image} onOpenChange={onclose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Send Image</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <img src={imgPreview} alt="Selected" className="max-w-full h-auto rounded-lg" />
          </div>
          <DialogFooter>
            {!loading && 
              
            (
              <Button onClick={handleClick}>
                <Send size={20} className="mr-2" /> Send
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
    
          {/* <form onSubmit={sendMessage} className="flex items-center border-t pt-2">
            <input
              type="text"
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mr-2"
              value={message}
              onChange={handleTyping}
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Send
            </button>
          </form> */}
          <Toaster/>
        </div>
      </div>



    </div>
   
  );
};

export default ChatWindow;
