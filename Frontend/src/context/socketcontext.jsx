import React,{useEffect,useState,useContext,createContext} from 'react'
import { useSelector } from 'react-redux';
import { io } from "socket.io-client";
const socketContext=createContext()
export const useSocket=()=>{
    return useContext(socketContext)
}
export const SocketContextProvider=({children})=>{
    const authUser = useSelector((state) => state.auth.userData);
  const ngoUser = useSelector((state) => state.ngo.ngoData);

  const user = authUser?.username ? authUser : ngoUser;
  console.log(user)
    const [socket,setSocket]=useState(null);
    const [onlineUsers,setOnline]=useState([])
    useEffect(()=>{
        const newSocket=io("http://localhost:4000",{
            query:{userId:user?._id}
        })
        setSocket(newSocket)
        newSocket.on("online",(users)=>{
            setOnline(users)
            console.log(onlineUsers)
        })
        //return will run each time on dependency change each time the component unmounts
        return ()=>newSocket && newSocket.close()
    },[user?._id])
    
   

    return(
        <socketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </socketContext.Provider>
    )
}

