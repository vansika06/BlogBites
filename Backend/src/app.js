import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import {Server} from "socket.io"
import http from "http"
import { Message } from "./models/message.models.js"
import mongoose from "mongoose"
//creating a http server using socket io and express
const app=express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
const server=http.createServer(app)
const io=new Server(server,{
    cors: {
      origin: process.env.CORS_ORIGIN,
      
      credentials: true
    }
})
const onlineUsers={}
const ObjectId = mongoose.Types.ObjectId;
io.on("connection",(socket)=>{
    console.log("User connected",socket.id)
    const userId=socket.handshake.query.userId
    console.log(userId)
    if(userId){
        onlineUsers[userId]=socket.id 
    }
    io.emit("online",Object.keys(onlineUsers))
    console.log(onlineUsers)

    socket.on("MarkAsSeen",async({conversationId,otherUserId})=>{

       try {
        const result= await Message.updateMany({conversationId: new ObjectId(conversationId),seen:false},{
         $set:{
             seen:true
         }
        })
        //after setting  seen emitting to sender that other user seen
        console.log("other")
        console.log(otherUserId)
        const onlineUserSocketId=onlineUsers[otherUserId]
        if (onlineUserSocketId) {
            console.log('Emitting messageSeen to:', onlineUserSocketId);
            io.to(onlineUserSocketId).emit('messageSeen', conversationId);
          } else {
            console.log('User not online:', otherUserId);
          }
       } catch (error) {
        console.log(error)
       }
    })




    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id)
        for (const key in onlineUsers) {
            if (onlineUsers[key] === socket.id) {
                delete onlineUsers[key];
                break;
            }
        }
        io.emit("online", Object.keys(onlineUsers));
    })
    

})
export const receiverSocket=(receiverId)=>{
    return onlineUsers[receiverId];
}



app.use(express.json({limit:"25kb"}))
app.use(express.urlencoded({extended:true,limit:"25kb"}))
app.use(express.static("public"))
app.use(cookieParser())





//routes import
import userRouter from './Routes/user.routes.js'
import blogRouter from './Routes/blog.routes.js'
import followRouter from "./Routes/follow.routes.js"
import likeRouter from  './Routes/like.routes.js'
import commentRouter from './Routes/comments.routes.js'
import messageRouter from './Routes/message.routes.js'

//routes declaration

app.use("/api/v1/users",userRouter)
app.use("/api/v1/blog",blogRouter)
app.use("/api/v1/follow",followRouter)
app.use("/api/v1/like",likeRouter)
app.use("/api/v1/comment",commentRouter)
app.use("/api/v1/message",messageRouter)
export {app,io,server}