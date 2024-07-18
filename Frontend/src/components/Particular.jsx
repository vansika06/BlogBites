import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Spinner from './Spinner.jsx';
import { Link } from 'react-router-dom';
import Comment from './Comment.jsx';
import toast, { Toaster } from 'react-hot-toast';
 function Particular() {
  const {blogId}=useParams()
  
  const [blogs,setBlog]=useState('');
 const[blogger,setBlogger]=useState()
 const[cat,setCat]=useState('')
 const [following,setFollowing]=useState(false)
 const [comments,setComments]=useState([])
 const [inputComment,setinputComment]=useState('')
 const [reqstat,setReqstat]=useState('')
 const [loading,setLoading]=useState(false)
  const f=async()=>{
    try{
      setLoading(true)
    const res= await axios.get(`http://localhost:4000/api/v1/blog/view/${blogId}`,{
      withCredentials:true
      })
    if(res.data){
      setBlog(res.data.data)
      setComments(res.data.data.CommentedBy)
      setLoading(false)
     const stat=res.data.data.ownerDetails.reqStat?'request sent':'send req'
     setReqstat(stat)
      console.log(blogs)
    }}
    catch(e){
      console.log(e)
    }
  }
  
  useEffect(()=>{
   f();
    
  },[blogId])
  const userId=useSelector((state)=>state.auth.userData._id)
  
  const type=(url)=>{
    const extension=url.split('.').pop().toLowerCase()
    const videoFormats = ['mp4', 'avi', 'mov', 'wmv', 'flv'];
    const audioFormats = ['mp3', 'wav', 'ogg', 'm4a'];
  
    if (videoFormats.includes(extension)) {
      return "video";
    } else if (audioFormats.includes(extension)) {
      return "audio";
    } 
    return null;;
  }
  if(blogs){
  var mediaType=blogs.media?type(blogs.media):null
console.log(blogs)
console.log(comments)}
  const user=useSelector((state) => state.auth.userData);
  console.log(user)
  if(blogger){
    var data={
      
      "blogger":blogger._id
    }
  }
  console.log(data)
  const fetchRelated=async(category)=>{
    try {
      const res=await axios.get(`http://localhost:4000/api/v1/blog/cat/${category}`,{
        withCredentials:true
      })
      if(res){
        setCat(res.data.data)
        console.log(cat)
      }
    } catch (error) {
      console.log(error)
    }
  }
 
    useEffect(()=>{
      if(blogs){
        var category=blogs.category
        console.log(category)
      fetchRelated(category)}
    },[blogs])
      
 /* const handleclick=async()=>{
   
      try{
        const res=await axios.post('http://localhost:4000/api/v1/follow/follows',data,{
          withCredentials:true
        })
        if(res.data.data){
          console.log("success")
          setFollowing(true)
        }
        else{
          setFollowing(false)
        }
      }
      catch(e){
        console.log(e)
      } 
    }
   */
    const handleCommentSubmit=async(e)=>{
      e.preventDefault()
      const data={comment:inputComment,blog:blogId}
  
      try {
        const res=await axios.post('http://localhost:4000/api/v1/comment/post',data,{
          withCredentials:true
        })
        if(res.data.data){
          console.log(res.data.data)
          toast.success("comment added successfully",{
            position:'top-right',
            duration:3000,
            style: {
               
                fontSize: '20px', // Increase the font size
                padding: '20px', 
              },
        })
       /// TODO
       // setComments((prev)=>[...prev,res.data.data])
         setinputComment('')
        }
      } catch (error) {
        console.log(error)
      }
    }

    const handleRequest=async()=>{
      if(blogs){
      try {
        const d={
          blogger:blogs.ownerDetails._id
        }
        const res=await axios.post('http://localhost:4000/api/v1/req/send',d,{
          withCredentials:true
        })
        if(res){
          setReqstat('request sent')
        }
      } catch (error) {
        console.log(error)
      }}
    }

  return (
  





    

    
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      {loading && <Spinner/>}
      {blogs && <><div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          {/* Header Image */}
          <div className="relative h-96">
            <img 
              className="w-full h-full object-cover" 
              src={blogs.image} 
              alt={blogs.title} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                {blogs.title}
              </h1>
              <p className="text-xl text-gray-200 italic">
                {blogs.thumbnail}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row">
            {/* Main Content */}
            <div className="md:w-2/3 p-8">
              {/* Author info and metadata */}
              <div className="flex items-center justify-between mb-8 border-b pb-4">
                <div className="flex items-center">
                  <img 
                    className="h-12 w-12 rounded-full mr-4" 
                    src={blogs.ownerDetails.avatar} 
                    alt={blogs.ownerDetails.fullname} 
                  />
                  <div>
                    <p className="text-xl font-semibold text-gray-900">{blogs.ownerDetails.fullname}</p>
                    <p className="text-gray-600">@{blogs.ownerDetails.username}</p>
                   
                  </div>
                  <div>
                    <h3 className='mb-1 ml-2 mt-2'>Followers:{blogs.ownerDetails.followersCount}</h3>
                    {blogs.ownerDetails._id===userId?'':(<>
                      {blogs.ownerDetails.isFollowing && (
                      <button type="button" class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Following</button>
                    )}
                    {!blogs.ownerDetails.isFollowing && (
                      <button type="button" class={`text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-md shadow-pink-500/50 dark:shadow-md dark:shadow-pink-800/80 font-medium rounded-md text-sm px-3 py-2 text-center me-2 mb-1 ml-2 mt-2 ${blogs.ownerDetails.reqStat?'disabled':''}`} onClick={handleRequest}>{reqstat}</button>
                    )}</>)}
                    
                    
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="mr-2">&#128197;</span>
                  <span>{blogs.createdAt}</span>
                </div>
              </div>
              
              {/* Main media content */}
              {blogs.media && (
                <div className="mb-8 mt-2">
                  {mediaType === "video" ? (
                    <video className="w-full max-w-3xl mx-auto" controls>
                      <source src={blogs.media} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : mediaType === "audio" ? (
                    <audio className="w-full" controls>
                      <source src={blogs.media} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  ) : null}
                </div>
              )}

              {/* Main text content */}
              <div className="prose max-w-none mb-8">
                <p className="mb-4 text-lg leading-relaxed text-gray-700">{blogs.description}</p>
                {/* Add more paragraphs or content sections as needed */}
              </div>
              
              {/* Engagement metrics */}
              <div className="flex items-center justify-between border-t pt-4 mb-8">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-red-500 hover:text-red-600 transition">
                    <span className="mr-2 text-2xl">&#10084;</span>
                    <span>{blogs.likes} Likes</span>
                  </button>
                  <button className="flex items-center text-blue-500 hover:text-blue-600 transition">
                    <span className="mr-2 text-2xl">&#128172;</span>
                    <span>{blogs.comments} Comments</span>
                  </button>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition">
                  Share
                </button>
              </div>
            </div>

            {/* Comments Sidebar */}
            <div className="md:w-1/3 bg-gray-50 p-6 border-l flex flex-col h-[calc(100vh-6rem)]">
  <h2 className="text-2xl font-bold mb-6">Comments</h2>
  <div className="flex-grow overflow-y-auto mb-6">
    <div className="space-y-6">
      {comments.map(comment => (
        <div key={comment._id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center mb-2">
            <img src={comment.commentOwner.avatar} alt={comment.commentOwner.username} className="w-8 h-8 rounded-full mr-2" />
            <div>
              <p className="font-semibold">{comment.commentOwner.username}</p>
              <p className="text-xs text-gray-500">{comment.createdAt}</p>
            </div>
          </div>
          <p className="text-gray-700">{comment.content}</p>
        </div>
      ))}
    </div>
  </div>
  {/* Add comment form */}
  <form className="mt-auto" onSubmit={handleCommentSubmit}>
    <textarea 
      className="w-full p-2 border rounded-md" 
      rows="3" 
      placeholder="Add a comment..."
      value={inputComment}
      onChange={(e)=>setinputComment(e.target.value)}
      
    ></textarea>
    <button 
      className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
      type="submit"
    >
      Post Comment
    </button>
  </form>
</div>
          </div>
        </div>
        
        {/* More Posts from This User */}
        {/* <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">More from {blogs.ownerDetails.fullname}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {postHistory.map(post => (
              <div key={post.id} className="bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                  <a href="#" className="text-blue-500 hover:underline">Read more</a>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        
        {/* Related Posts */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
          {cat && <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cat.map(post => (
              <div key={post._id} className="bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                  <Link to={`/viewPosts/${post._id}`}>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-colors duration-300">
            Read More
          </button>
          </Link>
                </div>
              </div>
            ))}
          </div></>}
          <Toaster/>
        </div>
      </div></>}
      
    </div>
  )
}

export default Particular
