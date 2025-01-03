'use client'
import React from 'react'
import StudentForm from '@/components/informations/student-form'
import { Card, CardBody, CardHeader, User } from '@nextui-org/react'
import { CameraIcon } from '@heroicons/react/24/outline'
import useUserStore from '@/stores/useUserStore'


const StudentAccount = () => {
    const {student}=useUserStore()
  
  return(
  <div className='space-y-6'>
      <Card className='p-3 w-full'>
    <CardHeader>
  <button className='outline-none border-none relative'>
    <CameraIcon className='size-6 absolute bottom-0  z-50 bg-content1 shadow-small rounded-full p-0.5'/>
  <User
avatarProps={{
src: student?.avatar,
className:'w-20 h-20 text-large',
isBordered:true
}}

description={student?.email}
name={
<h1 className='text-2xl font-medium capitalize'>{student?.firstname+' '+student.lastname}</h1>
}
/>
  </button>
   
    </CardHeader>
    <CardBody>
  <StudentForm  isCreate={false}/>
        
    </CardBody>
</Card>


  </div>
  )
}

export default StudentAccount
