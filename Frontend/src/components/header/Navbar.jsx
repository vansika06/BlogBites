import React,{useState} from "react";
import Logo from "../Logo.jsx";
import Logoutbtn from "../Logoutbtn.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../ui/select.jsx"
  
  import { MessageSquareText ,Menu} from 'lucide-react';
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  
  import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
  import { Button } from "@/components/ui/button"
function Navbar(){
    const authStatus = useSelector((state) => state.auth.status);
    const user=useSelector((state)=>state.auth.userData)
    const navigate = useNavigate();
   // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [category,setCategory]=useState("General")
const handleClick = () => {
    setIsOpen(!isOpen)
};
    const navItems = [
        {
            name: 'Home',
            url: '/',
            active: true
        },
        {
            name: 'Login',
            url: '/login',
            active: !authStatus,
        },
        {
            name: 'SignUp',
            url: '/signup',
            active: !authStatus,
        },
        {
             name: "Posts",
             url: "/main",
             active: authStatus
         },
        
    ];
    const handleOptionChange=(value)=>{
        navigate("/addPost",{ state: { option: value } })
    }
    const handleCategoryChange=(value)=>{
        //console.log(value)
       //setCategory(value)
        navigate(`/Posts`,{ state: { category: value} })
    }

    return(
        <header className="bg-cyan-950">
            <nav className="flex items-center justify-between px-12 h-16 lg:gap-8 ">
            <div className="flex items-center mx-5 px-5">
                    <Logo className="whitespace-nowrap"  />
                <h1 className="text-2xl font-medium text-gray-300 ml-5">BlogBites</h1>
             </div>
             <div className={`${isOpen?'top-16':'-top-full'} absolute  left-0 max-lg:bg-cyan-950 w-full flex flex-col gap-6 items-centerpy-2  lg:static lg:flex-row lg:justify-between`}>
                <ul className="flex flex-col gap-6 items-center lg:flex-row lg:gap-8">
                {navItems.map((item) => item.active && (
                                    <li key={item.name} className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                                        <button type="button" onClick={() => navigate(item.url)}>
                                            {item.name}
                                        </button>
                                    </li>
                ))}
                 {authStatus &&
                                 <li key="allPosts">
                                 <Select onValueChange={handleCategoryChange}>
                         <SelectTrigger className="w-[100px] hover:bg-gray-700 hover:text-white border-none hover:border-none font-medium ">
                        <SelectValue placeholder=" AllPosts" />
                        </SelectTrigger>
                    <   SelectContent>
                        <SelectItem value="Health">Health</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                            <SelectItem value="Science">Science</SelectItem>
                            <SelectItem value="Entertainment">Entertainment</SelectItem>
                            <SelectItem value="General">General</SelectItem>
                            <SelectItem value="Business">Business</SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                        </SelectContent>
                        </Select> 
                            </li> 
                            }
                {authStatus &&
                                 <li key="addPosts">
                                 <Select onValueChange={handleOptionChange}>
                         <SelectTrigger className="w-[180px] hover:bg-gray-700 hover:text-white border-none hover:border-none font-medium ">
                        <SelectValue placeholder=" AddPost-Type" />
                        </SelectTrigger>
                    <   SelectContent>
                        <SelectItem value="Normal" onClick={()=>console.log(value)}>Normal</SelectItem>
                        <SelectItem value="Audio">Audio</SelectItem>
                            <SelectItem value="Video">Video</SelectItem>
                        </SelectContent>
                        </Select> 
                            </li> }
                </ul>
                {authStatus && (
                           <div className="flex flex-col gap-6 items-center lg:flex-row lg:gap-8">
                            <TooltipProvider>
                            <Tooltip>
                            <TooltipTrigger>
                                <Link to='/chat'>
                                 <MessageSquareText  color= "#fff" />
                                 </Link>
                                 </TooltipTrigger>
                            <TooltipContent>
                            <p>Chat with your friends</p>
                            </TooltipContent>
                            </Tooltip>
                            </TooltipProvider>
                           
                               
                            </div>)}
                { authStatus && (
                <div className="flex flex-col gap-6 items-center lg:flex-row lg:gap-8">
                    <Link to='/dashboard'>
                     <Avatar>
             <AvatarImage src={user.avatar} />
             <AvatarFallback>{user.username}</AvatarFallback>
              </Avatar>
              </Link>
              <Logoutbtn  />
             </div>)}
             </div>
             
             <div className="lg:hidden">
                <button onClick={handleClick}>
             <Menu />
             </button>
             </div>
            </nav>
        </header>
    )
}
export default Navbar