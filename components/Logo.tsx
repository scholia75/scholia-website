'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
   <Link href={'/'}>
    <Image src={'/images/logo.png'} width={100} height={100} alt='logo' className='w-32'/>
   </Link>
  )
}

export default Logo
