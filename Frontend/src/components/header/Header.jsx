import React,{useState} from "react";
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
function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const ngoStatus=useSelector((state)=>state.ngo.status)
    const fStatus=authStatus||ngoStatus
    const navigate = useNavigate();
   // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
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
            name: 'SignUpNgo',
            url: '/registerNgo',
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
        navigate(`/Posts`,{ state: { category: value } })
    }
    return (
       
        <header className="sticky top-0  h-16 w-full  items-center gap-4  md:px-2">
            
            <nav class=" items-center justify-between flex-wrap bg-cyan-950 hidden  flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <div class="flex items-center flex-shrink-0 text-white mr-6">
            <div className="flex items-center mx-5 px-5">
                                <Logo  />
                                <h1 className="text-2xl font-medium text-gray-300 ml-5">BlogBites</h1>
                            </div>
            
            </div>
           
      
           
            <div class={` w-full block flex-grow lg:flex lg:items-center lg:w-auto`}>
            <div >
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
                        <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px] space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        
        <CollapsibleTrigger asChild>
        <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
        </CollapsibleTrigger>
      </div>
      
      <CollapsibleContent className="space-y-2">
      <nav className="grid gap-6 text-lg font-medium">
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
        </nav>
      </CollapsibleContent>
   </Collapsible>
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
          </header>
    );
}

export default Header;
