import React,{useState,useEffect} from 'react'
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
  Forward,
  UserPlus ,
  UserCheck,
  ThumbsUp,
  MessageSquareQuote,
  ArrowsUpFromLine,
  CalendarRange 
  
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import axios from 'axios'
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 
function Dashboard() {
    const user=useSelector((state)=>state.auth.userData)
    const [followers,setFollowers]=useState([])
    const [channel,setChannel]=useState([])
    console.log(user)
    const fetchFollowers=async()=>{
      try {
        const res=await axios.get("http://localhost:4000/api/v1/req/friend",{
          withCredentials:true  
        })
        if(res.data){
          setFollowers(res.data.data)
          console.log(res.data.data)
        }
        
      } catch (error) {
        console.log(error)
      }
    }
    const fetchChannel=async()=>{
      try {
        const res=await axios.get('http://localhost:4000/api/v1/channel/get',{
          withCredentials:true
        })
        if(res.data){
          setChannel(res.data.data)
          console.log(res.data.data)
          console.log(channel)
        }
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
      fetchFollowers()
      fetchChannel()
    },[])
    const users=[]
  if(followers){
    for(let i of followers){
      
      if(i.blogger._id.toString()===user._id.toString()){
        users.push({label:{name:i.follower.username,avatar:i.follower.avatar},value:i.follower._id})
      }
      else{
        users.push({label:i.blogger.username,value:i.blogger._id})
      }

    }
    console.log(users)
  }
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-4 font-bold">
              <Menu className="h-6 w-6" />
              <span className="text-xl">{user.username}</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only text-md">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                to='/userposts'
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                 <Forward  className="h-4 w-4" />
                Your Posts
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  {user.postHistory.length}
                </Badge>
              </Link>
              <Link
                to='/userDrafts'
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <Package className="h-4 w-4" />
                Your drafts
              </Link>
              <Link
                to='/editAvatar'
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                Edit Avatar
              </Link>
              
              <Link
                to='/liked'
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChart className="h-4 w-4" />
                Your liked Posts
              </Link>
              <Link
                to='/bookmarks'
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChart className="h-4 w-4" />
               Your Bookmarks
              </Link>
              <Link
                to='/yourEvents'
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <CalendarRange className="h-4 w-4" />
               Your Participated Events
              </Link>
            </nav>
          </div>
          
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                to='/userposts'
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                 <Forward  className="h-4 w-4" />
                Your Posts
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  {user.postHistory.length}
                </Badge>
              </Link>
              <Link
                to='/userDrafts'
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <Package className="h-4 w-4" />
                Your drafts
              </Link>
              <Link
                to='/editAvatar'
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                Edit Avatar
              </Link>
              
              <Link
                to='/liked'
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChart className="h-4 w-4" />
                Your liked Posts
              </Link>
              <Link
                to='/bookmarks'
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChart className="h-4 w-4" />
               Your Bookmarks
              </Link>
              <Link
                to='/yourEvents'
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <CalendarRange className="h-4 w-4" />
               Your Participated Events
              </Link>
              </nav>
              
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
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
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Activities</h1>
          </div>
          <div
            className="grid lg:grid-cols-3 md:grid-cols-2 gap-4  justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
          >
             
              <Popover>
      <PopoverTrigger asChild>
        <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  
                  <CardTitle className="text-4xl"><span><UserPlus /> Friends</span></CardTitle>
                </CardHeader>
                <CardContent>
                  {users && users.length}
                </CardContent>
                <CardFooter>
                  {/* <Progress value={25} aria-label="25% increase" /> */}
                </CardFooter>
              </Card>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        
<ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
  {users && users.map((user)=>(
    <li className='pb-3 sm:pb-4 '>
      <Link>
      <div class="flex items-center space-x-4 rtl:space-x-reverse">
      <div class="flex-shrink-0">
            <img class="w-8 h-8 rounded-full" src={user.label.avatar} alt="Neil image"/>
         </div>
      <div class="flex-1 min-w-0">
            <p class="text-md font-medium text-gray-900  items-center truncate dark:text-white">
              { user.label.name}
            </p>
            
         </div>
         </div>
      </Link>
    </li>
  ))}
   
  
  
   
  
</ul>

      </PopoverContent>
    </Popover>
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription></CardDescription>
                  <CardTitle className="text-4xl"><span> <UserCheck /><ArrowsUpFromLine />Total Posts</span></CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                   {user.postHistory.length}
                  </div>
                </CardContent>
                <CardFooter>
                  {/* <Progress value={12} aria-label="12% increase" /> */}
                </CardFooter>
              </Card>
              <Popover>
      <PopoverTrigger asChild>
        <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  
                  <CardTitle className="text-4xl"><span><Users /> User Channels</span></CardTitle>
                </CardHeader>
                <CardContent>
                  {channel && channel.length}
                </CardContent>
                <CardFooter>
                  {/* <Progress value={25} aria-label="25% increase" /> */}
                </CardFooter>
              </Card>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        
<ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
  {channel && channel.map((channel)=>(
    <li className='pb-3 sm:pb-4 '>
      <Link to='/chat'>
      <div class="flex items-center space-x-4 rtl:space-x-reverse">
      
      <div class="flex-1 min-w-0">
            <p class="text-md font-medium text-gray-900  items-center truncate dark:text-white">
              {channel.name}
            </p>
            
         </div>
         </div>
      </Link>
    </li>
  ))}
   
  
  
   
  
</ul>

      </PopoverContent>
    </Popover>
              
          </div>
        </main>
      </div>
    </div>
  )
}
export default Dashboard