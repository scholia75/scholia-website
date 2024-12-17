'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const Logo = () => {
  const router=useRouter()
  return (
  <button className='outline-none border-none ' onClick={()=>router.push('/')}>
     <Image src={'/images/logo.png'} width={100} height={100} alt='logo' className='w-32'/>
  </button>
  )
}

export default Logo
