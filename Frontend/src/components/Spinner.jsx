import React from 'react'
import loading from "../spin.gif"
export default function Spinner() {
  return (
    <div className='flex justify-center items-center'>
    <img src={loading} alt="loading"></img>
    </div>
  
  )
}
