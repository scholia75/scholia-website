'use client'
import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import { navData } from '@/constants'
import Link from 'next/link'
import { Icon } from "@iconify/react";

import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'
import { XMarkIcon,Bars3Icon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
const Header = () => {
    const router=useRouter()
   const [isOpen, setIsOpen] = useState(false)
   const [isScrolled, setIsScrolled] = useState(false)
   useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "auto"; 
    }

   
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);


    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [])
   
  return (
    <header className={clsx('fixed top-0 left-0 w-full z-50 h-20  flex items-center bg-background ',isScrolled && 'shadow-sm')}>
       <div className='container px-6 mx-auto flex flex-row items-center justify-between'>
       <Logo/>
       <nav 
       className={clsx('max-md:absolute  left-0  max-md:p-6 max-md:w-full bg-background max-md:h-screen flex max-md:flex-col flex-row items-center gap-4 transition-all duration-300',
      isOpen ?'top-0':'-top-[1000px]'
       )}>
        <div className='w-full  flex-row justify-between max-md:flex hidden'>
          <Logo/>
         <button className='outline-none border-none' onClick={()=>setIsOpen(false)}>
         <XMarkIcon className='size-8'/>
         </button>
        </div>
        <ul className='flex max-md:flex-col flex-row items-center gap-x-6  gap-y-4'>
            {
                navData.map((link,index)=>(
                <li className=' font-medium' key={index}>
                    <Link href={'/'} onClick={()=>setIsOpen(false)}>{link}</Link>
                </li>
                ))
            }
        </ul>

       <Button className='font-medium max-md:w-full' size='lg' onPress={()=>{router.push('/auth/login'),setIsOpen(false)}} color='primary'>
        Se connecter
       </Button>
       </nav>
       <button className='max-md:block hidden' onClick={()=>setIsOpen(true)}>
       <Bars3Icon className='size-8'/>
       </button>
       </div>
    </header>
  )
}

export default Header
