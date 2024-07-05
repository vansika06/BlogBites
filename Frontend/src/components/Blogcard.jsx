import React,{useState,useEffect} from 'react'
import { Dat } from './Date.jsx'
import { Heart,MessageCircleMore,Send } from 'lucide-react';
import {Link} from 'react-router-dom'
import useOwner from './Owner.jsx'
import axios from 'axios'
//import Button from './Button.jsx';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
 function Blogcard({title,thumbnail,image,description,owner,createdAt,category,blogId}) {
  const [own,setOwner]=useState({})
  const [like,setLike]=useState(false)
  const [comment,setComment]=useState('')
  useEffect(() => {
    const fetchOwner = async () => {
      const userData =  useOwner({ owner: owner }) // Assuming Owner is a function that fetches user data
      setOwner(userData.user)
    }
    fetchOwner()
  }, [owner])
  console.log(own)
  const handleLike=async(e)=>{
    e.preventDefault()
    const data={
      blogId:blogId
    }
    const res=await axios.post('http://localhost:4000/api/v1/like/handleLike',data,{
      withCredentials:true
    })
    if(res.data.data){
      setLike(true)
    }
    else{
      setLike(false)
    }
    
  }
  const handleComment=async(e)=>{
    e.stopPropagation();
    //e.stopPropagation();
    const modal = document.getElementById('crud-modal');
    modal.classList.toggle('hidden');
  }
  const handleCommentSubmit=async()=>{
    const data={comment:comment,blog:blogId}

    try {
      const res=await axios.post('http://localhost:4000/api/v1/comment/post',data,{
        withCredentials:true
      })
      if(res.data.data){
        console.log(res.data.data)
        console.log("successfully added comment")
        setComment('')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='flex gap-8 items-center border-b border-gray-100 pb-5 mb-4'>
    <Link className='flex gap-8 items-center border-b border-gray-100pb-5 mb-4' to={`/viewPosts/${blogId}`}>
    <div className='w-full'>
        <div className='flex-gap-2 items-center mb-7'>
        <img src={own.avatar} className='w-6 h-6 rounded-full'/>
        <p className='line-clamp-1'>{own.fullname} @{own.username}</p>
        <p className='min-w-fit'>{Dat(createdAt)}</p>
        </div>
        <h1 className=''>{title}</h1>
        <h3 className=''>{thumbnail}</h3>
        <p className='my-3 text-xl font-gelasio leading-7 max-sm:hidden md:max-[1100px]:hiden line-clamp-2'>{description}</p>
        <div className='flex gap-4 mt-7'>
            <span className='btn-light py-1 px-4'>{category}</span>
            <Button onClick={handleLike}>
            <span className='ml-3 flex items-center gap-2 tex'>
              <Heart fill={like?"red":"cyan"} className='text-xl '/>likes</span></Button> 
        </div>
        
        
        </div>
    <div className='h-60 aspect-square text-gray-100'>
    <img src={image}/>
    </div>
    </Link>
    <div>
        <MessageCircleMore/>
        {/* <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" onClick={handleComment}>
        Comment
      </button> */}
      {/* <div id="crud-modal" tabIndex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={handleComment}>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="col-span-2">
                        <label htmlFor="comment" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Your Comment</label>
                        <input type="text" name="comment" id="comment" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Add your comment" required={true} value={comment} onChange={(e)=>setComment(e.target.value)}/>
                        <button type="button" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <Send />
                    Post
                </button>
                    </div>
      </div>
      </div> */}
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add comment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Your Comment</DialogTitle>
          <DialogDescription>
            Anyone who has this comment will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="comment" className="sr-only">
            Comment
            </Label>
            <Input
              id="comment"
              type='text'
              placeholder="Enter your comment here"
              value={comment}
              onChange={(e)=>setComment(e.target.value)}
            />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={handleCommentSubmit}>
            <span className="sr-only">Send</span>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
        </div>
    </div>
  )
}
export default  Blogcard