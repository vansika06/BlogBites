import React from 'react'
//import Autoplay from "embla-carousel-autoplay"
//import '../assets/Landing'
import Animation from './Animation/Animation'
import { motion } from 'framer-motion'
import { UserCircle ,Users} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
 function Landing() {
  const navigate=useNavigate()
    const charVariants={
        hidden:{opacity:0},
        reveal:{opacity:1}
    }
    const split=(text)=>{
        return text.split('')
    }
    
  return (
    <main className='flex flex-col items-center justify-center lg:mt-10 mt-10'>
  {/* Animated Text on Top */}
  <div className='space-y-6 text-center'>
    <motion.h1 
      initial="hidden" 
      animate="reveal" 
      variants={charVariants}  
      transition={{ staggerChildren: 0.015 }} 
      className='text-6xl font-bold leading-tight bg-gradient-to-r from-orange-300 to-rose-300 bg-clip-text text-transparent'>
      {split("Explore, Express, and Engage").map((char, index) => (
        <motion.span
          key={index}
          transition={{ duration: 1 }}
          variants={charVariants}>
          {char}
        </motion.span>
      ))}
    </motion.h1>
    <p className='text-2xl text-white'>
      Connect, Create, and Share Your Stories. Your Stories, Our Platform, Endless Possibilities
    </p>
  </div>

  {/* Image Next to Text */}
  <div className='flex items-center justify-center mt-8 lg:flex-row flex-col-reverse'>
    <div className='lg:mr-10'>
      <img 
        src='https://as2.ftcdn.net/v2/jpg/05/62/48/19/1000_F_562481964_bDKFSY3CgMcoyFfiJ2jVHLwNyWltlz9i.jpg' 
        alt='landing logo' 
        className='outline-white shadow-2xl shadow-black h-[350px] w-[350px] rounded-full'/>
    </div>
  </div>

  {/* Centered Login Section for User/NGO Below */}
  <div className="flex flex-col sm:flex-row items-stretch justify-center space-y-6 sm:space-y-0 sm:space-x-6 lg:w-3/4 mt-10">
    <div className="w-full sm:w-1/3 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      <img 
        src="https://icon-library.com/images/user-icon-png-transparent/user-icon-png-transparent-23.jpg" 
        alt="User illustration" 
        className="w-full h-32 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-blue-900 mb-2">User Login/Signup</h3>
        <p className="text-gray-600 mb-4 flex-grow">Join our community and start sharing your stories.</p>
        <div>
          <UserCircle  size={20} />
          <button type="button" class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-5" onClick={()=>navigate('/login')}>Login </button>
  <button type="button" class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 " onClick={()=>navigate('/signup')}>Signup</button>
  </div>
        
      </div>
    </div>
    
    <div className="w-full sm:w-1/3 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      <img 
        src="https://cdn.vectorstock.com/i/500p/14/85/ngo-or-non-governmental-organization-to-serve-vector-50761485.jpg" 
        alt="NGO illustration" 
        className="w-full h-32 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-blue-900 mb-2">NGO Login/Signup</h3>
        <p className="text-gray-600 mb-4 flex-grow">Connect with supporters and share your mission.</p>
       <div>
          <Users size={20} />
          <button type="button" class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-5" onClick={()=>navigate('/loginNgo')}>Login </button>
<button type="button" class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 " onClick={()=>navigate('/registerNgo')}>Signup</button>
</div>
      </div>
    </div>
  </div>
</main>

  
  )
}
export default Landing