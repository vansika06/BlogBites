import React ,{useState,useEffect} from 'react'
import axios from 'axios'
 function useOwner({owner}) {
    const [user,setUser]=useState({})
   useEffect(()=>{
    axios.post("http://localhost:4000/api/v1/users/user",{owner:owner},{
      withCredentials: true
      
  })
  .then((res)=>{
   setUser(res.data.data)
  })
   },[owner])
  return (
    {user}
  )
}
export default useOwner