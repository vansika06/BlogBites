import React ,{ useState } from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Navbar from './components/header/Navbar'
import { Outlet } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
function App() {
  
  return (
    <>
      <>
    {/* <h1 className="text-3xl font-bold underline bg-slate-400" >hww</h1> */}
    <Navbar/> 
    <Outlet/> 
   <Footer/>
  
    </>
    </>
  )
}

export default App
