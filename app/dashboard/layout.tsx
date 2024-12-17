'use client'

import DashbaordHeader from '@/components/dashboard/DashbaordHeader'
import Sidebare from '@/components/dashboard/Sidebare'

import React, { ReactNode } from 'react'

const DashbaordLayout = ({children}:{children:ReactNode}) => {
  return (
<div className='w-full flex flex-row'>
<Sidebare/>
   <main className='bg-content2 w-full h-screen'>
    <DashbaordHeader/>
   {children}
   </main>
</div>
  )
}

export default DashbaordLayout
