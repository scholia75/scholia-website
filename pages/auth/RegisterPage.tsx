
'use client'
import RegisterFrom from '@/components/auth/register-form'
import UserTypeCards from '@/components/auth/UserTypeCards'
import React from 'react'
import {motion} from 'framer-motion'
import useRegistrationStore from '@/stores/useRegistrationStore'
const RegisterPage = () => {
  const {isSelected}=useRegistrationStore()
  
  return (
    <section className='py-20'>
    <div className='container mx-auto px-6  py-10 grid max-md:grid-cols-1 grid-cols-2   '>
      <motion.div 
  initial={{ y: -100, opacity: 0 }} 
    whileInView={{ y: 0, opacity: 1 }} 
    viewport={{ once: true, amount: 0.5 }} 
    transition={{ type: "spring", stiffness: 50, duration: 0.8 }}
  className=' space-y-4 '>
     <div>
     <h1 className="text-2xl font-bold uppercase">Créer un compte</h1>
     <p className="body">Remplissez les champs ci-dessous pour créer un nouveau compte. </p>
     </div>

     {
         !isSelected? <UserTypeCards/>:
         <RegisterFrom/>
      }
  
     </motion.div >
  
    </div>
    </section>
  )
}

export default RegisterPage
