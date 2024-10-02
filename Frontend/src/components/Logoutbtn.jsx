import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../features/authslice'
import {logout as logoutNgo} from '../features/ngo.js'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import persistor from '../store/store.js'
 function Logoutbtn() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const ngoData=useSelector((state)=>state.ngo.ngoData)
  const userData=useSelector((state)=>state.auth.userData)
  console.log(ngoData)
 const handleClick=async()=>{
    try{
      if(userData && userData.username){
      const session= await axios.get('http://localhost:4000/api/v1/users/logout',{
        withCredentials: true})
        if(session){
          dispatch(logout())
          navigate('/')
        }}
        else if(ngoData && ngoData.name){
          const session= await axios.get('http://localhost:4000/api/v1/ngo/logoutNgo',{
            withCredentials: true})
            if(session){
              dispatch(logoutNgo())
              navigate('/')
            } 
        }
    }
    catch(e){
      console.log(e.message)
    }
  }
     /*
 const handleClick=()=>{
  persistor.purge().then(() => {
    console.log("Persisted state has been purged");
});

 }*/
  return (
    <div className='order-last'>
      <button class="bg-amber-500 hover:bg-stone-200  text-yellow font-bold py-1 px-3 rounded-full" onClick={handleClick}>
  SignOut
</button>
    </div>
  )
}
export default Logoutbtn