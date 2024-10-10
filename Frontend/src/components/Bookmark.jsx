import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { UserType } from '@/features/userType'
import Activity from './Activity'
function Bookmark() {
  const state=useSelector((state)=>state)
    const {type,data}=UserType(state)
    const user=useSelector((state)=>state.auth.userData)
    const [books,setBooks]=useState('')
   /* const fetchcommented=async()=>{
        try {
          const res=await axios.get('http://localhost:4000/api/v1/comment/commentedPost',{
              withCredentials:true
            })
            if(res){
                
              setLiked(res.data.data)
              console.log(res.data.data)
            }
        } catch (error) {
         console.log(error)
        }
     }*/
   const  fetchBookmark=async()=>{
    try {
      const res=await axios.get('http://localhost:4000/api/v1/bookmark/show',{
          withCredentials:true,
          headers:{
            usertype:type
          }
        })
        if(res){
            
          setBooks(res.data.data)
          console.log(res.data.data)
        }
    } catch (error) {
     console.log(error)}

   }
useEffect(()=>{
   //fetchcommented()
   fetchBookmark()
   
},[])

  return (
    <div>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 mx-5'>
        {
          books &&
              books.map((p,index)=>(
                p.blog!==null &&(
                <Activity post={p} key={index}/>)
               ))
            
        }</div>  
    </div>
  )
}
export default Bookmark