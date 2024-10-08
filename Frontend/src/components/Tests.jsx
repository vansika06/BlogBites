import React, { useState } from 'react';
import axios from 'axios';
import { Heart,MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserType } from '@/features/userType';
import parse from 'html-react-parser';
function Tests({post}){
  console.log(post)
  const { image,media,category, title, thumbnail, likes, comments,ownerDetails, description,isLiked ,_id} = post;
  console.log(isLiked)
  const [like,setLike]=useState(isLiked)
  const [likecount,setLikecount]=useState(likes)
  const state = useSelector((state) => state);
    const {type,data}=UserType(state)
    console.log(type)
    console.log(data)
  //const [parsed,setParsed]=useState('')
  const blogId=_id
 // const str=parse(description)
  //const newstr=str.substring(0,50)
 // setParsed(str)
 // console.log(str)
  const handleLike=async(e)=>{
    e.preventDefault()
    const data={
      blogId:_id
    }
    const res=await axios.post('http://localhost:4000/api/v1/like/handleLike',data,{
      withCredentials:true,headers: {
        usertype: type, // or 'ngo' based on the logged-in entity
      },
    })
    if(res.data.data){
      setLike(true)
      setLikecount((prev)=>prev+1)
    }
    else{
      setLike(false)
      setLikecount((prev)=>prev-1)
    }
    
  }
  console.log(parse(description))
  const handleDelete=async()=>{

  }
  //const userId=useSelector((state)=>state.auth.userData._id)
  return (
    <div className={`bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 md:flex`}>
      <div className={`relative  md:w-2/3 `}>
        <img src={image} alt={title} className="w-full h-64 object-cover" />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
            category === 'Entertainment'||"Health" ? 'bg-red-500 text-white' :
            category === 'Technology'||'Coding' ? 'bg-green-500 text-white' :
            category === 'General'||'Business' ? 'bg-blue-500 text-white' :
            'bg-yellow-500 text-white'
          }`}>
            {category}
          </span>
        </div>
      </div>
      <div className={`p-6  md:w-1/3`}>
        <h2 className='font-bold mb-2 text-3xl'>{title}</h2>
        {/* <img src={ownerDetails.avatar} className='w-6 h-6 rounded-full'/> */}
        <p className="text-gray-600 mb-4">By {ownerDetails.username}</p>
        <p className="text-gray-700 mb-4">{parse(description)}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
            <button onClick={handleLike}>
            <span className='ml-3 flex items-center gap-2 tex'>
              <Heart fill={like?"red":""} className='text-xl '/>likes</span></button> 
              {likecount}
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
              </svg>
              {comments}
            </div>
          </div>
          <Link to={`/viewPosts/${blogId}`}>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-colors duration-300">
            Read More
          </button>
          </Link>
          <span></span>
          {/* {
            ownerDetails._id===userId  &&(<>
            <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="outline" className="h-8 w-8">
                        <MoreVertical className="h-3.5 w-3.5" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <div>
                        <button className='hover:bg-gray-400' onClick={handleDelete} >Delete</button>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Export</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Trash</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu></>)
          } */}
          
        </div>
      </div>
    </div>
  );
};

export default Tests
























