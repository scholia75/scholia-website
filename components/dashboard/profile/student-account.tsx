'use client'
import React from 'react'
import StudentForm from '@/components/informations/student-form'
import { Card, CardBody, CardHeader, User } from '@nextui-org/react'
import { CameraIcon } from '@heroicons/react/24/outline'
import useUserStore from '@/stores/useUserStore'

const StudentAccount = () => {
    const {user}=useUserStore()
  
  return(
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
<h1 className='text-2xl font-medium capitalize'>{user?.name}</h1>
}
/>
  </button>
   
    </CardHeader>
    <CardBody>
  <StudentForm  isCreate={false}/>
        
    </CardBody>
</Card>
  )
}

export default StudentAccount
