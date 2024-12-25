'use client';

import React, { useEffect, useState } from 'react';
import Logo from '../Logo';
import { dashboardNavs } from '@/constants';
import Link from 'next/link';
import { HomeIcon, AcademicCapIcon, DocumentIcon,ClipboardDocumentListIcon,UsersIcon,UserGroupIcon,QueueListIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import useUserStore from '@/stores/useUserStore';
import { NavDataType } from '@/types';

const Sidebare = () => {
    const pathname = usePathname();
    const {user}=useUserStore()
    const [navData, setNavData] = useState<NavDataType[]>(dashboardNavs)
    useEffect(() => {
      if(user?.type==='student'){
        const data=dashboardNavs.filter(item=>(item.id===1 || item.id===5)) 
         setNavData(data)
      }else if(user?.type==='partner'){
        const data=dashboardNavs.filter(item=>(item.id===1 || item.id===5)) 
        setNavData(data)
      }
    }, [user])
    
    return (
        <aside className=" w-96 border-r h-screen overflow-hidden p-6 max-md:absolute bg-content1 -left-96">
            <Logo />
            <ul className="space-y-2 mt-6 transition-all duration-300">
                {navData.map(({ name, link, icon }, index) => {
                
                    const IconComponent = {
                        HomeIcon: HomeIcon,
                        UsersIcon:UsersIcon,
                        UserGroupIcon: UserGroupIcon,
                        AcademicCapIcon: AcademicCapIcon,
                        DocumentIcon: DocumentIcon,
                        ClipboardDocumentListIcon:ClipboardDocumentListIcon,
                        QueueListIcon:QueueListIcon
                    }[icon];

                    const isActive = pathname === link;

                    return (
                        <li
                            key={index}
                            className={clsx(
                                'p-3   rounded-lg hover:bg-primary-50 group transition-all duration-300',
                                isActive && 'bg-primary-50'
                            )}
                        >
                            <Link
                                href={link}
                                className={clsx(
                                    'font-medium flex flex-row items-center gap-x-3 group-hover:text-primary transition-all duration-300',
                                    isActive ? 'text-primary' : 'text-default-500'
                                )}
                            >
                                {IconComponent && (
                                    <IconComponent
                                        className={clsx(
                                            'h-6 w-6 transition-all duration-300',
                                            isActive ? 'text-primary' : 'text-default-500'
                                        )}
                                    />
                                )}
                                <span>{name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default Sidebare;
