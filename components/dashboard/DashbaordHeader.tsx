'use client'
import React from 'react'
import ProfilePopover from './ProfilePopover'
import AlertsBox from './AlertsBox'
import { Bars3Icon } from '@heroicons/react/24/solid'
import ModeToggle from '../ui/ModeToggle'

const DashbaordHeader = () => {
  return (
   <header className='w-full h-20 px-6 bg-background shadow-sm transition-all duration-300 flex flex-row-reverse items-center justify-between'>
    <div className='flex flex-row items-center gap-x-3'>
      <ModeToggle/>
      <AlertsBox/>
      <ProfilePopover/>
     

    </div>

    <button className='max-md:block hidden' >
       <Bars3Icon className='size-8'/>
       </button>
   </header>
  )
}

export default DashbaordHeader
