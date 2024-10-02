import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { useSelector } from 'react-redux';
import { UserType } from '@/features/userType';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button
 from '../Button';
function EventLayout({event}) {
 // console.log(event)
 console.log(event.participants)
 const state = useSelector((state) => state);
  const {type,data}=UserType(state)
  const [hasJoined, setHasJoined] = useState(event.participants.includes(data._id));
  const navigate=useNavigate()
  // Handle the button click
  const handleJoinClick = () => {
    if (!hasJoined) {
      // Add logic to send a request to join the event (e.g., an API call)
      // Update the state to reflect that the user has joined
      setHasJoined(true);
    }
  };
  const joinGroup=async(id1,id2)=>{
   try {
    console.log("hi")
     const data={
       groupId:id1,
       eventId:id2
     }
     const res=await axios.post('http://localhost:4000/api/v1/ngo/participate',data,{
       withCredentials:true
     })
     if(res){
       navigate(`/eventChat/${id1}`)
     //  console.log(res)
     //  console.log("Joined")
     }
   } catch (error) {
    console.log(error)
   }
  }
  //const hasJoined=event.participants.includes(data._id);
  console.log(hasJoined)
  const btnState=hasJoined?"You Joined as volunteer for this event":"Join as volunteer "
  console.log(btnState)
  const [btn,setBtn]=useState(btnState)
 const handleJoin=async(id)=>{
  if (!hasJoined) {
  const res=await axios.post('http://localhost:4000/api/v1/ngo/participate',{eventId:id},{
    withCredentials:true
  })
  if(res){
    console.log("join1")
    setHasJoined(true);
  }
   // setBtn("You Joined as volunteer for this event")
  }
 }
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden" >
      <img 
        src={event.image} 
        alt={event.name}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-gray-800">{event.name}</h1>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">Active</span>
        </div>
        
        <div className="flex items-center mb-4">
          <img 
            src={event.organiser.avatar} 
            alt="NGO Avatar" 
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div>
            <h3 className="text-sm font-medium text-gray-800">{event.organiser.name} </h3>
            <p className="text-xs text-gray-600">Event Organizer</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-gray-600 mr-2" />
            <span>{`${event.startDate}-${event.endDate}`}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-600 mr-2" />
            <span>{`${event.startime}-${event.endtime}`}</span>
          </div>
          <div className="flex items-center col-span-2">
            <MapPin className="h-4 w-4 text-gray-600 mr-2" />
            <span>{event.address}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
         {event.description}
        </p>
        {type==="user" && 
        <div className="flex justify-between items-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-full transition duration-300 flex items-center"  onClick={()=>handleJoin(event._id)}  disabled={hasJoined}>
          <Users className="h-4 w-4 mr-2" />
          {btnState}
        </button>
        <Button onClick={() => joinGroup(event.groupId,event._id)}>
  Join Event
</Button>

      </div>}
        
      </div>
    </div>
  );
}

export default EventLayout;