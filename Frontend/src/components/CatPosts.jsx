import React from 'react'
import  { useEffect, useState } from 'react'
import axios from 'axios'
import Blogitem from './Blogitem';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserType } from '@/features/userType';
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
    <div>
      <section className='container mx-auto flex flex-wrap md:gap-x-5 gap-y-5 px-5 py-10'>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-8  mx-8 my-8 px-5 auto-cols-max">
        {Data.map((post,index)=>(
          <Blogitem key={index} title={post.title} thumbnail={post.thumbnail} description={post.description}
          image={post.image} owner={post.owner} createdAt={post.createdAt}/>
        ))}
        </div>

      </section>
    </div>
  )
}
export default CatPosts