'use client'
import { Button, Card, CardBody, cn } from '@nextui-org/react'
import React from 'react'
import { UserIcon,AcademicCapIcon } from '@heroicons/react/24/solid';
import useRegistrationStore from '@/stores/useRegistrationStore';

const UserTypeCards = () => {
    const {userType,setIsSelected,setUserType}=useRegistrationStore()
   

    const hanleSelectUser=(type:'partner'|'student')=>{
    
        setUserType(type)
    }
  return (
    <div className='space-y-4'>
     

<button  onClick={()=>hanleSelectUser('partner')} className='outline-none border-none w-full'>
<Card 
     
      className={cn('border-medium border-primary p-3 cursor-pointer transition-all duration-300 hover:scale-105',userType==='partner'&&'bg-primary')}>

        <CardBody >
         <div className={cn('size-20  p-3 flex justify-center items-center  rounded-full',userType==='partner'?'bg-white':'bg-primary-50')}>
         <UserIcon className='size-full text-primary '/>
         </div>
        <div>
        <h4 className={cn('h5 ',userType==='partner'&&'text-white')}>Prteniare</h4>
          <p className={cn(userType==='partner'?'text-default-400':'text-default-500')}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint amet
          </p>
        </div>
        </CardBody>
      </Card>
</button>

<button  onClick={()=>hanleSelectUser('student')} className='outline-none border-none w-full'>
      <Card 
         
      className={cn('border-medium border-primary p-3 cursor-pointer transition-all duration-300 hover:scale-105',userType==='student'&&'bg-primary')}>
        <CardBody >
        <div className={cn('size-20  p-3 flex justify-center items-center  rounded-full',userType==='student'?'bg-white':'bg-primary-50')}>
         <AcademicCapIcon className='size-full text-primary  '/>
         </div>
        <div>
        <h4 className={cn('h5 ',userType==='student'&&'text-white')}>Etudiant</h4>
        <p className={cn(userType==='student'?'text-default-400':'text-default-500')}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint amet
          </p>
        </div>
        </CardBody>
      </Card>
      </button>

      <Button type='button' color='primary' className='w-full  font-medium' size='lg' onPress={()=>setIsSelected(true)}>Suivant </Button>
    </div>
  )
}

export default UserTypeCards
