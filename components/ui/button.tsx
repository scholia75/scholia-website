import clsx from 'clsx'
import React, { ReactNode } from 'react'

const Button = ({children,onClick,variant}:{children:ReactNode,onClick:()=>void,variant:'primary'|'secondary'|'outline'}) => {
  return (
    <button 
    onClick={onClick}
    className={
        clsx('flex justify-center items-center rounded-xl  px-6  transition-all duration-300 py-4 font-medium   ',
        variant==='primary'?'bg-primary text-white hover:bg-primary/95 shadow-md':variant==='secondary'?'bg-muted hover:bg-[#e0e0e0] shadow-md':'bg-background  border-2 border-primary text-primary')}>
         {children}
    </button>
  )
}

export default Button
