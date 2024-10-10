import React ,{useEffect,useState}from 'react'
import { Button } from "@/components/ui/button"
import { useForm,Controller } from 'react-hook-form'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'; // or whatever toast library you're using
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { data } from 'autoprefixer'
import { Textarea } from "@/components/ui/textarea"

function Event() {
  const navigate = useNavigate();
  const {register,handleSubmit,setValue,watch,control}=useForm()
  const create=async(data)=>{
    console.log("Form data:", data);
    
    try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        
    
        const event=await axios.post('http://localhost:4000/api/v1/ngo/addEvent',data,{
            withCredentials: true
        }
            )


        if(event){
            console.log(event.data.data)
            toast.success("Added successfully",{
              position:'top-right',
              duration:3000,
              style: {
                 
                  fontSize: '20px', // Increase the font size
                  padding: '20px', 
                },
          })
          navigate("/main")
          
        }
    }
    catch(error){
        //setError(error.message)
        if(error.response){
          
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
const Sub=(data) => {
  console.log("hi")
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('startDate', format(new Date(data.startDate), "yyyy-MM-dd"));
    formData.append('endDate',data.endDate);
   formData.append('startime',data.startime)
    formData.append('image', data.image[0]);  
    formData.append('address', data.address);  
    formData.append('endtime', data.endtime);  
   formData.append("grpName",data.grpName)
    
    

    create(formData);
  };
  
  return (
    
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <h2 className="text-3xl font-bold text-center">Add Your Event</h2>
          <p className="text-sm text-gray-500 text-center">
            Create an event to call for volunteers and donors
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(Sub)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Event Name</Label>
              <Input
                id="name"
                placeholder="Enter event name"
                {...register("name", { required: true })}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grpName"> Name of Group</Label>
              <Input
                id="grpName"
                placeholder="Enter grp name"
                {...register("grpName", { required: true })}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your event"
                {...register("description", { required: true })}
                className="w-full h-24"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="picture">Event Picture</Label>
              <Input
                id="picture"
                type="file"
                {...register("image", { required: true })}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Event location"
                {...register("address", { required: true })}
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Controller
                  name="startDate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal ${
                            !field.value && "text-muted-foreground"
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => field.onChange(date ? date.toISOString() : null)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Controller
                  name="endDate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal ${
                            !field.value && "text-muted-foreground"
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
  onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : null)} // Format the date here
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startime">Start Time</Label>
                <Input
                  id="startime"
                  type="time"
                  {...register("startime", { required: true })}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endtime">End Time</Label>
                <Input
                  id="endtime"
                  type="time"
                  {...register("endtime", { required: true })}
                  className="w-full"
                />
              </div>
            </div>
            <Button type="submit" className="w-full" >
            Add Event
          </Button>
          </form>
        </CardContent>
        
      </Card>
      <Toaster/>

    </div>
  )
}

export default Event
