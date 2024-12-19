'use client'
import React from 'react'
import {Tabs, Tab} from "@nextui-org/react";
import { UserIcon,LockClosedIcon} from '@heroicons/react/24/outline';
import AccountPage from '@/pages/dashboard/profile/AccountPage';
import PasswordPage from '@/pages/dashboard/profile/PasswordPage';
const ProfilePage = () => {

  return(
    <section className='w-full '>
   <Tabs
      aria-label="Options" color="primary" variant="light"
      className='bg-content1 rounded-large shadow-medium'
      isVertical
       
      >
        <Tab
      
        key="account"
        title={
            <div className="flex items-center space-x-2  w-48 ">
              <UserIcon className='size-6 ' color='' />
              <span className='text-medium'>Compte</span>
             
            </div>
          }
        >
             <AccountPage/>
        </Tab>
        <Tab
        
         key="password"
          title={
            <div className="flex items-center space-x-2 w-48  ">
              <LockClosedIcon className='size-6' />
              <span className='text-medium'>Mot de pass</span>
            
            </div>
          }
        >
            <PasswordPage/>
        </Tab>
        
      </Tabs>
   
   </section>
  )
}

export default ProfilePage
