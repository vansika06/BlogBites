import React,{useEffect, useState} from 'react';
import { User, Mail, MapPin, Calendar, Book } from 'lucide-react';
import { useSelector } from 'react-redux';
import { UserType } from '@/features/userType';
// Mock data for demonstration
const user = {
  name: "John Doe",
  username: "@johndoe",
  email: "john@example.com",
  location: "New York, USA",
  joinDate: "January 2022",
  bio: "Passionate developer and tech enthusiast",
  avatar: "/api/placeholder/150/150"
};

const posts = [
  { id: 1, title: "My first blog post", date: "2023-01-15", excerpt: "This is my first blog post about..." },
  { id: 2, title: "Learning React", date: "2023-02-20", excerpt: "Today I learned about React hooks..." },
  { id: 3, title: "Tailwind CSS is awesome", date: "2023-03-10", excerpt: "I've been using Tailwind CSS and..." },
];

const UserProfilePage = () => {
    const [user,setUser]=useState('')
    const {userId}=useParams()
    const state = useSelector((state) => state);
    const {type,data}=UserType(state)
    const f=async()=>{
      const res=  await axios.get(`http://localhost:4000/api/v1/user/c/${userId}`,{
            withCredentials:true,
            headers: {
              usertype: type, // or 'ngo' based on the logged-in entity
            },
            })
            if(res){
                setUser(res.data.data)
            }
    }
    const fetchPost=async()=>{
        
    }
    useEffect(()=>{
        f()
    },[])
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* User Info Section */}
        <div className="md:flex">
          <div className="md:w-1/3 p-4">
            <img src={user.avatar} alt={user.username} className="w-32 h-32 rounded-full mx-auto md:mx-0" />
          </div>
          <div className="md:w-2/3 p-4">
            <h1 className="text-2xl font-bold">{user.fullname}</h1>
            <p className="text-gray-600">{user.username}</p>
            
            <div className="mt-4 space-y-2">
              <p className="flex items-center"><Mail className="mr-2" size={18} /> {user.email}</p>
              
             
            </div>
          </div>
        </div>
        
        {/* User Posts Section */}
        <div className="p-4 border-t">
          <h2 className="text-xl font-semibold mb-4">Past Posts</h2>
          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="bg-gray-100 p-4 rounded-md">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-600">{post.date}</p>
                <p className="mt-2">{post.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;