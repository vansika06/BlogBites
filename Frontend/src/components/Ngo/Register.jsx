import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {loginNgo} from '../../features/ngo.js'
import { useForm } from 'react-hook-form'
import { useDispatch ,useSelector} from 'react-redux'
import Button from '../Button.jsx'
import Logo from '../Logo.jsx'
import Input from '../Input.jsx'
import axios from 'axios'
import Animation from '../Animation/Animation.jsx'
import toast, { Toaster } from 'react-hot-toast';
import { loaded } from '../../features/loading.js'
import { logout } from '@/features/authslice.js'
import Spinner from '../Spinner.jsx'

 function Register(){
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [error,setError]=useState("");
    const [picture, setPicture] = useState(null);
    const user=useSelector((state)=>state.auth.userData)
    const loading=useSelector((state)=>state.loader.loading)
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
            dispatch(loaded())
        
            const ngoData=await axios.post('http://localhost:4000/api/v1/ngo/registerngo',data,{
                withCredentials: true
            }
                )


            if(ngoData){
                console.log(ngoData.data.data.user)
              dispatch(loginNgo(ngoData.data.data.user));
              
              if(user?.username){
                dispatch(logout())
              }

              dispatch(loaded())
              navigate("/verify")
              
            }
        }
        catch(error){
            //setError(error.message)
            if(error.response){
              dispatch(loaded())
            toast.error(error.response.data.message,{
              position:'top-right',
              duration:3000,
              style: {
                 
                  fontSize: '20px', // Increase the font size
                  padding: '20px', 
                },
          })
        }}
    }
    const onSub=(data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
       formData.append('Id',data.Id)
        formData.append('avatar', data.avatar[0]);  
        formData.append('address', data.address);  
        formData.append('state', data.state);  
        formData.append('pNumber', data.pNumber);  
        
        
    
        create(formData);
      };
  return (
    <Animation>
    <div>
    {loading ?(<Spinner/>):(<>
      <div className='flex items-center justify-center mt-8'>
             <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                         <Logo width="100%" />
                     </span>
                     
                 </div>
                 <h2 className="text-center text-2xl font-bold leading-tight">Register your ngo</h2>
                 <p className="mt-2 text-center text-base text-red-600">
                     Already have an account?&nbsp;
                     <Link
                         to="/login"
                         className="font-medium text-primary transition-all duration-200 hover:underline text-red-600"
                     >
                         Sign In
                     </Link>
                 </p>
                 {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
         <form onSubmit={handleSubmit(onSub)} encType="multipart/form-data">
             <div className='space-y-5'>
                 <Input 
                 label="Ngoname:"
                 placeholder="Enter Your Ngo Name"
                 type="text"
                 {...register("name",{
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
                 label="Id"
                 placeholder="Enter Your Ngo Id"
                 type="text"
                 {...register("Id",{
                     required:true
                 })}
                
                 />

                <Input 
                 label="address"
                 placeholder="Enter Your Ngo address"
                 type="text"
                 {...register("address",{
                     required:true
                 })}
                
                 />
                 <Input 
                 label="state"
                 placeholder="Enter Your state"
                 type="text"
                 {...register("state",{
                     required:true
                 })}
                
                 />
                  <Input 
                 label="Phone"
                 placeholder="Enter Your phone number"
                 type="text"
                 {...register("pNumber",{
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
                 

             <Button type="submit" className="w-full">Register Ngo</Button>
             </div>

         </form>
             </div>
                 
         </div></>)}
       
         <Toaster/>
    </div>
    </Animation>
  )
}
export default Register