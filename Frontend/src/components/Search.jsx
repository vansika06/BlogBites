import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Tests from './Tests';
import { useSelector } from 'react-redux';
import { UserType } from '@/features/userType';
function Search() {
    const location=useLocation()
    const state=useSelector((state)=>state)
    const {type,data}=UserType(state)
    const { title } = location.state ;
    const [results,setResults]=useState([])
    const fetchSearch=async()=>{
        const d={
            title:title
        }
        const res=await axios.post('http://localhost:4000/api/v1/blog/search',d,{
            withCredentials:true,
            headers: {
              usertype: type, // or 'ngo' based on the logged-in entity
            },
        })
        if(res.data.data){
            setResults(res.data.data)
        }
    }
    useEffect(()=>{
        fetchSearch()
    },[])
  return (
    <div className='mx-5 my-5 bg-gradient-to-br from-purple-100 to-pink-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
    <h1 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-5xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">search  results</span>...</h1>
        
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {results.length > 0 && results.map((post, index) => (
    <div key={post._id}>
      <Tests post={post} index={index} />
    </div>
  ))}
  {
    results.length===0 && <h1 className='left-50'>No results found...</h1>
  }
</div>

        
      
    </div>
  )
}

export default Search
