import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Tweet from './Tweet'
function Drafts() {
    const [drafts,setDrafts]=useState('')
    const user=useSelector((state)=>state.auth.userData)
    const fetchDraft=async()=>{
       try {
         const res=await axios.get('http://localhost:4000/api/v1/blog/draft',{
             withCredentials:true
           })
           if(res){
             setDrafts(res.data.data)
             console.log(res.data.data)
           }
       } catch (error) {
        console.log(error)
       }
    }
useEffect(()=>{
    fetchDraft()
},[])
  return (
    <div>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 mx-5'>
        {
            drafts && 
               drafts.map((p,index)=>(
                <Tweet post={p} key={index}/>
               ))
            
        }</div>  
    </div>
  )
}
export default Drafts