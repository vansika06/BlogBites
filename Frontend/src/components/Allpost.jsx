import React, { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"
import axios from 'axios'
import Blogitem from './Blogitem';
 function Allpost() {
  const cat=["Health","Technology","Science","Entertainment","General","Business","Education"]
  const [Data,setData]=useState([]);
  const alldata=[];
 
  useEffect(()=>{
    const f=async()=>{
      for(let category of cat){
         
        
         try{
           const res=await axios.get(`http://localhost:4000/api/v1/blog/c/${category}`,{
             withCredentials: true
             
         })
         if(res){
        // console.log(res)
         //console.log(res.data)
       //console.log( {category: "Health", data: res.data.data.slice(0, 5) }) 
           alldata.push({category: category, data: res.data.data.slice(0, 5) })
         }
         }
         catch(e){
           console.log(e.message)
           alldata.push({category: category,data:[]})
         }
   
       }
       setData(alldata)
    }
    f();
    //setData(alldata)
   } ,[])
   console.log(Data)
  
  
  return (
    <div className='container mx-auto px-4 ' >
       {Data.map((field)=>{
        return(
          <div key={field.category} className="mb-12 text-center  ">
          {/* <h2 className="text-xl font-bold mb-4">{field.category}</h2> */}
          <div className="flex items-center  justify-center  group rounded text-sm  cursor-pointer hover:bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 p-0.5 w-fit ">
          <div className="group-hover:bg-black bg-transparent w-fit h-full p-1.5">
            <h3 className="font-semibold text-transparent text-2xl sm:text-3xl xl:text-3xl bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 bg-transparent h-full ">
            {field.category}
            </h3>
          </div>
        </div>
          <Carousel>
            <CarouselContent>
              {field.data.map((post, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Blogitem title={post.title} thumbnail={post.thumbnail} description={post.description}
                  image={post.image} owner={post.owner}/> {/* Assuming each post object has a 'title' field */}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
          </Carousel>
          {/* <button
            onClick={() => handleViewAll(categoryData.category)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            View All {categoryData.category} Posts
          </button> */}
        </div>)
      })
       
      }
      
    </div>
  )
}
export default Allpost