'use client'
import { useSession } from '@/hooks/useSession'
import { Spinner } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'

const SessionProvider = ({children}:{children:ReactNode}) => {
    const router=useRouter()
    const {isLoading,session}=useSession()
   
    if(isLoading){
        return <div className='bg-background w-full h-screen overflow-hidden flex justify-center items-center'>
        <Spinner color='primary' size='lg'/>
    </div>
    }else{
        if(!session){
          router.replace('/auth/login')
        }
    }
     

  return (
   <>
   {children}
   </>
  )
}

export default SessionProvider
