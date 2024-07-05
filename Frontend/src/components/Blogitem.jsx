import React, { useEffect, useState } from 'react'
import { Heart } from 'lucide-react';
import { Eye } from 'lucide-react';
import axios from 'axios';
 function Blogitem({key,title,thumbnail,description,image,owner,category,createdAt,className=""}) {
   console.log((createdAt) .split('T')[0])
   const [user,setUser]=useState({})
   useEffect(()=>{
    axios.post("http://localhost:4000/api/v1/users/user",{owner:owner},{
      withCredentials: true
      
  })
  .then((res)=>{
   setUser(res.data.data)
  })
   },[owner])
 
   
  return (
//     <div>
//      <div class="max-w-sm w-full lg:max-w-full lg:flex">
//   <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
    
//      <img src={image} alt="Featured Image"/>
//   </div>
//   <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
//     <div class="mb-8">
      
//       <div class="text-gray-900 font-bold text-xl mb-2">{title}</div>
//       <p class="text-gray-700 text-base">{thumbnail}</p>
//     </div>
//     <div class="flex items-center">
//       <img class="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Owner"/>
//       <div class="text-sm">
//         <p class="text-gray-900 leading-none"></p>
//         <p class="text-gray-600">{createdAt}</p>
//       </div>
//     </div>
//   </div>
// </div> 
//     </div>




/* <figure class="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
  <img class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src={image} alt="" width="384" height="512"/>
  <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
    <blockquote>
      <p class="text-lg font-medium">
       {thumbnail}
      </p>
    </blockquote>
    <figcaption class="font-medium">
      <div class="text-sky-500 dark:text-sky-400">
        {owner}
      </div>
      <div class="text-slate-700 dark:text-slate-500">
       {createdAt}
      </div>
    </figcaption>
  </div>
//</figure> */

  <div key={key} className={`rounded-xl overflow-hidden shadow-2xl hover:shadow-amber-300 ${className}`}>
    <div>
    <img src={image} alt="Featured image" className='w-full object-cover object-center h-auto shadow rounded-lg overflow-hidden border'/>
    </div>
    <div className='p-5 bg-neutral-300'>
      <h2 className='font-bold text-xl text-dark-soft'>
      {title}
      </h2>
      <p className='text-dark-light mt-3 text-sm'>
    {thumbnail}
      </p>
      <div class="text-sky-500 dark:text-sky-400 flex justify-between  flex-nowrap items-center mt-6">
        {`Author:${user.username}`}
        <br/>
        {user.fullname} 
      </div>
      <div class="text-slate-700 dark:text-slate-500">
      
       <button><Heart /></button>
       <span className='mx-10'>{(createdAt) .split('T')[0]}</span>
       <span><Eye/></span>
      </div>
    </div>
  </div>




  )
}
export default Blogitem