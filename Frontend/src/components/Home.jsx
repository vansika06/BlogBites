import React, { useEffect, useState } from 'react'
import {
 
 ListFilter,
 CircleUserRound ,
 PlusCircle,
 Search,
 
} from "lucide-react"

import { Button } from "@/components/ui/button"

import {
 DropdownMenu,
 DropdownMenuCheckboxItem,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

import {
 Tabs,
 TabsContent,
 TabsList,
 TabsTrigger,
} from "@/components/ui/tabs"
import axios from 'axios'
import Blogcard from './Blogcard'
import Animation from './Animation/Animation'

function Home() {
  const [blogs,setBlog]=useState([])
  useEffect(()=>{
     axios.get("http://localhost:4000/api/v1/blog/allPosts",{
      withCredentials:true
      })
     .then((blog)=>{
      setBlog(blog.data.data);
     })
  },[])
 
  //console.log(blogs)  
 return (
   <div className="flex min-h-screen w-full flex-col bg-muted/40">
     
     <div className="flex flex-col ">
       <header className="sticky top-0 z-30 flex h-14 items-center  border-b bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent ">
         
        
         <div className="relative ml-auto flex-1 md:grow-0">
           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
           <Input
             type="search"
             placeholder="Search..."
             className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
           />
         </div>
         <DropdownMenu>
           <DropdownMenuTrigger asChild>
             <Button
               variant="outline"
               size="icon"
               className="overflow-hidden rounded-full"
             >
                <CircleUserRound 
                 width={36}
                 height={36}
                 alt="Avatar"
                 className="overflow-hidden rounded-full"
               />
             </Button>
           </DropdownMenuTrigger>
           <DropdownMenuContent align="end">
             <DropdownMenuLabel>My Account</DropdownMenuLabel>
             <DropdownMenuSeparator />
             <DropdownMenuItem>Settings</DropdownMenuItem>
             <DropdownMenuItem>Support</DropdownMenuItem>
             <DropdownMenuSeparator />
             <DropdownMenuItem>Logout</DropdownMenuItem>
           </DropdownMenuContent>
         </DropdownMenu>
       </header>
       <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
         <Tabs defaultValue="Normal">
           <div className="flex items-center">
             <TabsList>
               <TabsTrigger value="Normal">Normal</TabsTrigger>
               <TabsTrigger value="Trending">Trending</TabsTrigger>
               <TabsTrigger value="Latest">Latest</TabsTrigger>
               <TabsTrigger value="Audios">Audios</TabsTrigger>
               <TabsTrigger value="Videos">Videos</TabsTrigger> 
             </TabsList>
             <div className="ml-auto flex items-center gap-2">
               <DropdownMenu>
                 <DropdownMenuTrigger asChild>
                   <Button variant="outline" size="sm" className="h-8 gap-1">
                     <ListFilter className="h-3.5 w-3.5" />
                     <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                       Filter
                     </span>
                   </Button>
                 </DropdownMenuTrigger>
                 <DropdownMenuContent align="end">
                   <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                   <DropdownMenuSeparator />
                   <DropdownMenuCheckboxItem checked>
                     Category
                   </DropdownMenuCheckboxItem>
                   <DropdownMenuCheckboxItem>Likes</DropdownMenuCheckboxItem>
                   <DropdownMenuCheckboxItem>
                    Views
                   </DropdownMenuCheckboxItem>
                 </DropdownMenuContent>
               </DropdownMenu>
               
               <Button size="sm" className="h-8 gap-1">
                 <PlusCircle className="h-3.5 w-3.5" />
                 <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                   Add Product
                 </span>
               </Button>
             </div>
           </div>
           
           <TabsContent value="Normal">
           {blogs.map((post,index)=>(
            <Animation transition={{duration:1,delay:index*1}} key={index}>
              <Blogcard title={post.title} thumbnail={post.thumbnail} description={post.description} image={post.image} owner={post.owner} createdAt={post.createdAt} category={post.category} blogId={post._id}  />
            </Animation>
           ))} 
           </TabsContent>
           <TabsContent value="Audios">
           {blogs.map((post,index)=>(
            <Animation transition={{duration:1,delay:index*1}} key={index}>
              <Blogcard title={post.title} thumbnail={post.thumbnail} description={post.description} image={post.image} owner={post.owner} createdAt={post.createdAt} category={post.category} blogId={post._id}  />
            </Animation>
           ))} 
           </TabsContent>
           <TabsContent value="Videos">
           {blogs.map((post,index)=>(
            <Animation transition={{duration:1,delay:index*1}} key={index}>
              <Blogcard title={post.title} thumbnail={post.thumbnail} description={post.description} image={post.image} owner={post.owner} createdAt={post.createdAt} category={post.category} blogId={post._id}  />
            </Animation>
           ))} 
           </TabsContent>
         </Tabs>
         
        </main> 
     </div>
   </div>


    
  )
}
export default Home