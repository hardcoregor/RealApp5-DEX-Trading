import React from 'react'

export const Banner = ({ text }) => {
  return (
    <div className='flex text-2xl font-poppins text-white text-center h-full items-center justify-center'>
      {text}
    </div>
  )
}
