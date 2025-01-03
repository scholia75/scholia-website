'use client'
import useUserStore from '@/stores/useUserStore'
import { CameraIcon } from '@heroicons/react/24/outline'
import { Card, CardBody, CardHeader, User } from '@nextui-org/react'
import React from 'react'
import AccountForm from './account-form'

const AdminAccount = () => {
    const {admin}=useUserStore()
  return (
    <Card className='p-3 w-full'>
    <CardHeader>
  <button className='outline-none border-none relative'>
    <CameraIcon className='size-6 absolute bottom-0  z-50 bg-content1 shadow-small rounded-full p-0.5'/>
  <User
avatarProps={{
src: admin?.avatar,
className:'w-20 h-20 text-large',
isBordered:true
}}

description={admin?.email}
name={
<h1 className='text-2xl font-medium capitalize'>{admin?.name}</h1>
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

export default AdminAccount
