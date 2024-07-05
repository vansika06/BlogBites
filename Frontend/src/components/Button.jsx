import React from 'react'

export default function Button({children,
  type='button',
  bgColor='bg-blue-500',
  textColor='text-white',
  className='',
  ...props

}) {
  return (
    <div>
      <button className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}{...props}>{children}</button>
    </div>
  )
}