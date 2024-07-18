import React from 'react'
//import Autoplay from "embla-carousel-autoplay"
//import '../assets/Landing'
import Animation from './Animation/Animation'
import { motion } from 'framer-motion'
 function Landing() {
    const charVariants={
        hidden:{opacity:0},
        reveal:{opacity:1}
    }
    const split=(text)=>{
        return text.split('')
    }
  return (
    <main className='lg:flex lg:flex-row flex-col gap-10 lg:gap-15  md:px-10 lg:px-16 lg:mt-10 mt-10 '>
       {/* // <Animation animate={{ rotate: [0, -5, 5, -5, 5, 0] }} transition={{  repeat: Infinity, repeatType: "mirror" }}> */}
    <div className='flex items-center lg:gap-y-10  md:px-10 lg:px-16 justify-center lg:flex-1 lg:order-2 lg:flex-end'>
        
      <img src='https://as2.ftcdn.net/v2/jpg/05/62/48/19/1000_F_562481964_bDKFSY3CgMcoyFfiJ2jVHLwNyWltlz9i.jpg' alt='landing logo' className='outline-white shadow-2xl shadow-black h-[450px] w-[450px] rounded-full'/>
    </div>
    {/* </Animation> */}
    <div className='space-y-6 lg:flex-1 lg:order-1 lg:space-y-10'>
        <div>
            <motion.h1 initial="hidden" animate="reveal" variants={charVariants}  transition={{staggerChildren:0.015}}className='text-6xl font-bold leading-tight bg-gradient-to-r from-orange-300 to-rose-300 bg-clip-text text-transparent'>{split("Explore,Express,and Engage").map(
                (char,index)=>(
                   < motion.span
                   key={index}
                   transition={{duration:1}}
                   variants={charVariants}>
                    {char}
                   </motion.span>
                )
            )}</motion.h1>
            <p className='text-2xl text-white'>Connect,Create,and Share Your Stories.Your Stories,Our Platform,Endless Possibilities</p>
        </div>
    </div>
    <div>
      <div>
      {/* <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
    <CarouselContent>
    <CarouselItem>
        <div><lord-icon
    src="https://cdn.lordicon.com/zfzufhzk.json"
    trigger="in"
    delay="1500"
    stroke="bold"
    state="in-dynamic"
    style="width:250px;height:250px">
</lord-icon></div>
    </CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
    </Carousel> */}
        </div>  
    </div>
    </main>
  )
}
export default Landing