import React ,{ useState } from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom'
function App() {
  
  return (
    <>
      <>
    {/* <h1 className="text-3xl font-bold underline bg-slate-400" >hww</h1> */}
    <Header/> 
    <Outlet/> 
   <Footer/>
    </>
    </>
  )
}

export default App
