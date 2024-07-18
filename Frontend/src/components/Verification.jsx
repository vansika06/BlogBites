import React, { useEffect, useState } from 'react'
import Logo from './Logo.jsx'
import { useNavigate,Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {login as log} from "../features/authslice.js"
import { isVerified } from '../features/authslice.js'
import Animation from './Animation/Animation.jsx'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
 import axios from 'axios'
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from './ui/button.jsx'
import toast, { Toaster } from 'react-hot-toast';
 
function Verification() {
    const user=useSelector((state)=>state.auth.userData)
    console.log(user)
    const navigate=useNavigate()
    const [otp,setOtp]=useState(['','','',''])
    const [value,setValue]=useState('')
    const [emailsent,setEmailsent]=useState(false)
    const emaildata={
        email:user.email,
        userId:user._id
    }
    const dispatch=useDispatch()
    
    const handleChange=(index,value)=>{
      console.log(index)
      console.log(value)
        const newOtp = [...otp];
        console.log(newOtp)
    newOtp[index] = value;
    setOtp(newOtp);
    console.log(newOtp)
    console.log(otp)
    }
    const sendEmail=async()=>{
        try {
            const res=await axios.post('http://localhost:4000/api/v1/users/sendmail',emaildata,{
                withCredentials: true})
                //console.log(res)
                if(res){
                  toast.success("Email sent successfully",{
                    position:'top-right',
                    duration:3000,
                    style: {
                       
                        fontSize: '20px', // Increase the font size
                        padding: '20px', 
                      },
                })
                }
                setEmailsent(true)
        } catch (error) {
            console.log(error)
            if(error.response){
              toast.error(error.response.data.message,{
                position:'top-right',
                duration:3000,
                style: {
                   
                    fontSize: '20px', // Increase the font size
                    padding: '20px', 
                  },
            })
            }
        }
    }
    useEffect(()=>{
      if(!emailsent){
        sendEmail()
      }
      
    },[emailsent])
    const handleSubmit=async()=>{
      try {
        const finalOtp=otp.join('')
        console.log(finalOtp)
        const data={
          token:value,
          userId:user._id
        }
        console.log(data)
        const res=await axios.post('http://localhost:4000/api/v1/users/verify',data,{
                  withCredentials: true})
                  console.log(res)
                  if(res.data.success){
                    console.log(res)
                    dispatch(isVerified())
                   // console.log(useSelector((state)=>state.auth.status))
                    toast.success("User verified successfully",{
                      position:'top-right',
                      duration:3000,
                      style: {
                         
                          fontSize: '20px', // Increase the font size
                          padding: '20px', 
                        },
                  })
                  setTimeout(()=>{
                    navigate('/')
                  },3000)
                    
                  }
                  
      } catch (error) {
        if(error.response){
          toast.error(error.response.data.message,{
            position:'top-right',
            duration:3000,
            style: {
               
                fontSize: '20px', // Increase the font size
                padding: '20px', 
              },
        })
        }
      }
    }
    const handleResend=async()=>{
      sendEmail()
    }

  return (
    <div>
     <Animation>
    <div>
      <div className="flex items-center justify-center w-full mt-10">
            <div>
                
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <div className='flex flex-col gap-5 mx-5'>
        <h2 className="text-center text-2xl font-bold leading-tight">Verify your email </h2>
        
        
        <InputOTP  maxLength={4} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} value={value} onChange={(value)=>setValue(value)}>
      <InputOTPGroup >
      {otp.map((value, index) => (
            <InputOTPSlot
              key={index}
              value={value}
              onChangeCapture={(e) => handleChange(index, e.target.value)}
              index={index}
            />
          ))}
      </InputOTPGroup>
    </InputOTP>
    <Button onClick={handleSubmit}>verify</Button>
    </div>
    <div className='text-center py-4'>
      <span className='text-gray-500'>can't get otp?
        <button className='text-red-400' onClick={handleResend}>Resend</button></span>
    </div>
        </div>
            </div>


        </div>
        <Toaster/> 
    </div>
    
    </Animation> 
    </div>
  )
}
export default Verification