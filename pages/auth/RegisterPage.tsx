
'use client'
import RegisterFrom from '@/components/auth/register-form'
import UserTypeCards from '@/components/auth/UserTypeCards'
import React from 'react'
import {motion} from 'framer-motion'
import useRegistrationStore from '@/stores/useRegistrationStore'
import { admissionSteps, signupSteps } from '@/constants'
import { Icon } from "@iconify/react";
import { CheckIcon,CheckCircleIcon } from '@heroicons/react/24/outline';
import { cn } from '@nextui-org/react'
import StudentForm from '@/components/informations/student-form'
import PartnerForm from '@/components/informations/partner-form'


const RegisterPage = () => {
  const {step,userType}=useRegistrationStore()

 
  return (
    <section className='py-20'>
     
    <div className='container mx-auto px-6 space-y-8   py-10    '>
    <div className='mb-4'>
     <h1 className="h5 font-bold uppercase text-center">Créer un compte</h1>
     <p className="body text-center">Remplissez les champs ci-dessous pour créer un nouveau compte.</p>
     </div>
   <div className='grid max-md:grid-cols-1 grid-cols-2 gap-x-8 gap-y-6'>
  
      <motion.div 
  initial={{ y: -100, opacity: 0 }} 
    whileInView={{ y: 0, opacity: 1 }} 
    viewport={{ once: true, amount: 0.5 }} 
    transition={{ type: "spring", stiffness: 50, duration: 0.8 }}
  className=' space-y-4 '>
     

     <ol className="items-center w-full max-lg:grid-cols-1 grid grid-cols-3 gap-y-4">
   {
    signupSteps.map(({title,id})=>(
      <li key={id} className={cn("flex items-center  space-x-2.5 rtl:space-x-reverse",step>=id? 'text-primary':'text-default-400')}>
      <span className={cn("flex items-center justify-center size-10  font-medium  rounded-full shrink-0",step>=id ?'bg-primary text-white':'border-2 border-default-400')}>

       {
        step>id ?<CheckIcon className='size-6 text-white'/>:
        id
       }

      </span>
      <span>
          <h3 className="font-medium leading-tight">{title}</h3>
         
      </span>
  </li>
    ))
   }
   
</ol>


     {
         step===1? <UserTypeCards/>:
         step===2 && userType==='student'?
         <StudentForm  isCreate />:
         step===2 && userType==='partner'?
         <PartnerForm/>:
         step===3 ? <RegisterFrom/>:
         <div className='flex flex-col items-center gap-y-2 py-4'>
          <CheckCircleIcon className='size-10 text-success'/>
          <h5 className='text-large font-medium text-center'>Vérifiez votre adresse e-mail</h5>
          <p className='text-default-500 text-center'>
          Nous avons envoyé un e-mail contenant un lien de vérification. Veuillez vérifier votre boîte de réception et cliquer sur le lien pour confirmer votre adresse e-mail.
          </p>
         </div>
      }
  
     </motion.div >
     <motion.div 
  initial={{ y: -100, opacity: 0 }} 
    whileInView={{ y: 0, opacity: 1 }} 
    viewport={{ once: true, amount: 0.5 }} 
    transition={{ type: "spring", stiffness: 50, duration: 0.8 }}
  className=' space-y-4  max-md:order-first'>
    <ul className='space-y-4'>
   {
    admissionSteps.map(({title,description,icon},index)=>(
      <li key={index} className='flex flex-row gap-x-4'>
      <div className='bg-primary-50 rounded-full size-16 flex justify-center items-center'>
      <Icon icon={icon} className='size-8 text-primary '/>
      </div>
       <div className='space-y-1'>
       <h5 className='text-xl font-semibold'>{title}</h5>
       <p className='text-default-500'>{description}</p>
       </div>
      </li>
    ))
   }
    </ul>
  
     </motion.div >
   </div>
  
    </div>
    </section>
  )
}

export default RegisterPage
