import React from 'react';
import { useSelector } from 'react-redux';
import {MoreVertical} from 'lucide-react'
import { useNavigate ,Link} from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button';
import axios from 'axios';
import parse from 'html-react-parser';
function Activity({post}) {
  const user=useSelector((state)=>state.auth.userData)
  console.log(post)
  console.log(post.blog.owner)
  const navigate=useNavigate()
  const handleDelete=async(id)=>{
    console.log(id)
    const res=await axios.post('http://localhost:4000/api/v1/blog/delete',{blogId:id},{
      withCredentials:true
    })
    if(res){
      console.log("Deleted successfully")
      //setPost((prev)=>(prev.filter((p)=>p._id!==id)))
    }
  }
const handleEdit=(id)=>{
  navigate(`/editPost/${id}`)
}
const handleEditImage=(id,image)=>{
  navigate('/editImage',{ state: { _id: id,prevImage:image} })
}
  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center">
          <img className="h-12 w-12 rounded-full" src={post.blog.owner.avatar} alt="Profile" />
          <div className="ml-3">
            <div className="flex items-center">
              <span className="text-lg font-bold">{post.blog.owner.fullname}</span>
              <svg className="h-5 w-5 text-blue-400 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.52 3.59a2.8 2.8 0 0 1 4.96 0l.97 1.63 1.88-.39a2.8 2.8 0 0 1 3.3 3.3l-.4 1.88 1.64.97a2.8 2.8 0 0 1 0 4.96l-1.63.97.39 1.88a2.8 2.8 0 0 1-3.3 3.3l-1.88-.4-.97 1.64a2.8 2.8 0 0 1-4.96 0l-.97-1.63-1.88.39a2.8 2.8 0 0 1-3.3-3.3l.4-1.88-1.64-.97a2.8 2.8 0 0 1 0-4.96l1.63-.97-.39-1.88a2.8 2.8 0 0 1 3.3-3.3l1.88.4.97-1.64zm7.35 5.64-6.3 6.3-2.67-2.67a1 1 0 1 0-1.42 1.42l3.38 3.37a1 1 0 0 0 1.42 0l7-7a1 1 0 0 0-1.42-1.42z" />
              </svg>
            </div>
            <span className="text-gray-500">@{post.blog.owner.username}</span>
            
          </div>
          {/* {user._id===post.blog.owner._id && (<div className='flex justify-end mr-auto items-end'><DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="outline" className="h-8 w-8" >
                        <MoreVertical className="h-3.5 w-3.5" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <div className='hover:bg-gray-400'>
                        <button className='hover:bg-gray-400' onClick={()=>handleDelete(post._id)} >Delete</button>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                      <div className='hover:bg-gray-400'>
                        <button className='hover:bg-gray-400' onClick={()=>handleEdit(post._id)} >Edit</button>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                      <div className='hover:bg-gray-400'>
                        <button className='hover:bg-gray-400' onClick={()=>handleEditImage(post._id,post.image)} >Edit Featured image</button>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      
                    </DropdownMenuContent>
                  </DropdownMenu>
                  </div>)} */}
        </div>
        <h2 className='font-bold mb-2 text-3xl'>{post.blog.title}</h2>
        <p className="mt-4 text-gray-800">
         {parse(post.blog.description)}
        </p>
        <div className="mt-4">
          <img 
            className="w-full h-64 object-cover rounded-lg shadow-sm" 
            src={post.blog.image}
            alt="Tweet image" 
          />
        </div>
        <div>
        <Link to={`/viewPosts/${post.blog._id}`}>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-colors duration-300">
            Read More
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Activity;