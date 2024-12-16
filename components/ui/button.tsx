import React, { ReactNode } from 'react'

const Button = ({children,onClick,variant}:{children:ReactNode,onClick:()=>void,variant:'primary'|'secondary'}) => {
  return (
    <button 
    onClick={onClick}
    className='bg-primary flex justify-center items-center rounded-xl shadow-md px-6  transition-all duration-300 py-4 font-medium  text-white hover:bg-primary/95 '>
         {children}
    </button>
  )
}

export default Button
