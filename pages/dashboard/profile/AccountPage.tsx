'use client'
import useUserStore from '@/stores/useUserStore'
import {  Card, CardBody, CardHeader, User } from '@nextui-org/react'
import React from 'react'
import { CameraIcon} from '@heroicons/react/24/outline';
import AccountForm from '@/components/dashboard/account-form';
const AccountPage = () => {
    const {user}=useUserStore()
  return (
    <Card className='p-3 w-full'>
    <CardHeader>
  <button className='outline-none border-none relative'>
    <CameraIcon className='size-6 absolute bottom-0  z-50 bg-content1 shadow-small rounded-full p-0.5'/>
  <User
avatarProps={{
src: user?.avatar,
className:'w-20 h-20 text-large',
isBordered:true
}}

description={user?.email}
name={
<h1 className='text-2xl font-medium'>{user?.name}</h1>
}
/>
  </button>
   
    </CardHeader>
    <CardBody>
  <AccountForm/>
        
    </CardBody>
</Card>
  )
}

export default AccountPage
