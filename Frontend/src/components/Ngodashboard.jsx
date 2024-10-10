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
 
function Ngodashboard() {
    const user=useSelector((state)=>state.ngo.ngoData)
    const [vol,setVol]=useState(0)
  const f=async()=>{
    const res=await axios.get('http://localhost:4000/api/v1/ngo/totVol',{
      withCredentials:true,
      
      })
      if(res){
        setVol(res.data.data)
      }
  }
  useEffect(()=>{
    f()
  },[])
    const users=[]
  
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-4 font-bold">
              <Menu className="h-6 w-6" />
              <span className="text-xl">{user.name}</span>
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
                to='/ngoevents'
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                 <Forward  className="h-4 w-4" />
                Your Events
                
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
                to='/ngoevents'
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                 <Forward  className="h-4 w-4" />
                Your Events
               
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
              
              </nav>
              
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            
          </div>
          
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
                  
                  <CardTitle className="text-4xl"><span><UserPlus /> Total Volunteers Joined till now</span></CardTitle>
                </CardHeader>
                <CardContent>
                  {vol}
                </CardContent>
                <CardFooter>
                  {/* <Progress value={25} aria-label="25% increase" /> */}
                </CardFooter>
              </Card>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        

      </PopoverContent>
    </Popover>
              
              
          </div>
        </main>
      </div>
    </div>
  )
}
export default Ngodashboard