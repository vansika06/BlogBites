import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {login as log} from '../features/authslice.js'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Button from './Button.jsx'
import Logo from './Logo.jsx'
import Input from './Input'
import axios from 'axios'
import Animation from './Animation/Animation.jsx'
 function Signup() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [error,setError]=useState("");
    const [picture, setPicture] = useState(null);
  const onChangePicture = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
  };
    const {register,handleSubmit}=useForm()
    const create=async(data)=>{
        console.log("Form data:", data);
        setError("")
        try {
            const config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            };

        
            const userData=await axios.post('http://localhost:4000/api/v1/users/register',data,{
                withCredentials: true
            }
                )
            if(userData){
               
                const res=await axios.get('http://localhost:4000/api/v1/users/currentUser',{
                    withCredentials: true})
                if(res){
                  dispatch(log(res.data));
                  navigate("/")
                }
            }
        }
        catch(error){
            setError(error.message)
        }
    }
    const onSub=(data) => {
        const formData = new FormData();
        formData.append('fullname', data.fullname);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('username', data.username);
        formData.append('avatar', data.avatar[0]);  
        
        
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }
    
        create(formData);
      };
  return (
    <Animation>
    <div>
       <div className='flex items-center justify-center'>
             <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                         <Logo width="100%" />
                     </span>
                     
                 </div>
                 <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                 <p className="mt-2 text-center text-base text-black/60">
                     Already have an account?&nbsp;
                     <Link
                         to="/login"
                         className="font-medium text-primary transition-all duration-200 hover:underline"
                     >
                         Sign In
                     </Link>
                 </p>
                 {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
         <form onSubmit={handleSubmit(onSub)} encType="multipart/form-data">
             <div className='space-y-5'>
                 <Input 
                 label="Fullname:"
                 placeholder="Enter Your Full Name"
                 type="text"
                 {...register("fullname",{
                     required:true
                 })}
                
                 />
                 <Input
             label="Email:"
             placeholder="Enter your email"
             type="email"
             {...register("email",{
                 required:true,
                 validate:{
                     matchPattern:(value)=>/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.
                     test(value)||
                     "Email adress must be a valid address"
                 }
             })}
             />
             <Input
             label="password:"
             {...register("password",{
                 required:true
            })}
             />
             <Input 
                 label="Username:"
                 placeholder="Enter Your User Name"
                 type="text"
                 {...register("username",{
                     required:true
                 })}
                
                 />
                 <Input 
                 label="Avatar:"
                 placeholder="Enter Your Avatar"
                 type="file"
                 {...register("avatar",{
                     required:true
                 })}
                 onChange={onChangePicture}
                
                 />
             <Button type="submit" className="w-full">Create Account</Button>
             </div>

         </form>
             </div>

         </div>
    </div>
    </Animation>
  )
}
export default Signup