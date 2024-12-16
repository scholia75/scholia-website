'use client'
import React from 'react'
import Logo from './Logo'
import { navData } from '@/constants'
import Link from 'next/link'
import { Icon } from "@iconify/react";
import Button from './ui/button'
import { useRouter } from 'next/navigation'
const Header = () => {
    const router=useRouter()

  return (
    <header className='fixed top-0 left-0 w-full z-50 h-20  flex items-center bg-background  shadow-sm  '>
       <div className='container px-6 mx-auto flex flex-row items-center justify-between'>
       <Logo/>
       <nav className='max-md:hidden flex flex-row items-center gap-4'>
        <ul className='flex flex-row items-center gap-x-6'>
            {
                navData.map((link,index)=>(
                <li className=' font-medium' key={index}>
                    <Link href={'/'}>{link}</Link>
                </li>
                ))
            }
        </ul>

      
        <Button variant='primary' onClick={()=>router.push('/')}>
        Se connecter
        </Button>
       </nav>
       <button className='max-md:block hidden'>
       <Icon icon={'la:bars'} className='size-8 '/>
       </button>
       </div>
    </header>
  )
}

export default Header
