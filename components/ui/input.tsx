import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const Input = ({type,icon}:{type:'email'|'password'|'text',icon:string}) => {
  return (
  <div className='flex p-2 flex-row gap-x-2 rounded-lg border border-border bg-input '>
    <Icon icon={icon} className='size-6 text-border'/>
     <input type={type} className='bg-transparent outline-none flex-1'/>
     
  </div>
  )
}

export default Input
