import React from 'react'
import  { useEffect, useState } from 'react'
import axios from 'axios'
import Blogitem from './Blogitem';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserType } from '@/features/userType';
import Tests from './Tests';
import Activity from './Activity';
 function CatPosts() {
    const [Data,setData]=useState([]);
    const location=useLocation()
    const {category}=location.state||{category:"General"}
    const state=useSelector((state)=>state)
    const {type,data}=UserType(state)
    useEffect(()=>{
         axios.get(`http://localhost:4000/api/v1/blog/cat/${category}`,{
            withCredentials: true,
            headers:{
              usertype: type, // or 'ngo' based on the logged-in entity
            },
            
        })
        .then((res)=>{
            setData(res.data.data)
        })
        .catch((e)=>{
            console.log(e.message)
        })
       
        //setData(alldata)
       } ,[category])
       console.log(Data)
  return (
    <div className='flex mt-5 gap-5'>
        {Data.map((post,index)=>(
          // <Blogitem key={index} title={post.title} thumbnail={post.thumbnail} description={post.description}
          // image={post.image} owner={post.owner} createdAt={post.createdAt}/>
         // <Activity  key={index} post={post} />
         
         <div className="w-full md:w-2/3 lg:w-1/2">
          <Tests post={post} index={index} />
          </div>
        ))}
      
      {
    Data.length===0 && <h1 className='left-50'>No results found...</h1>
  }
     
    </div>
  )
}
export default CatPosts