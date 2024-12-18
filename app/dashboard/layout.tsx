'use client'

import DashbaordHeader from '@/components/dashboard/DashbaordHeader'
import Sidebare from '@/components/dashboard/Sidebare'
import SessionProvider from '@/providers/SessionProvider'

import React, { ReactNode } from 'react'

const DashbaordLayout = ({children}:{children:ReactNode}) => {
  return (
<SessionProvider>
<div className='w-full flex flex-row'>
<Sidebare/>
   <main className='bg-content2 w-full h-screen'>
    <DashbaordHeader/>
   <section className='p-6'>
   {children}
   </section>
   </main>
</div>
</SessionProvider>
  )
}

export default DashbaordLayout
