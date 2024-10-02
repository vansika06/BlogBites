import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
function User() {
    const [user,setUser]=useState('')
    const [blog,setBlog]=useState([])
    const [followers,setFollowers]=useState([])
    const {userId}=useParams()
    console.log(userId)
    console.log("hi")
    const fetchUserBlogs=async()=>{
      try {
        const res=await axios.get(`http://localhost:4000/api/v1/users/xyz/${userId}`,{
          withCredentials:true
        })
        if(res){
          console.log(res.data.data)
         
          setBlog(res.data.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    const fetchFollowers=async()=>{
      try {
        const res=await axios.get("http://localhost:4000/api/v1/req/friend",{
          withCredentials:true  
        })
        if(res.data){
          setFollowers(res.data.data)
          console.log(res.data.data)
        }
        
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
      
      fetchUserBlogs()
      fetchFollowers()
      console.log(blog)
    },[userId])
    const users=[]
  if(followers){
    for(let i of followers){
      
      if(i.blogger._id.toString()===userId.toString()){
        users.push({label:i.follower.username,value:i.follower._id})
      }
      else{
        users.push({label:i.blogger.username,value:i.blogger._id})
      }
    }}
    console.log(users)
  return (
    <div className="bg-gray-100 min-h-screen">
    <div className="container mx-auto p-4">
      {blog && blog.length>0 && <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className=" p-6 flex items-center">
          <img src={blog[0].ownerDetails.avatar} alt="User Avatar" className="rounded-full w-24 h-24 border-4 border-white mr-6" />
          <div>
            <h1 className="text-3xl font-bold ">{blog[0].ownerDetails.username}</h1>
            <p>{blog[0].ownerDetails.email}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row">
          {/* Left Column */}
          <div className="w-full md:w-2/3 p-6">
            <h2 className="text-2xl font-bold mb-4">{`Latest Blog Posts From ${blog[0].ownerDetails.username}`} </h2>
            {/* Blog Post List */}
            <div className="space-y-4">
              {blog.map((post) => (
                <div key={post._id} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-2">{post.thumbnail}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{`Posted on ${new Date(post.createdAt).toLocaleDateString()}`}</span>
                    <Link to={`/viewPosts/${post._id}`}>
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">Read More</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-1/3 p-6 border-l border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Chat</h2>
            {/* Chat Messages */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4 h-64 overflow-y-auto">
              <div className="mb-2">
                <span className="font-semibold">User1:</span> Hey, great blog post!
              </div>
              <div className="mb-2">
                <span className="font-semibold">Jane:</span> Thanks! Glad you enjoyed it.
              </div>
              <div className="mb-2">
                <span className="font-semibold">User2:</span> When's your next post coming out?
              </div>
            </div>
            {/* Chat Input */}
            <div className="flex">
              <input type="text" className="flex-grow p-2 border rounded-l" placeholder="Type a message..." />
              <button className="bg-indigo-500 text-white px-4 py-2 rounded-r hover:bg-indigo-600">Send</button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Quick Stats</h2>
          <div className="flex justify-around">
            <div className="text-center">
              <p className="text-3xl font-bold text-indigo-600">{blog.length}</p>
              <p className="text-gray-600">Blog Posts</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-indigo-600">{users.length}</p>
              <p className="text-gray-600">Followers</p>
            </div>
            
          </div>
        </div>
      </div>}
      
    </div>
  </div>
  )
}

export default User
