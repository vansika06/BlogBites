import React from 'react'
import { Link } from 'react-router-dom'

 function Logo() {
  return (
    <div className='flex-none ml-0'>
      
    <Link to='/' className='text-3xl font-bold font-heading'>
    <img src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png" alt="Logo" width="70" height="40" />
   
  
    </Link>
    </div>
  )
}
export default Logo