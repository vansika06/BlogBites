import React from 'react'

 function Container({children}) {
  return (
    <div className='container-lg mx-auto px-4'>
      {children}
    </div>
  )
}
export default Container
