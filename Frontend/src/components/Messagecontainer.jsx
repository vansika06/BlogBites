import React,{useState,useEffect, useRef} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Skeleton } from "@/components/ui/skeleton"
import { Send } from 'lucide-react';
import axios from 'axios'
import Button from './Button'
import { useSocket } from '@/context/socketcontext';
import { CheckCheck,FileImage ,Paperclip} from 'lucide-react';
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
//------------------------------------
//TODO WHEN SENDING OR RECEIVING MSG SET THE LAST MSG ALSO IN THE SIDEBAR
//TODO online status
 function Messagecontainer() {
   const data=useSelector((state)=>state.singleConvo.particular)
   
   const [messages,setMessages]=useState([])
  // const [updated,setUpdatedMessages]=useState(messages)
   const [inputMsg,setinputMsg]=useState('')
   const [image,setImage]=useState('')
   const [imgPreview,setImgpreview]=useState('')
   const userId=useSelector((state)=>state.auth.userData._id)
   const {socket}=useSocket()
   console.log(userId)
   const messageEndRef=useRef(null)
    const imageRef=useRef(null)
    const [open,SetOpen]=useState(false)
    const [loading,setLoading]=useState(false)
    onclose=()=>{
      setImage('')
    }
   //since yaha pr msg show kr rhe and send kr rhe yha pr uss newmsg wala event pr listen

   //without useefffect coming many times as component re renders
   
   const handleImage=async(e)=>{
     // setImage(URL.createObjectURL(e.target.files[0]))
      //console.log(image)
      setImgpreview(URL.createObjectURL(e.target.files[0]))
      const file = e.target.files[0];
      console.log(file)
  setImage(file);
  console.log(image)
     
   }
   const message=async()=>{
    try {
      
        setLoading(true)
        const res=await axios.get(`http://localhost:4000/api/v1/message/all/${data.secUser._id}`,{
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
    if(!inputMsg && !image){
      return
    }
    if(inputMsg||image){
       try {
        setLoading(true)
        console.log(image)
          const formData = new FormData();
          formData.append('msg',inputMsg?inputMsg:'')
          formData.append('receiverId',data.secUser._id)
          formData.append('image',image?image:'')
      
        // const d={msg:inputMsg,receiverId:data.secUser._id,img:image}
         const res=await axios.post('http://localhost:4000/api/v1/message/send',formData,{
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
             setImage('')
             setLoading(false)
         }
       } catch (error) {
        console.log(error)
       }
    }
    // if(image){
    //   try{
    //     const d={img:image,receiverId:data.secUser._id}

    //     const res=await axios.post('http://localhost:4000/api/v1/message/send',d,{
    //       withCredentials:true
    //     })
    //   }
    //   catch(e){
    //     console.log(e)
    //   }
    // }
}




useEffect(()=>{
 messageEndRef.current?.scrollIntoView({behavior:"smooth"})
},[messages])


  return (
//     <>
//     <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
//           <h1 className="text-xl font-semibold ml-5">Chat with {data.secUser.username} </h1>
//         </div>
//         {loading && <><Spinner/></>}
//         <div className="flex-grow p-4 overflow-y-auto">
//           {/* Chat messages */}
//           <div className="space-y-4">
//             {messages && messages.map((msg,index)=>(
//                 <div key={index} className={`flex ${msg.sentBy===userId? 'justify-end':''}`} > 
//                     {/* <Skeleton className="h-12 w-12 rounded-full" /> */}
//                 <div className={`max-w-xs ${msg.sentBy===userId?'bg-blue-600':'bg-gray-200'} flex items-center p-2 rounded-lg`} ref={messages.length-1===index?messageEndRef:null}>
//                   {msg.message && (<p className='flex items-center'>{msg.message}
//                   {msg.sentBy===userId &&(<CheckCheck size={18} color={msg.seen?'red':'white'}/>)}
//                   </p>
//                   ) }
//                   {
//                     msg.image && (
//                       <>
//                       <div >
//                       <img src={msg.image} class="rounded-lg" />
//                       {msg.sentBy===userId &&(<CheckCheck size={18}  color={msg.seen?'red':'white'}/>)}
//                       </div>
//                       </>
//                     )
//                   }
//                 </div>
//               </div>
//             ))}
//             {/* <div className={}>
//               <div className="max-w-xs bg-gray-200 p-2 rounded-lg">
//                 <p>Hello! How are you?</p>
//               </div>
//             </div>
//             <div className="flex justify-end">
//               <div className="max-w-xs bg-blue-600 text-white p-2 rounded-lg">
//                 <p>I'm good, thanks! How about you?</p>
//               </div>
//             </div> */}
//             {/* More chat messages */}
//           </div>
//         </div>
        
//         <div className="border-t p-4 flex items-center">
//   <div className="relative flex items-center w-full">
    
//     <input
//       type="text"
//       placeholder="Type a message..."
//       value={inputMsg}
//       className="w-full appearance-none bg-gray-100 border border-gray-300 rounded-lg pl-4 pr-10 py-2 shadow-none"
//       onChange={(e) => setinputMsg(e.target.value)}
//     />
//     <button 
//       onClick={handleClick}
//       className="absolute right-2 top-1/2 transform -translate-y-1/2"
//     >
//       <Send fill='blue' size={24}/>
//     </button>
    
//   </div>
//   <FileImage fill="white" className="h-6 w-10 ml-2 cursor-pointer" onClick={()=>imageRef.current.click()}/>

//   <input type='file' hidden ref={imageRef} onChange={handleImage}/>

// </div>
// <Dialog open={image} onOpenChange={onclose}>

      
//         <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Send Image</DialogTitle>
          
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
         
//          <img src={imgPreview} alt='selected image'/> 
//         </div>
//         <DialogFooter>
//         {loading && <><Spinner/></>}
//         {!loading && <>
//           <Button type="submit" onClick={handleClick}>
//           <Send fill='blue' size={24}/>
//           </Button></>}
          
//         </DialogFooter>
//       </DialogContent>
     
//     </Dialog>
        
        
//         </>







  <div className="flex h-screen bg-gray-200">
    

    {/* Chat Container */}
    <div className="flex-1 flex flex-col  bg-gray-200">
      {/* Chat Header */}
      <div className="flex h-16 items-center border-b px-4 bg-white">
        <h1 className="text-xl font-semibold">{`Chat with ${data.secUser.username}`}</h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow p-4 overflow-y-auto bg-gray-200">
        <div className=" flex flex-col space-y-2 ">
          {messages && messages.map((msg, index) => (
            <div key={index} className={`flex px-4 py-2 ${msg.sentBy === userId ? 'justify-end' : 'justify-start'} w-full`}>
              <div 
                className={`max-w-[70%] break-words ${
                  msg.sentBy === userId ? 'bg-blue-600 text-white ml-auto' : 'bg-white mr-auto'
                } p-3 rounded-lg shadow`}
                ref={messages.length - 1 === index ? messageEndRef : null}
              >
                {msg.message && (
                  <p className="flex items-center break-words">
                    {msg.message}
                    {msg.sentBy === userId && (
                      <CheckCheck size={16} className={`ml-2 ${msg.seen ? 'text-green-400' : 'text-gray-300'}`} />
                    )}
                  </p>
                )}
                {msg.image && (
                  <div className="relative">
                    <img src={msg.image} alt="Shared" className="rounded-lg max-w-full h-auto object-cover" style={{ maxHeight: '200px', width: 'auto' }} />
                    {msg.sentBy === userId && (
                      <CheckCheck size={16} className={`absolute bottom-2 right-2 ${msg.seen ? 'text-green-400' : 'text-white'}`} />
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      {/* <div className="border-t p-4 bg-white">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputMsg}
            className="flex-grow appearance-none bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setInputMsg(e.target.value)}
          />
          <button>
              <Paperclip size={20} />
            </button>
            <button className=" text-white rounded-full bg-blue-600 mr-1">
              <Send size={20} />
            </button>
          <input type="file" hidden ref={imageRef} onChange={handleImage} />
        </div>
      </div> */}
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
   <FileImage fill="white" className="h-6 w-10 ml-2 cursor-pointer" onClick={()=>imageRef.current.click()}/>

   <input type='file' hidden ref={imageRef} onChange={handleImage}/>

 </div>
    </div>

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
  </div>

  )
}
export default Messagecontainer 