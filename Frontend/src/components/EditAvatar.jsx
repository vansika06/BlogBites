
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function EditAvatar() {
    const user=useSelector((state)=>state.auth.userData)
    const navigate=useNavigate()
    const [image,setImage]=useState('')
    const [imgPrev,setImgpreview]=useState(user.avatar)
    const handleImage=(e)=>{
        setImgpreview(URL.createObjectURL(e.target.files[0]))
      const file = e.target.files[0];
      console.log(file)
  setImage(file);
  console.log(image)
    }
    const handleSubmit=async()=>{
       try {
         const formData = new FormData();
         formData.append('avatar',image)
         
         const res=await axios.patch('http://localhost:4000/api/v1/users/avatar',formData,{
             withCredentials:true
         })
         if(res){
             console.log(res.data);
             console.log("Updated successfully")
             navigate('/dashboard')
         }
       } catch (error) {
        console.log(error)
       }
    }
  return (
    <div>
     <div className="w-full min-h-screen bg-gray-50 p-4 lg:p-8">
  <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="lg:flex">
      <div className="lg:w-1/2 p-8 lg:p-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Update Image</h1>
          <p className="text-gray-600 mb-8">
            Upload a new image to update your profile or content.
          </p>
          <div className="space-y-6">
            <div>
              <Label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Choose Image
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/png,image/jpg,image/jpeg"
                required
                onChange={handleImage}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300"
              onClick={handleSubmit}
            >
              Upload Image
            </Button>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 bg-gray-100 p-8 lg:p-12 flex items-center justify-center">
        {imgPrev ? (
          <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden shadow-md">
            <img
              src={imgPrev}
              alt="Image Preview"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="text-center">
            <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2 text-gray-600">No image selected</p>
          </div>
        )}
      </div>
    </div>
  </div>
</div>
     
    </div>
  )
}
export default EditAvatar