'use client'

import React from 'react'
import Logo from '../Logo'
import { dashboardNavs } from '@/constants'
import Link from 'next/link'
import { HomeIcon, UserIcon, AcademicCapIcon, DocumentIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const Sidebare = () => {
    const pathname=usePathname()
    const iconMap = {
        HomeIcon: <HomeIcon className="h-6 w-6 text-primary" />,
        UserIcon: <UserIcon className="h-6 w-6 text-primary" />,
        AcademicCapIcon: <AcademicCapIcon className="h-6 w-6 text-primary" />,
        DocumentIcon: <DocumentIcon className="h-6 w-6 text-primary" />,
    };
  return (
  <aside className='w-1/4 border-r h-screen overflow-hidden p-6 max-md:hidden'>
    <Logo/>
    <ul className='space-y-2 mt-6'>
        {
            dashboardNavs.map(({name,link,icon},index)=>(
                <li key={index} className={clsx('p-3  rounded-lg',pathname===link && 'bg-primary/5' )} >
                   <Link href={link} className={clsx(' font-medium flex flex-row items-center gap-x-3',pathname===link ? 'text-primary':'text-neutral-500')}>
                   {iconMap[icon as keyof typeof iconMap]}
                   {name}
                   </Link>
                </li>
            ))
        }
    </ul>
  </aside>
  )
}

export default Sidebare
