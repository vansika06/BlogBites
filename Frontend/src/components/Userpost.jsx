
import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Tests from './Tests'
import { useSelector } from 'react-redux'
import {MoreVertical} from 'lucide-react'
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
import { useNavigate } from 'react-router-dom'
 function UserpostPage() {
  const [post,setPost]=useState('')
 const userId=useSelector((state)=>state.auth.userData._id)
 const navigate=useNavigate()
  const fetchUserPosts=async()=>{

    try {
      console.log("Hello")
      const res=await axios.get('http://localhost:4000/api/v1/blog/u',{
        withCredentials:true
        })
      if(res){
        setPost(res.data.data)
        console.log(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchUserPosts()
  },[])
  const handleDelete=async(id)=>{
    console.log(id)
    const res=await axios.post('http://localhost:4000/api/v1/blog/delete',{blogId:id},{
      withCredentials:true
    })
    if(res){
      console.log("Deleted successfully")
      setPost((prev)=>(prev.filter((p)=>p._id!==id)))
    }
  }
const handleEdit=(id)=>{
  navigate(`/editPost/${id}`)
}
const handleEditImage=(id,image)=>{
  navigate('/editImage',{ state: { _id: id,prevImage:image} })
}
  return (
    <div className="container mx-auto px-4 py-8">
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-200"></div>
  
      {post.length > 0 && post.map((p, index) => (
        <div key={p._id} className="mb-8 flex items-center">
          {/* Timeline dot */}
          <div className="absolute left-4 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2"></div>
  
          {/* Content */}
          <div className="ml-12 w-full">
            <div className="bg-white p-4 rounded shadow">
              <Tests post={p} index={index} />
              {
            p.ownerDetails._id===userId  &&(<>
            <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="outline" className="h-8 w-8" >
                        <MoreVertical className="h-3.5 w-3.5" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <div className='hover:bg-gray-400'>
                        <button className='hover:bg-gray-400' onClick={()=>handleDelete(p._id)} >Delete</button>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                      <div className='hover:bg-gray-400'>
                        <button className='hover:bg-gray-400' onClick={()=>handleEdit(p._id)} >Edit</button>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                      <div className='hover:bg-gray-400'>
                        <button className='hover:bg-gray-400' onClick={()=>handleEditImage(p._id,p.image)} >Edit Featured image</button>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      
                    </DropdownMenuContent>
                  </DropdownMenu></>)
          }
            </div>
            {/* Date or other info */}
            <p className="mt-2 text-sm text-gray-500">
              {new Date(p.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}
export default UserpostPage