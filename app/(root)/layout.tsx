'use client'
import Header from '@/components/Header'
import React, { ReactNode } from 'react'

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
   <>
   <Header/>
   {children}
   </>
  )
}

export default RootLayout
