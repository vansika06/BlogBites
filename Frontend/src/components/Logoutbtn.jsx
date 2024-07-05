import React from 'react'
import {useDispatch} from 'react-redux'
import {logout} from '../features/authslice'
 function Logoutbtn() {
  const handleClick=async()=>{
    try{
      const session= await axios.post('http://localhost:4000/api/v1/users/logout',{
        withCredentials: true})
    }
    catch(e){
      console.log(e.message)
    }
  }
  return (
    <div className='order-last'>
      <button class="bg-amber-500 hover:bg-stone-200  text-yellow font-bold py-1 px-3 rounded-full">
  SignOut
</button>
    </div>
  )
}
export default Logoutbtn