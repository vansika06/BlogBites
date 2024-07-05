import React,{useState} from "react";
import Container from "../container/Container.jsx";
import Logo from "../Logo.jsx";
import Logoutbtn from "../Logoutbtn.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Link } from 'react-router-dom';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../ui/select.jsx"
  import { MessageSquareText } from 'lucide-react';
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  
function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
        // {
        //     name: "Add Post",
        //     url: "/addPost",
        //     active: authStatus
        // }
    ];
    const handleOptionChange=(value)=>{
        navigate("/addPost",{ state: { option: value } })
    }
    const handleCategoryChange=(value)=>{
        navigate(`/Posts`,{ state: { category: value } })
    }
    return (
       /*
            <nav className="flex items-center justify-between flex-wrap bg-cyan-950">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-start">
                            <div className="flex items-center">
                                <Logo />
                                <h1 className="text-2xl font-medium text-gray-300 ml-3">BlogBites</h1>
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <ul className="flex space-x-4">
                                {navItems.map((item) => item.active && (
                                    <li key={item.name} className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                                        <button type="button" onClick={() => navigate(item.url)}>
                                            {item.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {authStatus && (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <Logoutbtn />
                            </div>
                        )}
                    </div>
                </div>
            </nav>
       */
            <nav class="flex items-center justify-between flex-wrap bg-cyan-950">
            <div class="flex items-center flex-shrink-0 text-white mr-6">
            <div className="flex items-center mx-5 px-5">
                                <Logo  />
                                <h1 className="text-2xl font-medium text-gray-300 ml-5">BlogBites</h1>
                            </div>
            </div>
            <div class="block lg:hidden">
              <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white" onClick={handleMenuToggle}>
                <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
              </button>
            </div>
            <div class={`${isMobileMenuOpen ? 'block' : 'hidden'} w-full block flex-grow lg:flex lg:items-center lg:w-auto`}>
            <div className="hidden sm:block">
                            <ul className="flex space-x-4">
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
                            <div>
                            

                            </div>
                        </div>
                        </div>
                        {authStatus && (
                           <div className="order-last mx-5">
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
                        {authStatus && (
                           <div className="order-last mx-2">
                            

                                <Logoutbtn  />
                            </div>
                            
                        )}
                    
              
            
          </nav>
    );
}

export default Header;
