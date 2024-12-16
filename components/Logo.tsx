'use client'
import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <Image src={'/images/logo.png'} width={100} height={100} alt='logo' className='w-32'/>
  )
}

export default Logo
