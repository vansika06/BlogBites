import React ,{useEffect,useState} from 'react'
import axios from 'axios'
import { UserType } from '@/features/userType.js'
import { useSelector } from 'react-redux';
import EventLayout from './Pevent.jsx';
function AllEvent() {
  const state = useSelector((state) => state);
  const {type,data}=UserType(state)
    const  [event,setEvent]=useState([]);
    const fetch=async()=>{
      try{
        const res=await axios.get('http://localhost:4000/api/v1/ngo/getAllEvents',{
          withCredentials:true,
          headers: {
           usertype: type, // or 'ngo' based on the logged-in entity
         },
          })
          if(res.data){
            setEvent(res.data.data)
            console.log(res.data.data)
          }
      }
      catch(e){
        console.log(e)
      }
    }
    useEffect(()=>{
      fetch()
    },[])
  return (
    <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 mt-5'>
        {
            event && event.map((e)=>(
                <>
                <EventLayout event={e} key={e._id}/>
                </>
            ))
        }
      
    </div>
  )
}

export default AllEvent
