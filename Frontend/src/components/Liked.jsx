import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Tweet from './Tweet'
import Activity from './Activity'
import { UserType } from '@/features/userType'
 
function Liked() {
    const [liked,setLiked]=useState('')
    const user=useSelector((state)=>state.auth.userData)
    const state=useSelector((state)=>state)
    const {type,data}=UserType(state)
    const fetchLiked=async()=>{
       try {
         const res=await axios.get('http://localhost:4000/api/v1/like/userliked',{
             withCredentials:true,
             headers:{
             usertype: type, }
           })
           if(res){
             setLiked(res.data.data)
             console.log(res.data.data)
           }
       } catch (error) {
        console.log(error)
       }
    }
    const fetchcommented=async()=>{
        try {
          const res=await axios.get('http://localhost:4000/api/v1/comment/commentedPost',{
              withCredentials:true
            })
            if(res){
              setLiked((prev)=>[...prev,res.data.data])
              console.log(res.data.data)
            }
        } catch (error) {
         console.log(error)
        }
     }
useEffect(()=>{
   fetchLiked()
   
},[])
  return (
    <div>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 mx-5'>
        {
          liked &&
               liked.map((p,index)=>(
                p.blog!==null &&(
                <Activity post={p} key={index}/>)
               ))
            
        }</div>  
    </div>
  )
}
export default Liked