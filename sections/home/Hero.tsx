'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import {motion} from 'framer-motion'
import { Button } from '@nextui-org/react'
const Hero = () => {
   const router= useRouter()
   const swimAnimation:any = {
    y: [0, -5, 0], 
    transition: {
      duration: 3, 
      repeat: Infinity, 
      repeatType: 'mirror', 
    },
  };
  return (
    <section className=' pt-32 pb-20 overflow-hidden  '>
       <div className='container mx-auto px-6  grid max-md:grid-cols-1 gap-y-10 grid-cols-2'>
     <motion.div 
      initial={{ x: -100, opacity: 0 }} 
      whileInView={{ x: 0, opacity: 1 }} 
      viewport={{ once: true, amount: 0.5 }} 
      transition={{ type: "spring", stiffness: 50, duration: 0.8 }}
     className='space-y-6' >
     <h1 className='text-primary max-lg:h3 max-xl:h2 h1 capitalize max-md:text-center' >
    
     Boostez vos <span className='text-secondary'>compétences</span> pour votre <span className='text-secondary'>avenir</span>
       </h1>
      <p className='body max-md:text-center' >
Apprenez les bases de l’informatique, développez vos connaissances en programmation et préparez votre avenir dès aujourd’hui.
      </p>

      <div className='w-full grid max-md:grid-cols-1  grid-cols-2 max-md:mx-auto max-w-sm gap-x-3 gap-y-6 items-center'>
      <Button className=' text-white font-medium text-xl' color='primary' size='lg'>
      Commencer
      </Button>
      <Button className=' text-primary font-medium text-xl' color='primary' size='lg' variant='bordered'>
      Lire plus
      </Button>
      </div>
     </motion.div>

     <motion.div 
      initial={{ x: 100, opacity: 0 }} 
      whileInView={{ x: 0, opacity: 1 }} 
      viewport={{ once: true, amount: 0.5 }} 
      transition={{ type: "spring", stiffness: 50, duration: 0.8 }}
     className='relative flex justify-center'> 
   
        <motion.img 
          animate={swimAnimation}
        className='object-contain absolute -top-10 max-sm:hidden max-md:left-28 max-xl:left-0 max-2xl:left-14 left-28 max-lg:size-32  size-40 z-20'
        src={'/images/book-ic.svg'} 
        width={40} height={40} 
        alt='book-ic'
        />
            <motion.img
            animate={swimAnimation} 
        className='object-contain absolute max-sm:hidden bottom-14 max-md:right-20  max-xl:right-0  max-2xl:right-10 right-28 max-lg:size-32 size-40 z-20'
        src={'/images/backpack-ic.svg'} 
        width={40} height={40} 
        alt='backpack-ic'
        />
             <motion.img
             animate={swimAnimation} 
        className='object-contain absolute max-sm:hidden max-md:left-16 max-lg:bottom-0 bottom-10 max-xl:-left-4  max-2xl:left-10 left-24 max-lg:size-32 size-40 z-20'
        src={'/images/scholarcap-ic.svg'} 
        width={40} height={40} 
        alt='scholarcap-ic'
        />
        <Image 
        className='object-contain max-lg:size-80 size-96 bg-secondary rounded-full relative z-10'
        src={'/images/hero-img.svg'} 
        width={200} height={200} 
        alt='hero-image'
        />
          <div className='max-lg:size-80 size-96 rounded-full border border-secondary absolute -top-4 max-sm:left-14 max-md:left-28 max-xl:left-8 max-2xl:left-20 left-36'/>
          <div className='size-10 rounded-full bg-secondary absolute max-lg:size-8 bottom-0 max-sm:hidden max-md:left-28 max-xl:left-10  left-32'/>
     </motion.div>
       </div>
    </section>
  )
}

export default Hero
