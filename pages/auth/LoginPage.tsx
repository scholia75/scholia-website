'use client'

import LoginForm from '@/components/auth/login-form'
import React from 'react'

const LoginPage = () => {
  return (
   <section className='py-20'>
   <div className='container mx-auto px-6  py-10  '>
   <LoginForm/>
   </div>
   </section>
  )
}

export default LoginPage
