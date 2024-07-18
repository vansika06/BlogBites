import React ,{useState}from 'react'
import Button from './Button.jsx'
import Input from './Input.jsx'
import axios from 'axios'
import Logo from './Logo.jsx'
import { useNavigate,Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {login as log,isVerified} from "../features/authslice.js"
import Animation from './Animation/Animation.jsx'
import Spinner from './Spinner.jsx'
import toast, { Toaster } from 'react-hot-toast';
//for react hooke form
import {useForm} from 'react-hook-form'
import { loaded } from '../features/loading.js'
 function Login() {
    const navigate=useNavigate()
    const loading=useSelector((state)=>state.loader.loading)
    const dispatch=useDispatch()
    const { register, handleSubmit } = useForm()
    const [error,setError]=useState("")
    const login=async(data)=>{
        setError("")
        try{
            console.log(loading)
            dispatch(loaded())
            console.log(loading)
            const session=await axios.post('http://localhost:4000/api/v1/users/login',data,
                {
                    withCredentials: true}
            )
            if(session){
              const userData=await axios.get('http://localhost:4000/api/v1/users/currentUser',{
                withCredentials: true})
              if(userData){
                dispatch(log(userData.data.data))
                dispatch(isVerified())
                dispatch(loaded())
                console.log(loading)
                console.log(userData.data.data);
                navigate("/")
              }
            }
        }
        catch(error){
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
        }
            //setError(e.message);
        }
    }
  return (
    
    <Animation>
    <div>
    {loading ?(<Spinner/>):(<>
        <div className="flex items-center justify-center w-full mt-8">
      
      <div>
      
  <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
  
  <div className="mb-2 flex justify-center">
              <span className="inline-block w-full max-w-[100px]">
                  <Logo width="100%" />
              </span>
  </div>
  <h2 className="text-center text-3xl font-bold leading-tight">Sign In</h2>
  <p className="mt-2 text-center text-base  text-red-600">
              Don&apos;t have any account?&nbsp;
              <Link
                  to="/signup"
                  className="font-bold text-red-600 text-primary transition-all duration-200 hover:underline"
              >
                  Sign Up
              </Link>
  </p>
  
  <form onSubmit={handleSubmit(login)} className='mt-8'>
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
  <Input label="Password:"
  placeholder="enter password"
  type="password"
  {
      ...register("password",{
          required:true,
      })
  }
  /> 
  {/* /* we are using already designed buttons and input fields   */}
  <Button
  type="submit"
  className='w-full'>SignIn</Button>
  </form>
  </div>
      </div>


  </div>
  <Toaster/>
    </>)} 

    <Toaster/>  
    </div>
    </Animation>
  )
}
export default Login