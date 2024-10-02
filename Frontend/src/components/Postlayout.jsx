import React, { useEffect, useState,useCallback } from 'react';
import Tests from './Tests';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserType } from '@/features/userType.js';
 function Postlayout() {
    const [filter,setFilter]=useState("Trending")
    const cat=[ 'Latest', 'Trending', 'Audios', 'Videos']
    const [blogs,setBlogs]=useState([])
    const [searchedInput,setsearchedInput]=useState('')
    const navigate=useNavigate()
    const state = useSelector((state) => state);
    const {type,data}=UserType(state)
    console.log(type)
    console.log(data)
    const fetchBlogs=useCallback(async()=>{
      if(filter==="Audios"){
       try {
         const res=await axios.get('http://localhost:4000/api/v1/blog/audio',{
       withCredentials:true,
       headers: {
        usertype: type, // or 'ngo' based on the logged-in entity
      },
       })
       if(res.data){
        setBlogs(res.data.data)
        console.log(res)
       }
       }catch (error) {
        console.log(error)
       }
      }
      else if(filter==="Videos"){
        try {
          const res=await axios.get('http://localhost:4000/api/v1/blog/video',{
        withCredentials:true
        ,
       headers: {
        usertype: type, // or 'ngo' based on the logged-in entity
      },
        })
        if(res.data){
          console.log(res)
         setBlogs(res.data.data)
         console.log(blogs)
        }
        }catch (error) {
         console.log(error)
        }
      }
      else if(filter==="Latest"){
        try {
          const res=await axios.get('http://localhost:4000/api/v1/blog/latest',{
        withCredentials:true
        ,
       headers: {
        usertype: type, // or 'ngo' based on the logged-in entity
      },
        })
        if(res.data){
          console.log(res)
         setBlogs(res.data.data)
        }
        }catch (error) {
         console.log(error)
        }
      }
      else if(filter==="Trending"){
        try {
          const res=await axios.get('http://localhost:4000/api/v1/blog/trending?q=likes',{
        withCredentials:true
        ,
       headers: {
        usertype: type, // or 'ngo' based on the logged-in entity
      },
        })
        if(res.data){
          console.log(res)
         setBlogs(res.data.data)
        }
        }catch (error) {
         console.log(error)
        }
      }
      
      },[filter])
      const handleSearch=(e)=>{
        e.preventDefault();
        if(searchedInput){
          navigate('/search',{state:{title:searchedInput}})
        }

      }
   useEffect(()=>{
      fetchBlogs()
      console.log(blogs)
    },[filter])
    const posts = [
      { id: 1, type: 'normal', title: 'The Art of Mindfulness', thumbnail: 'mindfulness.jpg', likes: 120, comments: 45, author: 'Emma Watson', content: 'Explore the transformative power of mindfulness...' },
      { id: 2, type: 'trending', title: 'Cryptocurrency Revolution', thumbnail: 'crypto.jpg', likes: 980, comments: 230, author: 'Elon Musk', content: 'The future of finance is here...' },
      { id: 3, type: 'audio', title: 'Podcast: Future of AI', thumbnail: 'ai-podcast.jpg', likes: 340, comments: 89, author: 'Lex Fridman', content: 'Listen to experts discuss the implications of AI...' },
      { id: 4, type: 'video', title: 'Breathtaking Aurora Timelapse', thumbnail: 'aurora.jpg', likes: 1200, comments: 305, author: 'National Geographic', content: 'Watch the mesmerizing dance of the Northern Lights...' },
      { id: 5, type: 'normal', title: 'Gourmet Recipes for Busy Professionals', thumbnail: 'cooking.jpg', likes: 567, comments: 123, author: 'Gordon Ramsay', content: 'Quick and delicious meals for your hectic lifestyle...' },
      { id: 6, type: 'trending', title: 'Space Tourism Takes Off', thumbnail: 'space-tourism.jpg', likes: 2100, comments: 456, author: 'Richard Branson', content: 'The era of civilian space travel has begun...' },
    ];
  return (
    <div>
      <div className="bg-gradient-to-br from-purple-100 to-pink-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          Trending Topics
        </h1>
        <form class="max-w-md mx-auto"> 
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>  
    <div class="relative my-5 max-w-md mx-auto">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input id="default-search"  value={searchedInput} onChange={(e)=>setsearchedInput(e.target.value)} class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search titles,thumbnails..." required />
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSearch}>Search</button>
    </div>
</form>
        <div className="flex justify-center space-x-4 mb-12">
          {cat.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
                filter === type
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:shadow-md hover:scale-105'
              }`}
            >{type}</button>
           
          ))}
        </div>
        <div className="space-y-16">
        {blogs.length>0 && blogs.map((post, index) => (
            <div key={post._id} className= {`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`} >
              <div className="w-full md:w-2/3 lg:w-1/2">
              <Tests post={post} index={index} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}
export default Postlayout