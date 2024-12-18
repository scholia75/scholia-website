'use client'
import useUserStore from '@/stores/useUserStore'
import {  Card, CardBody, CardHeader, User } from '@nextui-org/react'
import React from 'react'

const AccountPage = () => {
    const {user}=useUserStore()
  return (
   <div>
    <h1 className='text-2xl font-semibold'>
            Compte
        </h1>
        <Card>
            <CardHeader>
          <button className='outline-none border-none'>
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
          
                
            </CardBody>
        </Card>
   </div>
  )
}

export default AccountPage
